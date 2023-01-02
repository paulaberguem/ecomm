const accounts = []

function createUserUseCase(user){
   const userCreate = {
        id: accounts.length + 1,
        name: user.name,
        email: user.email,
        password: user.password,
        createdDate: new Date()
    };
    accounts.push(userCreate);
    return userCreate
}

export { createUserUseCase };