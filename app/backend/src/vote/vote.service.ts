import { ConflictException, Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { OptionService } from '../option/option.service';
import { Option } from '../option/entities/option.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteReposityory: Repository<Vote>,
    private optionService: OptionService,
  ) {}

  async create(createVoteDto: CreateVoteDto, userId :string) {
    const option : Option = await this.optionService.findOne(createVoteDto.option_id)
    
    if (!option){
      throw new ConflictException('There is no option with this id');
    }

    const vote : Vote = await this.voteReposityory.findOne({ 
      where: {
        user : {id: userId},
        poll : {id: option.poll.id}

      }    
    });    

    if (vote){
      throw new ConflictException('User has already voted on this poll');
    }


    const newVote = await this.voteReposityory.create({
      poll: { id: option.poll.id},
      user: { id: userId},
      option: {id: option.id}
  });
  return await this.voteReposityory.save(newVote);
  }

  async findAll() {
    return await this.voteReposityory.find({relations:["user","poll","option"]});
  }

  async getVoteRate(pollID: string){
    const vote_distrubtion = await this.voteReposityory.createQueryBuilder('vote')
      .select('vote.optionId', 'optionId')
      .addSelect('COUNT(*)', 'count')
      .where(`vote.poll = :pollID`,{pollID})
      .groupBy('vote.optionId').getRawMany();

    return vote_distrubtion;

  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }


  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
