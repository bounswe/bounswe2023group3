import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import * as request from 'supertest';
import { expect } from 'chai'; // Import Chai's expect function

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
