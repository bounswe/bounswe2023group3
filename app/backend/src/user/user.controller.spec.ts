import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service'
import { User } from './entities/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userRepository: Repository<User>

  beforeEach(() => {
    userService = new UserService(userRepository);
    userController = new UserController(userService);
  });

  describe('findAll when there are multiple users', () => {
    it('should return an array of users', async () => {
      let user1= new User()
      user1.id ="123";
      user1.email = "test@gmail.com"
      user1.isVerified= true
      user1.password="something"
      let user2= new User()
      user2.id ="123";
      user2.email = "test@gmail.com"
      user2.isVerified= true
      user2.password="something"
      const result = [user1,user2];
      jest.spyOn(userService, 'findAll').mockImplementation(async () => result);

      expect(await userController.findAll()).toBe(result);
    });
  });

  describe('findAll when there is no user', () => {
    it('should return an empty array of users', async () => {
      const result = [];
      jest.spyOn(userService, 'findAll').mockImplementation(async () => result);

      expect(await userController.findAll()).toBe(result);
    });
  });

  describe('get a user', () => {
    it('should return a user', async () => {
      let user = new User();
      let id = "23a"
      user.id= id
      user.email="example@gmail.com"

      jest.spyOn(userService, 'findUserById').mockImplementation(async () => user);

      expect(await userController.findOne(id)).toBe(user);
    });
  });

  describe('get a user when there is no such user', () => {
    it('should return a user', async () => {
      let id = "23a"
      jest.spyOn(userService, 'findUserById').mockImplementation(async () => undefined);

      expect(await userController.findOne(id)).toBe(undefined);
    });
  });

  describe('get a user when there is no such user', () => {
    it('should return a user', async () => {
      let id = "23a"
      jest.spyOn(userService, 'findUserById').mockImplementation(async () => undefined);

      expect(await userController.findOne(id)).toBe(undefined);
    });
  });
});
