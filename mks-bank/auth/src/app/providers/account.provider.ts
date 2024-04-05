import { SignInDTO } from "../services/auth.service"

const CURRENT_USERS = [
    { email: "test@email.com", password: "Test123@" }
]

export const authenticate = async (context: SignInDTO) => {
    if (CURRENT_USERS.find(u =>
        u.email === context.email &&
        u.password === context.password
    ))
        return Promise.resolve(true)

    // @TODO: Implementar metodo authenticate  
    return Promise.resolve(false)
}

export default {
    authenticate
}