import { changeUserNameUseCase } from "../src/use-case/changeUserName.js";

const email = 'ana@email.com';
const newName = 'Ana Paula Lima Souza';

console.log(changeUserNameUseCase(email, newName));