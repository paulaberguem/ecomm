const accounts = []

function createUserUseCase(name, email, password){
   return accounts.push({
        id: accounts.length + 1,
        name,
        email,
        password,
        createdDate: new Date()
    });
}

export { createUserUseCase };