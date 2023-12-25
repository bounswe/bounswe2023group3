import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PollService } from '../poll/poll.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private pollService: PollService,
  ) {}

  async fetchComments(pollID: string) {
    return await this.commentRepository.find({
      where: { poll: { id: pollID } },
      relations: ['user'],
      order: {
        created_date: 'DESC', // or 'ASC' for ascending order
      },
    });
  }

  async create(
    createCommentDto: CreateCommentDto,
    pollID: string,
    userID: string,
  ) {
    const poll = await this.pollService.findPollById(pollID);

    if (!poll) {
      throw new ConflictException('There is no poll with this id');
    }

    const newLike = this.commentRepository.create({
      description: createCommentDto.description,
      poll: { id: pollID },
      user: { id: userID },
    });

    return await this.commentRepository.save(newLike);
  }

  async remove(commentID: string, userID: string) {
    const comment = await this.commentRepository.findOne({where:{id:commentID}});

    if (!comment) {
      throw new ConflictException('There is no comment with this id');
    }

    return await this.commentRepository.remove(comment);
  }
}
