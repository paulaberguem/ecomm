import request from 'supertest';
import { describe, expect, it, jest, } from '@jest/globals';
import app from '../../src/app.js';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /categories', () => {
  it('Deve retornar uma lista de categorias', async () => {
    const resposta = await request(app)
      .get('/categories')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].nome).toEqual('informática');
  });
});

let idResposta;
describe('POST em /admin/categories', () => {
  it('Deve cadastrar uma nova categoria', async () => {
    const resposta = await request(app)
      .post('/admin/categories')
      .send({
        nome: 'flores',
        status: true,
      })
      .expect(201);

    idResposta = resposta.body._id;
  });
  it('Deve nao cadastrar se já tiver o mesmo nome cadastrado', async () => {
    await request(app)
      .post('/admin/categories')
      .send({
        nome: 'flores',
        status: true,
      })
      .expect(400);
  });
});
