import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { beforeEach, describe, expect, it, afterEach } from '@jest/globals';

describe('Authentication System (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {

    const email = 'test@test.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        firstName: 'test',
        lastName: 'test',
      })
      .expect(201)
      .then((res) => {
        
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);

      })
  });

  it('handles a signin request', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200)
  });

  afterEach(async () => {
    await app.close();
  });
});
