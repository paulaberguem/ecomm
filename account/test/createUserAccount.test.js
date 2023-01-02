import { createUserUseCase } from "../src/use-case/createUserAccount";

const list = [
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

list.map(item => {
    console.log(createUserUseCase(item))
});
