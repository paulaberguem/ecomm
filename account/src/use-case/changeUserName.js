import { accounts } from "./createUserAccount.js"

function changeUserNameUseCase(email, newName){
    const userIndex = accounts.findIndex(item => item.email === email)
    if (userIndex === -1) return "user not found"

    accounts[userIndex].name = newName;

    return accounts[userIndex]
}

export {changeUserNameUseCase}