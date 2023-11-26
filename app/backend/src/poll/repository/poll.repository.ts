import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Poll } from '../entities/poll.entity';

@Injectable()
export class PollRepository extends Repository<Poll> {
  constructor(private dataSource: DataSource) {
    super(Poll, dataSource.createEntityManager());
  }

  public async findAll({
    creatorId,
    minLikeCount,
    minCommentCount,
  }): Promise<Poll[]> {
    const queryBuilder = this.createQueryBuilder('poll');

    if (creatorId) {
      queryBuilder.andWhere('poll.creatorId = :creatorId', { creatorId });
    }

    if (minLikeCount) {
      queryBuilder.andWhere('poll.like_count >= :minLikeCount', {
        minLikeCount,
      });
    }

    if (minCommentCount) {
      queryBuilder.andWhere('poll.comment_count >= :minCommentCount', {
        minCommentCount,
      });
    }

    return await queryBuilder
      .leftJoinAndSelect('poll.options', 'options')
      .leftJoinAndSelect('poll.tags', 'tags')
      .leftJoinAndSelect('poll.creator', 'creator')
      .leftJoinAndSelect('poll.outcome', 'outcome')
      .getMany();
  }
}
