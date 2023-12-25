import { ConflictException, Injectable } from '@nestjs/common';
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
    const tag = await this.tagRepository.findOne({where:{id:tagID}});
    if(!tag){
      throw new ConflictException('There is no tag with this tagID');
    }

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

  async findAllMyRankings(userId:string) {
    const myRankings = await this.rankingRepository
    .createQueryBuilder('rankings')
    .select(['tags.id tag_id', 'tags.name tag_name','users.id user_id','users.username user_username', 'rankings.score ranking_score'])
    .addSelect('(RANK() OVER (PARTITION BY tags.id ORDER BY rankings.score DESC)) AS "rank"')
    .innerJoin('rankings.user', 'users')
    .innerJoin('rankings.tag', 'tags')
    .orderBy('tags.id, "rank"')
    .getRawMany();

    const filteredResults = myRankings.filter(result => result.user_id === userId);
    return filteredResults;
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


