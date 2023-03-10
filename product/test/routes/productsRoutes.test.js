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

describe('GET em /products', () => {
  it('Deve retornar uma lista de produtos', async () => {
    await request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST em /admin/products', () => {
  it('Deve cadastrar um novo produto', async () => {
    const resposta = await request(app)
      .post('/admin/products')
      .send({
        nome: 'cacto',
        descricao: 'planta do tipo suculenta',
        slug: 'cacto',
        precoUnico: 100,
        estoque: 10,
        categoria: '63e10684ddcac76b4e30ecd0',
      })
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body._id;
  });
});

describe('GET em /products/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/products/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /products/id', () => {
  // eslint-disable-next-line no-undef
  test.each([
    ['nome', { nome: 'tenis nike experience azul' }],
    ['descricao', { descricao: 'tenis azul' }],
    ['slug', { slug: 'tenis-nike-azul' }],
    ['precoUnico', { precoUnico: 200 }],
    ['estoque', { estoque: 20 }],
    ['categoria', { categoria: '63e3a6233cd679f01f70f043' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/admin/products/${idResposta}`)
      .send(param)
      .expect(200);
    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /products/id', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/admin/products/${idResposta}`)
      .expect(204);
  });
});
