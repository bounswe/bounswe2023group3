import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import * as request from 'supertest';
import { expect } from 'chai'; // Import Chai's expect function

describe('User tests', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Check get all users response', async () => {
    await request(app.getHttpServer()).get('/user').expect(200);
  });

  it('Check get user with specific ID', async () => {
    await request(app.getHttpServer())
      .get('/user/8241ecba-e614-40f4-a575-8bf2b543814a')
      .expect(200);
  });

  it('Check get users types', async () => {
    const response = await request(app.getHttpServer()).get('/user');

    // Assert that the response body is an array
    expect(response.body).to.be.an('array');

    // Assert that each item in the array is an object of a certain type
    response.body.forEach((item: any) => {
      expect(item).to.be.an('object');

      expect(item).to.have.property('email');
      expect(item).to.have.property('username');
      expect(item).to.have.property('id');
      expect(item).to.have.property('firstname');
      expect(item).to.have.property('lastname');

      expect(item.email).to.be.a('string');
      expect(item.firstname).to.be.string;
      expect(item.lastname).to.be.string;
      expect(item.username).to.be.a('string');
      expect(item.id).to.be.a('string');
    });
  });

  it('Check get user response', async () => {
    const response: any = await request(app.getHttpServer()).get(
      '/user/8241ecba-e614-40f4-a575-8bf2b543814a',
    );
    // Assert that each item in the array is an object of a certain type
    expect(response.body).to.be.an('object');
    expect(response.body).to.exist;

    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('email');
    expect(response.body).to.have.property('username');
    expect(response.body).to.have.property('firstname');
    expect(response.body).to.have.property('lastname');

    expect(response.body.email).to.be.a('string');
    expect(response.body.firstname).to.be.string;
    expect(response.body.lastname).to.be.string;
    expect(response.body.username).to.be.a('string');
    expect(response.body.id).to.be.a('string');

    afterAll(async () => {
      await app.close();
    });
  });
});

describe('Poll tests', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Check get poll response', async () => {
    await request(app.getHttpServer()).get('/poll').expect(200);
  });

  it('Check get my polls response unauthenticated', async () => {
    await request(app.getHttpServer()).get('/poll/my-polls').expect(401);
  });

  it('Check get my polls response authenticated', async () => {
    const authResponse = await request(app.getHttpServer())
      .post('/auth/login') // Replace with your authentication endpoint
      .send({ email: 'test1@denrox.com', password: 'test11' })
      .expect(201);

    // Extract the token from the authentication response
    const authToken = authResponse.body.access_token;
    await request(app.getHttpServer())
      .get('/poll/my-polls')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

  it('Check get my liked polls response unauthenticated', async () => {
    await request(app.getHttpServer()).get('/poll/liked-by-me').expect(401);
  });

  it('Check get my liked polls response authenticated', async () => {
    const authResponse = await request(app.getHttpServer())
      .post('/auth/login') // Replace with your authentication endpoint
      .send({ email: 'test1@denrox.com', password: 'test11' })
      .expect(201);

    // Extract the token from the authentication response
    const authToken = authResponse.body.access_token;
    await request(app.getHttpServer())
      .get('/poll/liked-by-me')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

  it('Check get poll item types', async () => {
    const response = await request(app.getHttpServer()).get('/poll');

    // Assert that the response body is an array
    expect(response.body).to.be.an('array');

    // Assert that each item in the array is an object of a certain type
    response.body.forEach((item: any) => {
      expect(item).to.be.an('object');

      expect(item).to.have.property('is_settled');
      expect(item).to.have.property('approveStatus');
      expect(item).to.have.property('description');
      expect(item).to.have.property('question');

      expect(item.is_settled).to.be.a('number');
      expect(item.approveStatus).to.be.oneOf([null, true, false]);
      expect(item.description).to.be.string;
      expect(item.question).to.be.a('string');
    });
  });

  it('Check get poll item types', async () => {
    const authResponse = await request(app.getHttpServer())
      .post('/auth/login') // Replace with your authentication endpoint
      .send({ email: 'test1@denrox.com', password: 'test11' })
      .expect(201);

    // Extract the token from the authentication response
    const authToken = authResponse.body.access_token;

    const response = await request(app.getHttpServer())
      .get('/poll/my-polls')
      .set('Authorization', `Bearer ${authToken}`);

    // Assert that the response body is an array
    expect(response.body).to.be.an('array');

    // Assert that each item in the array is an object of a certain type
    response.body.forEach((item: any) => {
      expect(item).to.be.an('object');

      expect(item).to.have.property('is_settled');
      expect(item).to.have.property('approveStatus');
      expect(item).to.have.property('description');
      expect(item).to.have.property('question');

      expect(item.is_settled).to.be.a('number');
      expect(item.approveStatus).to.be.oneOf([null, true, false]);
      expect(item.description).to.be.string;
      expect(item.question).to.be.a('string');
    });
  });

  it('Check get poll item types', async () => {
    const authResponse = await request(app.getHttpServer())
      .post('/auth/login') // Replace with your authentication endpoint
      .send({ email: 'test1@denrox.com', password: 'test11' })
      .expect(201);

    // Extract the token from the authentication response
    const authToken = authResponse.body.access_token;

    const response = await request(app.getHttpServer())
      .get('/poll/liked-by-me')
      .set('Authorization', `Bearer ${authToken}`);

    // Assert that the response body is an array
    expect(response.body).to.be.an('array');

    // Assert that each item in the array is an object of a certain type
    response.body.forEach((item: any) => {
      expect(item).to.be.an('object');

      expect(item).to.have.property('is_settled');
      expect(item).to.have.property('approveStatus');
      expect(item).to.have.property('description');
      expect(item).to.have.property('question');

      expect(item.is_settled).to.be.a('number');
      expect(item.approveStatus).to.be.oneOf([null, true, false]);
      expect(item.description).to.be.string;
      expect(item.question).to.be.a('string');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('Moderator tests', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Check get all moderators response', async () => {
    await request(app.getHttpServer()).get('/moderator').expect(200);
  });

  it('Check get moderator with specific ID', async () => {
    await request(app.getHttpServer())
      .get('/moderator/8241ecba-e614-40f4-a575-8bf2b543814a')
      .expect(200);
  });

  it('Check get moderatorss types', async () => {
    const response = await request(app.getHttpServer()).get('/user');

    // Assert that the response body is an array
    expect(response.body).to.be.an('array');

    // Assert that each item in the array is an object of a certain type
    response.body.forEach((item: any) => {
      expect(item).to.be.an('object');

      expect(item).to.have.property('email');
      expect(item).to.have.property('username');
      expect(item).to.have.property('id');

      expect(item.email).to.be.a('string');
      expect(item.username).to.be.a('string');
      expect(item.id).to.be.a('string');
    });
  });

  it('Check get moderator response', async () => {
    const response: any = await request(app.getHttpServer()).get(
      '/user/8241ecba-e614-40f4-a575-8bf2b543814a',
    );
    // Assert that each item in the array is an object of a certain type
    expect(response.body).to.be.an('object');
    expect(response.body).to.exist;

    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('email');
    expect(response.body).to.have.property('username');

    expect(response.body.email).to.be.a('string');
    expect(response.body.username).to.be.a('string');
    expect(response.body.id).to.be.a('string');

    afterAll(async () => {
      await app.close();
    });
  });
});
