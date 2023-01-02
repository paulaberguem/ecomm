import {createUserUseCase} from "../src/use-case/createUserAccount.js";

const users = [
    {
        name: 'Maria Silva',
        email: 'maria@email.com',
        password: '123',
    },
    {
        name: 'Bia Santos',
        email: 'bia@email.com',
        password: '456',
    }
];

users.map(user => {
    console.log(createUserUseCase(user))
});