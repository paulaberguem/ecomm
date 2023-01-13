import { accounts } from "./createUserAccount.js";

function searchUserAccountByEmailUseCase(email){
    const searchByEmail = accounts.find( item => item.email === email);
    return searchByEmail ? "user found" : "user not found";
}

export {searchUserAccountByEmailUseCase}