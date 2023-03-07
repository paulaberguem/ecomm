import request from 'supertest';
import {
  describe, expect, it, jest, afterAll, beforeAll,
} from '@jest/globals';
import mongoose from 'mongoose';
import app from '../../src/app.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://admin:secret@localhost:27017/ecomm-account-test?authSource=admin');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /admin/users', () => {
  it('Deve retornar uma lista de usuários', async () => {
    await request(app)
      .get('/admin/users')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST /admin/users', () => {
  it('Deve cadastrar um novo usuário', async () => {
    const response = await request(app)
      .post('/admin/users')
      .send({
        nome: 'Sansa Stark',
        email: 'sansa@email.com',
        senha: 'baleia22#',
        cpf: '12345698778',
        telefone: '7955552222',
        endereco: {
          logradouro: 'Rua da Matriz',
          numero: '654',
          complemento: 'casa verde',
          cep: '40555100',
          cidade: 'Salvador',
          estado: 'BA',
        },
      })
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(201);

    idResposta = response.body._id;
  });
});

describe('GET /users/:id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/users/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /admin/users/:id', () => {
  test.each([
    ['nome', { nome: 'Sansa Stark Red' }],
    ['email', { email: 'sansa_stark@email.com' }],
    ['senha', { senha: 'baleia55#' }],
    ['cpf', { cpf: '12345698779' }],
    ['telefone', { telefone: '7955552222' }],
    ['logradouro', { endereco: { logradouro: 'Rua Chile' } }],
    ['numero', { endereco: { numero: '600' } }],
    ['complemento', { endereco: { complemento: 'casa vermelha' } }],
    ['cep', { endereco: { cep: '40555101' } }],
    ['cidade', { endereco: { cidade: 'Recife' } }],
    ['uf', { endereco: { uf: 'PE' } }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/admin/users/${idResposta}`)
      .send(param)
      .expect(200);
    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE /admin/users/:id', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/admin/users/${idResposta}`)
      .set('Accept', 'application/json')
      .expect(200);
  });
});
