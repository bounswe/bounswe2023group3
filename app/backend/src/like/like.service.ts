import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { PollService } from '../poll/poll.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private pollService: PollService
  ) {}

  async fetchLikes(pollID: string){
    return await this.likeRepository.find({where : {poll:{id:pollID}}, relations:['user'] })
  }

  async create(pollID: string, userID: string) {
    const poll = await this.pollService.findPollById(pollID)
    
    if (!poll){
      throw new ConflictException('There is no poll with this id');
    }

    const like = await this.likeRepository.findOne({where: {poll: {id: pollID} , user : {id:userID}}})
    
    if (like){
      throw new ConflictException('User has already liked this poll');
    }

    const newLike = this.likeRepository.create({
      poll: { id: pollID},
      user: { id: userID}
  });

    return await this.likeRepository.save(newLike);
  }

  async remove(pollID: string, userID:string) {
    const poll = this.pollService.findPollById(pollID)
    
    if (!poll){
      throw new ConflictException('There is no poll with this id');
    }

    const likeToBeDeleted = await this.likeRepository.findOne({where: {poll: {id: pollID} , user : {id:userID}}})

    if (!likeToBeDeleted){
      throw new ConflictException('User has not liked this poll');
    }

    return await this.likeRepository.remove(likeToBeDeleted);
  }
}
