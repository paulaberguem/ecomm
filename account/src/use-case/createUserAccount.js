const accounts = [
    {
        id: 1,
        name: 'Tom Souza',
        email: 'tom@email.com',
        password: '000',
        createdDate: '2023-01-03'
    },
    {
        id: 2,
        name: 'Ana Lima',
        email: 'ana@email.com',
        password: 'aaa',
        createdDate: '2023-01-03'
    },
];

function createUserUseCase(user){
   const userCreate = {
        id: accounts.length + 1,
        name: user.name,
        email: user.email,
        password: user.password,
        createdDate: new Date()
    };
    accounts.push(userCreate);
    return userCreate
}

export { createUserUseCase, accounts };