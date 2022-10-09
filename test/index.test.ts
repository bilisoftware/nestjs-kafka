import { describe, expect, it, test } from '@jest/globals';
import request from 'supertest';

describe('Listening message successfully', () => {
  it('Start App successfully', async () => {
    const res = await request(app.getHttpServer()).get('/').send();
    console.log('success');
    expect(fn).toBeCalled()
  });
});
