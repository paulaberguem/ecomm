import { accounts } from "./createUserAccount.js";

function searchUserAccountByUFUseCase(uf){
    const searchByUf = accounts.filter( item => item.uf === uf.toUpperCase());
    return searchByUf
}

export {searchUserAccountByUFUseCase}