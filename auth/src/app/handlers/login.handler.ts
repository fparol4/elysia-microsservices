import Elysia, { t } from 'elysia'
import { HttpStatusCode } from 'axios'
import { login } from '@/services/auth.service'

const LoginSchema = {
    body: t.Object({
        email: t.String(),
        password: t.String()
    })
}

export const LoginHandler = new Elysia()
    .post('/auth', async (context) => {
        const {
            accessToken,
            expiresDate
        } = await login(context.body)

        context.set.status = HttpStatusCode.Accepted
        return {
            statusCode: HttpStatusCode.Accepted,
            message: 'Login was successful',
            data: {
                access_token: accessToken,
                expires_date: expiresDate
            }
        }
    }, LoginSchema)