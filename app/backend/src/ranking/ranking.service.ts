import { ConflictException, Injectable } from '@nestjs/common';
import { Poll } from '../poll/entities/poll.entity';
import { Option } from '../option/entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { Repository } from 'typeorm';
import { Vote } from '../vote/entities/vote.entity';
import { Tag } from '../tag/entities/tag.entity';
import { VoteService } from '../vote/vote.service';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingRepository: Repository<Ranking>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly voteService: VoteService,
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
    if(!userIds.length){
      return
    }
    poll.tags.push(await this.tagRepository.findOne({where: {name: "general"}}));

    const addition_score = await this.generateScoring(poll.id, option.id, poll.likes.length, poll.comments.length);
    poll.tags.forEach( async (tag) => {this.updateScoreByTag(tag.id, userIds, addition_score)});

  }

  async updateScoreByTag(tagID:string, userIds:string[],addition_score:number){
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
        ranking.score+=addition_score;
        this.rankingRepository.save(ranking)
      }else{
        const newRanking= this.rankingRepository.create({
          tag: { id: tagID },
          user:{ id: userId },
          score: addition_score,
        });
        this.rankingRepository.save(newRanking);
      }
    });
  
  }

  async generateScoring(pollID: string,optionID: string,likeCount: number,commentCount:number):Promise<number>{
    const vote_distribution = await this.voteService.getVoteRate(pollID);
    const vote_count= await this.voteService.getVoteCount(pollID);

    let base = vote_count/vote_distribution.find(entity => entity.optionId === optionID).count;

    base += base * (3 * commentCount + likeCount + vote_count) / 10

    return Math.ceil(base)

  }

}


