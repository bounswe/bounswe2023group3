import { Repository } from 'typeorm';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { Poll } from './entities/poll.entity';
import { Tag } from './entities/tag.entity';
import { Option } from './entities/option.entity';
import { CreatePollDto } from './dto/create-poll.dto';

describe('PollController', () => {
  let pollController: PollController;
  let pollService: PollService;
  let pollRepository: Repository<Poll>;
  let tagRepository: Repository<Tag>;
  let optionRepository: Repository<Option>;

  beforeEach(() => {
    pollService = new PollService(
      pollRepository,
      tagRepository,
      optionRepository,
    );
    pollController = new PollController(pollService);
  });

  describe('findAll when there are multiple polls', () => {
    it('should return an array of polls', async () => {
      const poll1 = new Poll();
      poll1.id = '12';
      poll1.question = 'when will I die';
      const poll2 = new Poll();
      poll1.id = '16';
      poll1.question = 'when will be happy';
      const result = [poll1, poll2];
      jest.spyOn(pollService, 'findAll').mockImplementation(async () => result);
      expect(await pollController.findAll()).toBe(result);
    });
  });

  describe('findAll when there is no poll', () => {
    it('should return an empty array of users', async () => {
      const result = [];
      jest.spyOn(pollService, 'findAll').mockImplementation(async () => result);

      expect(await pollController.findAll()).toBe(result);
    });
  });

  describe('findOne when there exists the poll', () => {
    it('should return an poll object', async () => {
      const poll = new Poll();
      const id = '12';
      poll.id = id;
      const result = poll;
      jest
        .spyOn(pollService, 'findPollById')
        .mockImplementation(async () => result);

      expect(await pollController.findOne(id)).toBe(result);
    });
  });

  describe('findOne when there exists the poll', () => {
    it('should return an poll object', async () => {
      const id = '12';
      jest
        .spyOn(pollService, 'findPollById')
        .mockImplementation(async () => undefined);
      expect(await pollController.findOne(id)).toBe(undefined);
    });
  });

  describe('create a poll', () => {
    it('should return an poll object', async () => {
      const pollDto = new CreatePollDto();
      pollDto.creator = 'batu';
      pollDto.question = 'who will be champion in the super league';
      const poll = new Poll();
      poll.creator = 'batu';
      poll.question = 'who will be champion in the super league';
      jest
        .spyOn(pollService, 'createPoll')
        .mockImplementation(async () => poll);
      expect(await pollController.create(pollDto)).toBe(poll);
    });
  });
});
