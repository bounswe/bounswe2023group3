import { Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Poll } from '../poll/entities/poll.entity';
import { Option } from '../option/entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Vote } from '../vote/entities/vote.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingRepository: Repository<Ranking>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Poll)
    private readonly pollRepository: Repository<Poll>,

  ){}

  create(createRankingDto: CreateRankingDto) {
    return 'This action adds a new ranking';
  }

  findAll() {
    return `This action returns all ranking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ranking`;
  }

  update(id: number, updateRankingDto: UpdateRankingDto) {
    return `This action updates a #${id} ranking`;
  }

  remove(id: number) {
    return `This action removes a #${id} ranking`;
  }

  async settlePoints(poll: Poll,option: Option){
    const votes : Vote[] = await this.voteRepository.find({
      relations:["user"],
      where:{
        option:{
          id:"334483e2-4b39-4c10-896d-47cb1ba1c1e9"
        }
      }
    }
    )
    const userIds: string[] = votes.map((vote) => vote.user.id);

    poll.tags.forEach( async (tag) => {this.updateScoreByTag(tag.id,userIds)});

  }

  async updateScoreByTag(tagID:string, userIds:string[]){
    userIds.forEach(async (userId) => {
      const ranking: Ranking = await this.rankingRepository.findOne({
        where:{
          user:{
            id:userId
          },
          tag:{
            id:tagID
          }
        }
      }
      )
      if(ranking){
        ranking.score+=1;
        this.rankingRepository.save(ranking)
      }else{
        const newRanking= this.rankingRepository.create({
          tag: { id: tagID },
          user:{ id: userId },
          score: 1,
        });
        this.rankingRepository.save(newRanking);
      }
    });
  
  }

}


