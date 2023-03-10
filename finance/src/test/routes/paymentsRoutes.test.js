const request = require('supertest');
const { describe, expect, it } = require('@jest/globals');
const app = require('../../index.js');

describe('GET em /payments', () => {
  it('Deve retornar uma lista de pagamentos', async () => {
    const resposta = await request(app)
      .get('/payments')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].status).toEqual('CANCELADO');
  });
});

let idResposta;

describe('POST em /payments', () => {
  it('Deve cadastrar um novo pagamento', async () => {
    const response = await request(app)
      .post('/payments')
      .send({
        valor: 100,
        nome: 'Magali Souza',
        numeroCartao: '5183118881313678',
        dataExpiracao: '2030-03',
        cvv: '111',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(201);
    idResposta = response.body.id;
  });
});

describe('GET em /payments/:id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/payments/${idResposta}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

describe('PATCH em /payments/:id/confirm', () => {
  it('Deve alterar um pagamento para confirmado', async () => {
    await request(app)
      .patch(`/payments/${idResposta}/confirm`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

describe('PATCH em /payments/:id/cancel', () => {
  it('Deve alterar um pagamento para cancelado', async () => {
    await request(app)
      .patch(`/payments/${idResposta}/cancel`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});
