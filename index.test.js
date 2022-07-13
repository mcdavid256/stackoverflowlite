const request = require('supertest');
const express = require('express');

const app = express();

describe('Questions API', () => {
  it('GET /questions ----> array questions', () => {
    return request(app)
      .get('/api/v1/questions')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              Title: expect.any(String),
              Body: expect.any(String),
              Tag: expect.any(String),
            }),
          ])
        );
      });
  });
});
