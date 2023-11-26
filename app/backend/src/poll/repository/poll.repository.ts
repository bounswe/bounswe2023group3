import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Poll } from '../entities/poll.entity';
import { Like } from '../../like/entities/like.entity';

@Injectable()
export class PollRepository extends Repository<Poll> {
  constructor(private dataSource: DataSource) {
    super(Poll, dataSource.createEntityManager());
  }

  public async findPollById(id) {
    return await this.findOne({
      where: { id },
      relations: ['options', 'tags', 'creator', 'outcome'],
    });
  }

  public async findAll({
    creatorId,
    minLikeCount,
    minCommentCount,
    likedById,
    followedById,
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

    if (likedById) {
      queryBuilder
        .innerJoin('likes', 'like', 'like.pollId = poll.id')
        .andWhere('like.userId = :likedById', { likedById });
    }

    if (followedById) {
      queryBuilder
        .innerJoin(
          'users_followers_users',
          'users_followers_user',
          'users_followers_user.usersId_2 = poll.creatorId',
        )
        .andWhere('users_followers_user.usersId_1 = :followedById', {
          followedById,
        });
    }

    // Subquery to count likes
    const likesSubQuery = queryBuilder
      .subQuery()
      .select('COUNT(likeSub.id)', 'likeCount')
      .from(Like, 'likeSub')
      .where('likeSub.pollId = poll.id')
      .getQuery();

    // Add the subquery to the main query
    queryBuilder.addSelect(`(${likesSubQuery})`, 'pollLikeCount');

    const { entities, raw } = await queryBuilder
      .leftJoinAndSelect('poll.options', 'options')
      .leftJoinAndSelect('poll.tags', 'tags')
      .leftJoinAndSelect('poll.creator', 'creator')
      .leftJoinAndSelect('poll.outcome', 'outcome')
      .getRawAndEntities();

    const combinedResults = entities.map((entity) => {
      return {
        ...entity,
        likeCount:
          raw[raw.findIndex((item) => item.poll_id === entity.id)]
            .pollLikeCount,
      };
    });

    return combinedResults;
  }
}
