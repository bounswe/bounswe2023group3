import { Injectable } from '@nestjs/common';
import { Poll } from '../poll/entities/poll.entity';
import { Option } from '../option/entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { Repository } from 'typeorm';
import { Vote } from '../vote/entities/vote.entity';
import { Tag } from '../tag/entities/tag.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingRepository: Repository<Ranking>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ){}


  async findAll(tagID:string, userID:string) {
    const currenUser = await this.rankingRepository.findOne({
      where:{
        tag:{id:tagID},
        user: {id:userID}
      },
      relations:["user","tag"]
    })

    const ranking= await this.rankingRepository.find(
      {
        where:
          {tag:{
            id:tagID,
          }
        },
        order:{
          score:"DESC"
        },
        relations:["user","tag"]
      }
      )
    const response = {"ranking": ranking, "currenUser": currenUser}

    return response;
  }


  async settlePoints(poll: Poll,option: Option){
    const votes : Vote[] = await this.voteRepository.find({
      relations:["user"],
      where:{
        option:{
          id:option.id
        }
      }
    }
    )
    const userIds: string[] = votes.map((vote) => vote.user.id);
    poll.tags.push(await this.tagRepository.findOne({where: {name: "general"}}));

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


