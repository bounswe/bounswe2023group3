import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Poll } from '../entities/poll.entity';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Injectable()
export class PollRepository extends Repository<Poll> {
  constructor(private dataSource: DataSource) {
    super(Poll, dataSource.createEntityManager());
  }

  public async findPollById(id) {
    return await this.findOne({
      where: { id },
      relations: ['options', 'tags', 'creator'],
    });
  }

  public async findAll({
    creatorId,
    approveStatus,
    likedById,
    followedById,
    sortString,
    tags,
    userId,
  }): Promise<Poll[]> {
    const queryBuilder = this.createQueryBuilder('poll');

    if (creatorId) {
      queryBuilder.andWhere('poll.creatorId = :creatorId', { creatorId });
    }

    if (approveStatus != null) {
      queryBuilder.andWhere('poll.approveStatus = :approveStatus', {
        approveStatus,
      });
    }

    if (likedById) {
      queryBuilder
        .innerJoin('likes', 'like', 'like.pollId = poll.id')
        .andWhere('like.userId = :likedById', { likedById });
    }

    if (sortString) {
      queryBuilder.orderBy('poll.creation_date', sortString);
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

    if (tags && tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        const tagId = tags[i];
        const tagAlias = `tag${i + 1}`;

        console.log('here: ', tagId);
        queryBuilder
          .innerJoin(
            'polls_tags_tags',
            tagAlias,
            `${tagAlias}.pollsId = poll.id`,
          )
          .andWhere(`${tagAlias}.tagsId = :tagId`, { tagId });
      }
    }

    let didLikeSubQuery;

    if (userId) {
      didLikeSubQuery = queryBuilder
        .subQuery()
        .select('COUNT(likeSub.id)', 'likeCount')
        .from(Like, 'likeSub')
        .where('likeSub.pollId = poll.id AND likeSub.userId = :userId', {
          userId,
        })
        .getQuery();
    }

    // Subquery to count likes
    const likesSubQuery = queryBuilder
      .subQuery()
      .select('COUNT(likeSub.id)', 'likeCount')
      .from(Like, 'likeSub')
      .where('likeSub.pollId = poll.id')
      .getQuery();

    // Subquery to count comments
    const commentsSubQuery = queryBuilder
      .subQuery()
      .select('COUNT(commentSub.id)', 'commentCount')
      .from(Comment, 'commentSub')
      .where('commentSub.pollId = poll.id')
      .getQuery();

    // Add the subquery to the main query
    queryBuilder.addSelect(`(${likesSubQuery})`, 'pollLikeCount');
    queryBuilder.addSelect(`(${commentsSubQuery})`, 'pollCommentCount');
    if (userId) {
      queryBuilder.addSelect(`(${didLikeSubQuery})`, 'didLike');
    }

    const { entities, raw } = await queryBuilder
      .leftJoinAndSelect('poll.options', 'options')
      .leftJoinAndSelect('poll.tags', 'tags')
      .leftJoinAndSelect('poll.creator', 'creator')
      .getRawAndEntities();

    const combinedResults = entities.map((entity) => {
      return {
        ...entity,
        likeCount: parseInt(
          raw[raw.findIndex((item) => item.poll_id === entity.id)]
            .pollLikeCount,
        ),
        commentCount: parseInt(
          raw[raw.findIndex((item) => item.poll_id === entity.id)]
            .pollCommentCount,
        ),
        didLike:
          raw[raw.findIndex((item) => item.poll_id === entity.id)].didLike ===
          '1',
      };
    });

    return combinedResults;
  }
}
