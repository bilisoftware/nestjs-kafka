import { afterAll, beforeAll, jest } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './mock/app.module';
import { Test, TestingModule } from '@nestjs/testing';

declare global {
  var app: INestApplication;
  var fn: jest.Mock<any>;
}

beforeAll(async () => {
  global.fn = jest.fn();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider('TEST')
    .useValue(global.fn)
    .compile();

  global.app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});
