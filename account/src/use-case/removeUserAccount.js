import { accounts } from "./createUserAccount.js"
import { searchUserAccountByEmailUseCase } from "./searchUserAccountByEmail.js";

function removeUserUseCase(email){
    const userIndex = accounts.findIndex(item => item.email === email)
    if (userIndex === -1) return false

    accounts.splice(userIndex, 1);

    const userRemove = searchUserAccountByEmailUseCase(email)
    return (userRemove === "user not found") ? true : false; 
}

export {removeUserUseCase}