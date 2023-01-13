import { searchUserAccountByEmailUseCase } from "../src/use-case/searchUserAccountByEmail.js";

const searchEmail = 'tom@email.com';

console.log(searchUserAccountByEmailUseCase(searchEmail));