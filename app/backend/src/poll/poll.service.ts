import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
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
import { UserService } from '../user/user.service';
import { Document } from 'langchain/document';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { TaskType } from '@google/generative-ai';
import { RankingService } from '../ranking/ranking.service';
import { UpdateTagsDto } from './dto/update-tags.dto';
import { VoteService } from '../vote/vote.service';

@Injectable()
export class PollService {
  private pineconeStore: PineconeStore;
  private embeddings: GoogleGenerativeAIEmbeddings;
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
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly pinecone: Pinecone,
    private readonly rankingService: RankingService,
    private readonly voteService: VoteService,
  ) {
    this.embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: 'embedding-001', // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: 'Prediction Polls',
    });
    this.pineconeStore = new PineconeStore(this.embeddings, {
      pineconeIndex: pinecone.Index('prediction-polls'),
    });
  }

  public async createPoll(createPollDto: any): Promise<Poll> {
    const poll = new Poll();
    poll.question = createPollDto.question;
    poll.description = createPollDto.description;
    poll.creator = createPollDto.creator;
    poll.due_date = createPollDto.due_date;
    poll.image_urls = createPollDto.image_urls;
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
          throw new NotFoundException('Tag is not found.');
        }

        return tag;
      }),
    );

    savedPoll.tags = tags;
    try {
      await this.pineconeStore.addDocuments(
        [
          new Document({
            metadata: { id: savedPoll.id },
            pageContent:
              savedPoll.question +
              ' ' +
              savedPoll.description +
              ' ' +
              savedPoll.tags.map((tag) => tag.name).join(' '),
          }),
        ],
        {
          ids: [savedPoll.id],
        },
      );
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
      where: { id: id, creator: { id: user.id } },
      relations: ['options'],
    });

    if (!poll) {
      throw new NotFoundException('Poll not found.');
    }

    if (poll.is_settled !== Settle.ACTIVE) {
      throw new BadRequestException('Poll is not eligible to be settled.');
    }

    const option = await this.optionRepository.findOne({
      where: { answer: settlePollDto.outcome, poll: { id: id } },
    });

    if (!option) {
      throw new BadRequestException('Outcome option not found.');
    }

    poll.outcome = option.id;
    poll.outcome_source = settlePollDto.outcome_source;
    poll.is_settled = Settle.PENDING;
    await this.pollRepository.save(poll);
  }

  public async settlePoll(
    id: string,
    decision: boolean,
    feedback: string,
  ): Promise<void> {
    const poll = await this.pollRepository.findOne({
      where: { id },
      relations: ['options', 'tags','likes','comments'],
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
      await this.rankingService.settlePoints(poll, option);
    } else {
      poll.is_settled = Settle.CANCELLED;
    }

    if (feedback) {
      poll.settle_poll_request_feedback = feedback;
    }

    await this.pollRepository.save(poll);
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

  public async findAll({
    creatorId,
    approveStatus,
    likedById,
    votedById,
    followedById,
    tags,
    sortString,
    is_settled,
    userId,
  }) {
    const whereClause: any = {};

    if (creatorId) {
      whereClause.creator = {
        id: creatorId,
      };
    }

    if (approveStatus != null) {
      whereClause.approveStatus = approveStatus;
    }

    if (is_settled != null) {
      whereClause.is_settled = is_settled;
    }

    if (likedById) {
      whereClause.likes = {
        user: {
          id: likedById,
        },
      };
    }

    if (followedById) {
      const followings =
        await this.userService.getUsersFollowedById(followedById);
      const followingIds = followings.map((obj) => obj.id);

      whereClause.creator = {
        id: In([...followingIds]),
      };
    }

    if (votedById) {
      whereClause.votes = {
        user: {
          id: votedById,
        },
      };
    }

    if (sortString) {
      if (!Object.values(Sort).includes(sortString)) {
        throw new BadRequestException("Sort should be 'ASC' or 'DESC'");
      }
    }

    let polls = await this.pollRepository.find({
      where: whereClause,
      relations: [
        'options',
        'tags',
        'creator',
        'likes',
        'likes.user',
        'comments',
      ],
      order: {
        creation_date: sortString || 'DESC',
      },
    });

    if (tags && tags.length > 0) {
      polls = polls.filter((poll) =>
        tags.every((tag) => poll.tags.some((tagItem) => tagItem.name === tag)),
      );
    }

    let extendedPolls = await Promise.all(
      polls.map(async (poll) => {
        return {
          ...poll,
          likeCount: poll.likes.length,
          commentCount: poll.comments.length,
          voteCount: await this.voteService.getVoteCount(poll.id),
          votedOption: null,
          didLike: null,
          voteDistribution:
            poll.is_settled === Settle.SETTLED
              ? await this.voteService.getVoteRate(poll.id)
              : null,
        };
      }),
    );

    if (userId) {
      extendedPolls = await Promise.all(
        extendedPolls.map(async (poll) => {
          const votedOption =
            (await this.voteService.findOne(poll.id, userId))?.option ?? null;
          if (!poll.voteDistribution && votedOption) {
            poll.voteDistribution = await this.voteService.getVoteRate(poll.id);
          }
          return {
            ...poll,
            votedOption: votedOption,
            didLike: poll.likes.some((like) => like.user?.id === userId),
          };
        }),
      );
    }

    return extendedPolls;
  }

  public async findPollsUserdidNotVote(is_settled: number,voterId?: string,) {
    let polls : Poll[];
    if(voterId){
      polls = await this.pollRepository.find({
        where: [
          {
            approveStatus: true,
            is_settled: is_settled,
            votes: {
              user: {
                id: Not(voterId),
              },
            },
          },
          {
            approveStatus: true,
            is_settled: is_settled,
            votes: {
              user: {
                id: IsNull(),
              },
            },
          },
        ],
        relations: [
          'options',
          'tags',
          'creator',
          'likes',
          'likes.user',
          'comments',
        ],
      });
    }else{
      polls = await this.pollRepository.find({
        where: {
            approveStatus: true,
            is_settled: is_settled,
            },
        relations: [
          'options',
          'tags',
          'creator',
          'likes',
          'likes.user',
          'comments',
        ],
      });      
    }


    let extendedPolls = await Promise.all(
      polls.map(async (poll) => {
      return {
        ...poll,
        didLike: null,
        voteCount: await this.voteService.getVoteCount(poll.id),
        likeCount: poll.likes.length,
        commentCount: poll.comments.length,
        votedOption:null,
        votedDistribution: is_settled ?  await this.voteService.getVoteRate(poll.id): null,
      };
    }));


    if(voterId){
      extendedPolls = extendedPolls.map((poll) => {
        return {
          ...poll,
          didLike: poll.likes.some(
            (like) => like.user && like.user.id == voterId,
          ),
        };
      });
    }


    return extendedPolls.sort((a, b) => b.voteCount - a.voteCount);
  }

  public async findAllWithPagination({
    creatorId,
    approveStatus,
    likedById,
    votedById,
    followedById,
    tags,
    sortString,
    is_settled,
    userId,
    pageSize,
    pageNum,
  }) {
    const whereClause: any = {};

    if (creatorId) {
      whereClause.creator = {
        id: creatorId,
      };
    }

    if (approveStatus != null) {
      whereClause.approveStatus = approveStatus;
    }

    if (is_settled != null) {
      whereClause.is_settled = is_settled;
    }

    if (likedById) {
      whereClause.likes = {
        user: {
          id: likedById,
        },
      };
    }

    if (followedById) {
      const followings =
        await this.userService.getUsersFollowedById(followedById);
      const followingIds = followings.map((obj) => obj.id);

      whereClause.creator = {
        id: In([...followingIds]),
      };
    }

    if (votedById) {
      whereClause.votes = {
        user: {
          id: votedById,
        },
      };
    }

    if (sortString) {
      if (!Object.values(Sort).includes(sortString)) {
        throw new BadRequestException("Sort should be 'ASC' or 'DESC'");
      }
    }

    let polls = await this.pollRepository.find({
      where: whereClause,
      relations: [
        'options',
        'tags',
        'creator',
        'votes',
        'votes.user',
        'votes.option',
        'likes',
        'likes.user',
        'comments',
      ],
      order: {
        creation_date: sortString || 'DESC',
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });

    if (tags && tags.length > 0) {
      polls = polls.filter((poll) =>
        tags.every((tag) => poll.tags.some((tagItem) => tagItem.name === tag)),
      );
    }

    let extendedPolls = [];
    if (!userId) {
      extendedPolls = polls.map((poll) => {
        return {
          ...poll,
          votedOption: null,
          didLike: false,
          likeCount: poll.likes.length,
          commentCount: poll.comments.length,
        };
      });
    } else {
      extendedPolls = polls.map((poll) => {
        return {
          ...poll,
          votedOption:
            poll.votes
              .filter((vote) => vote.user && vote.user.id == userId)
              .map((vote) => vote.option.id)[0] || null,
          didLike: poll.likes.some(
            (like) => like.user && like.user.id == userId,
          ),
          voteCount: poll.votes.length,
          likeCount: poll.likes.length,
          commentCount: poll.comments.length,
        };
      });
    }

    return extendedPolls;
  }

  public async findPollsUserdidNotVoteWithPagination(
    voterId: string,
    pageSize,
    pageNum,
  ) {
    const polls = await this.pollRepository.find({
      where: [
        {
          votes: {
            user: {
              id: Not(voterId),
            },
          },
        },
        {
          votes: {
            user: {
              id: IsNull(),
            },
          },
        },
      ],
      relations: [
        'options',
        'tags',
        'creator',
        'votes',
        'votes.user',
        'votes.option',
        'likes',
        'likes.user',
        'comments',
      ],
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });

    const extendedPolls = polls.map((poll) => {
      return {
        ...poll,
        votedOption:
          poll.votes
            .filter((vote) => vote.user && vote.user.id == voterId)
            .map((vote) => vote.option.id)[0] || null,
        didLike: poll.likes.some(
          (like) => like.user && like.user.id == voterId,
        ),
        voteCount: poll.votes.length,
        likeCount: poll.likes.length,
        commentCount: poll.comments.length,
      };
    });

    return extendedPolls;
  }

  public async findPollById(pollId, userId?) {
    const poll = await this.pollRepository.findOne({
      where: { id: pollId },
      relations: [
        'options',
        'tags',
        'creator',
        'likes',
        'likes.user',
        'comments',
      ],
    });

    if (!poll) {
      throw new NotFoundException('Poll not found');
    }

    const votedOption = userId
      ? (await this.voteService.findOne(poll.id, userId))?.option || null
      : null;

    let voteDistribution = null;
    if (votedOption || poll.is_settled === Settle.SETTLED) {
      voteDistribution = await this.voteService.getVoteRate(pollId);
    }

    const pollCount = await this.voteService.getVoteCount(pollId);

    return {
      ...poll,
      votedOption: votedOption,
      voteDistribution: voteDistribution,
      voteCount: pollCount,
      likeCount: poll.likes.length,
      commentCount: poll.comments.length,
    };
  }

  async updatePollTags(
    pollID: string,
    updateTagsDto: UpdateTagsDto,
  ): Promise<Poll> {
    const pollToUpdate = await this.findPollById(pollID);
    if (!pollToUpdate) {
      throw new NotFoundException('Poll Not Found');
    }

    const newTags = await Promise.all(
      updateTagsDto.tags.map(async (tagName) => {
        let tag = await this.tagRepository.findOneBy({ name: tagName });

        if (!tag) {
          tag = new Tag();
          tag.name = tagName;
          await this.tagRepository.save(tag);
        }

        return tag;
      }),
    );

    pollToUpdate.tags = newTags;
    await this.pollRepository.save(pollToUpdate);

    return pollToUpdate;
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

  public async pineconeTest(): Promise<any> {
    return this.pineconeStore.pineconeIndex;
  }

  public async syncVectorStore(): Promise<any> {
    const polls = await this.pollRepository.find({
      relations: ['options', 'tags'],
    });

    const documents = polls.map((poll) => {
      return new Document({
        metadata: { id: poll.id },
        pageContent:
          poll.question +
          ' ' +
          poll.description +
          ' ' +
          poll.tags.map((tag) => tag.name).join(' '),
      });
    });

    await this.pineconeStore.addDocuments(documents, {
      ids: polls.map((poll) => poll.id),
    });
  }

  public async searchSemanticPolls(
    query: string,
    userId?: string | null,
  ): Promise<Poll[]> {
    const polls = await this.pineconeStore.similaritySearchWithScore(query, 5);
    const pollIDs = polls
      .filter((result) => result[1] > 0.7)
      .map((result) => result[0].metadata.id);

    const results = await Promise.all(
      pollIDs.map(async (pollId) => {
        return await this.findPollById(pollId, userId);
      }),
    );
    return results;
  }
}
