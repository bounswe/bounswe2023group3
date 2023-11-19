import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from '../poll/entities/poll.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModeratorService {
    constructor(
        @InjectRepository(Poll) private readonly pollRepository: Repository<Poll>,
    ) {}

    public async fetchUnapprovedPolls(): Promise<Poll[]> {
        return await this.pollRepository.find({
            where: {
                is_approved_by_moderator: false
            },
            relations: ['options', 'tags', 'creator'],
        });
    }
}
