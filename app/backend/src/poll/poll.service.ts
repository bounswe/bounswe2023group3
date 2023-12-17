import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { In, IsNull, Repository } from 'typeorm';
import { Option } from '../option/entities/option.entity';
import { Tag } from '../tag/entities/tag.entity';
import { PollRepository } from './repository/poll.repository';
import { User } from '../user/entities/user.entity';
import { Settle } from './enums/settle.enum';
import { SettlePollRequestDto } from './dto/settle-poll-request.dto';
import { Like } from '../like/entities/like.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Sort } from './enums/sort.enum';
import { TagService } from '../tag/tag.service';
import { Document } from "langchain/document";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { RankingService } from '../ranking/ranking.service';

@Injectable()
export class PollService {
  private pineconeStore: PineconeStore;
  private embeddings: GoogleGenerativeAIEmbeddings
  constructor(
    private readonly pollRepository: PollRepository,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(Tag) 
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly tagService: TagService,
    private readonly pinecone: Pinecone,
    private readonly rankingService: RankingService
  ) {
    this.embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "embedding-001", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Prediction Polls",
    });
    this.pineconeStore = new PineconeStore(
      this.embeddings,
      {
        pineconeIndex: pinecone.Index("prediction-polls"),
      });
  }

  public async createPoll(createPollDto: any): Promise<Poll> {
    const poll = new Poll();
    poll.question = createPollDto.question;
    poll.description = createPollDto.description;
    poll.creator = createPollDto.creator;
    poll.due_date = createPollDto.due_date;
    poll.image_urls = createPollDto.image_urls
    const savedPoll = await this.pollRepository.save(poll);

    const options = createPollDto.options.map((option) => {
      const newOption = new Option();
      newOption.answer = option;
      newOption.poll = savedPoll;
      return newOption;
    });

    await this.optionRepository.save(options);

    const tags = await Promise.all(
      createPollDto.tags.map(async (tagName) => {
        let tag = await this.tagRepository.findOneBy({ name: tagName });

        if (!tag) {
          tag = new Tag();
          tag.name = tagName;
          await this.tagRepository.save(tag);
        }

        return tag;
      }),
    );

    savedPoll.tags = tags;
    try {
      await this.pineconeStore.addDocuments([
        new Document({
          metadata: {id: savedPoll.id},
          pageContent: savedPoll.question + ' ' + savedPoll.description + ' ' + savedPoll.tags.map((tag) => tag.name).join(' ')
        }),
      ], {
        ids: [savedPoll.id],
      });
    } catch (e) {
      console.log(e);
    }

    return await this.pollRepository.save(savedPoll);
  }

  public async settleRequest(
    user: User,
    id: string,
    settlePollDto: SettlePollRequestDto,
  ): Promise<void> {
    const poll = await this.pollRepository.findOne({
      where: { id:id , creator: { id: user.id } },
      relations: ['options'],
    });
    console.log(poll);
    if (!poll) {
      throw new NotFoundException('Poll not found.');
    }

    if (poll.is_settled !== Settle.ACTIVE) {
      throw new BadRequestException('Poll is not eligible to be settled.');
    }

    const option = await this.optionRepository.findOne({
      where: { answer: settlePollDto.outcome, poll :{ id:id} },
    });

    if (!option) {
      throw new BadRequestException('Outcome option not found.');
    }

    poll.outcome = option.id;
    poll.outcome_source = settlePollDto.outcome_source;
    poll.is_settled = Settle.PENDING;
    await this.pollRepository.save(poll);
  }

  public async settlePoll(id: string, decision: boolean, feedback: string): Promise<void> {
    const poll = await this.pollRepository.findOne({
      where: { id },
      relations: ['options','tags'],
    });

    if (!poll) {
      throw new NotFoundException('Poll not found.');
    }

    if (poll.is_settled !== Settle.PENDING) {
      throw new BadRequestException('Poll is not eligible to be settled.');
    }

    const option = poll.options.find((option) => option.id === poll.outcome);

    if (!option) {
      throw new BadRequestException('Outcome option not found.');
    }

    if (decision) {
      poll.is_settled = Settle.SETTLED;
      await this.rankingService.settlePoints(poll,option)
    } else {
      poll.is_settled = Settle.CANCELLED;
    }

    if (feedback){
      poll.settle_poll_request_feedback = feedback;
    }

    await this.pollRepository.save(poll);
  }

  public async findAll({
    creatorId,
    approveStatus,
    likedById,
    followedById,
    sortString,
    tags,
    userId,
  }): Promise<Poll[]> {
    if (sortString) {
      if (!Object.values(Sort).includes(sortString)) {
        throw new BadRequestException("Sort should be 'ASC' or 'DESC'");
      }
    }

    if (tags) {
      tags = await this.tagService.getTagIdsFromTagNames(tags);
    }

    return await this.pollRepository.findAll({
      creatorId,
      approveStatus,
      likedById,
      followedById,
      sortString,
      tags,
      userId,
    });
  }

  public async findPolls(creatorId: string, approveStatus: boolean) {
    return await this.pollRepository.find({
      where: {
        approveStatus: approveStatus ?? IsNull(),
        creator: {
          id: creatorId,
        },
      },
      relations: ['options', 'tags', 'creator'],
    });
  }

  public async findPollById(pollId, userId?) {
    const poll = await this.pollRepository.findOne({
      where: { id: pollId },
      relations: ['options', 'tags', 'creator'],
    });

    if (!poll) {
      throw new NotFoundException('Poll not found');
    }

    let like = false;
    if (userId) {
      like = await this.likeRepository.exist({
        where: { poll: { id: pollId }, user: { id: userId } },
        relations: ['user', 'poll'],
      });
    }

    return {
      ...poll,
      likeCount: await this.findLikeCount(pollId),
      commentCount: await this.findCommentCount(pollId),
      didLike: like,
    };
  }

  async findLikeCount(pollID: string): Promise<number> {
    return await this.likeRepository.count({
      where: { poll: { id: pollID } },
      relations: ['user'],
    });
  }

  async findCommentCount(pollID: string): Promise<number> {
    return await this.commentRepository.count({
      where: { poll: { id: pollID } },
      relations: ['user'],
    });
  }

  public async removeById(id: string): Promise<void> {
    await this.pollRepository.delete(id);
  }

  public async removeAll(): Promise<void> {
    await this.pollRepository.delete({});
  }

  public async pineconeTest(): Promise<any> {
    return this.pineconeStore.pineconeIndex;
  }

  public async syncVectorStore(): Promise<any> {
    const polls = await this.pollRepository.find({
      relations: ['options', 'tags'],
    });

    const documents = polls.map((poll) => {
      return new Document({
        metadata: {id: poll.id},
        pageContent: poll.question + ' ' + poll.description + ' ' + poll.tags.map((tag) => tag.name).join(' '),
      });
    });

    await this.pineconeStore.addDocuments(documents, {
      ids: polls.map((poll) => poll.id),
    });
  }

  public async searchSemanticPolls(query: string): Promise<Poll[]> {
    let results = await this.pineconeStore.similaritySearchWithScore(query, 5);
    results = results.filter((result) => result[1] > 0.7).map((result) => result[0].metadata.id);
    return await this.pollRepository.find({
      where: {id: In(results)},
      relations: ['options', 'tags', 'creator', 'likes', 'comments', 'votes', 'annotations'],
    })
  }
}
