import { accounts } from "./createUserAccount.js"

function addAddressByEmailCase(email, address){
    const userFound = accounts.find(item => item.email === email)
    if (!userFound) return "user not found";

    const userData = {...userFound, ...address};

    return userData;
}

export {addAddressByEmailCase}