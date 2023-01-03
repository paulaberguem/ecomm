import { addAddressByEmailCase } from "../src/use-case/addAddressByEmail.js";

const address = {
    logradouro: 'rua da batatinha',
    numero: 10,
    complemento: 'apto 40',
    bairro: 'feijão',
    cep: '80022-000',
    cidade: 'São Paulo',
    uf: 'SP'
};

const email = 'ana@email.com';

console.log(addAddressByEmailCase(email, address));