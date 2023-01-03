import { changeUserNameUseCase } from "../src/use-case/changeUserName.js";

const email = 'ana@email.com';
const newName = 'Ana Paula Lima';

console.log(changeUserNameUseCase(email, newName));