import Elysia, { t } from 'elysia'
import { HttpStatusCode } from 'axios'
import { validate } from '@/services/auth.service'

const ValidateTokenSchema = {
    body: t.Object({
        access_token: t.String()
    })
}

export const ValidateTokenHandler = new Elysia()
    .post('/auth/validate', async (context) => {
        await validate({
            accessToken: context.body.access_token
        })

        context.set.status = HttpStatusCode.Accepted
        return {
            statusCode: HttpStatusCode.Accepted,
            message: 'Accesstoken verified successfully'
        }
    }, ValidateTokenSchema)