import request from 'supertest';
import {
  describe, expect, it, jest, afterAll, beforeAll,
} from '@jest/globals';
import mongoose from 'mongoose';
import app from '../../src/app.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://admin:secret@localhost:27017/ecomm-product-test?authSource=admin');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET em /categories', () => {
  it('Deve retornar uma lista de categorias', async () => {
    await request(app)
      .get('/categories')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST em /admin/categories', () => {
  it('Deve cadastrar uma nova categoria', async () => {
    const resposta = await request(app)
      .post('/admin/categories')
      .send({
        nome: 'aaaaa',
        status: true,
      })
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body._id;
  });
  it('Deve nao cadastrar se já tiver o mesmo nome cadastrado', async () => {
    await request(app)
      .post('/admin/categories')
      .send({
        nome: 'aaaaa',
        status: true,
      })
      .expect(400);
  });
});

describe('GET em /categories/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/categories/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /categories/id', () => {
  // eslint-disable-next-line no-undef
  test.each([
    ['nome', { nome: 'embalagens' }],
    ['status', { status: false }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/admin/categories/${idResposta}`)
      .send(param)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });
});

describe('PATCH em /categories/id', () => {
  // eslint-disable-next-line no-undef
  test.each([
    ['status', { status: true }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/admin/categories/${idResposta}`)
      .send(param)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /categories/id', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/admin/categories/${idResposta}`)
      .expect(204);
  });
});
