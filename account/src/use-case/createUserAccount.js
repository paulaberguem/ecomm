const accounts = [
  {
    id: 1,
    name: "Tom Souza",
    email: "tom@email.com",
    password: "000",
    createdDate: "2023-01-03",
  },
  {
    id: 2,
    name: "Ana Lima",
    email: "ana@email.com",
    password: "aaa",
    createdDate: "2023-01-03",
    logradouro: 'rua pedrinha',
    numero: 101,
    complemento: 'casa',
    bairro: 'dendê',
    cep: '80022-222',
    cidade: 'Salvador',
    uf: 'BA',
  },
  {
    id: 3,
    name: "Liz Santos",
    email: "liz@email.com",
    password: "zzz",
    createdDate: "2023-01-03",
    logradouro: 'av cenoura',
    numero: 19,
    complemento: 'apto 202',
    bairro: 'centro',
    cep: '80022-000',
    cidade: 'São Paulo',
    uf: 'SP',
  },
  {
    id: 4,
    name: "Dom Pedro",
    email: "dom@email.com",
    password: "ddd",
    createdDate: "2023-01-03",
    logradouro: "rua da batatinha",
    numero: 10,
    complemento: "apto 40",
    bairro: "feijão",
    cep: "80022-000",
    cidade: "São Paulo",
    uf: "SP",
  },
];

function createUserUseCase(user) {
  const userCreate = {
    id: accounts.length + 1,
    name: user.name,
    email: user.email,
    password: user.password,
    createdDate: new Date(),
  };
  accounts.push(userCreate);
  return userCreate;
}

export { createUserUseCase, accounts };
