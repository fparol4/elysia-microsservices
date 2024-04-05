import { HttpStatusCode } from 'axios'
import Elysia from 'elysia'

export const HealthCheckHandler = new Elysia()
    .get('/health-check', (context) => {
        context.set.status = HttpStatusCode.Ok
        return {
            statusCode: HttpStatusCode.Ok,
            message: 'Health checked successfully',
        }
    }, {
        detail: {
            tags: ['hc']
        }
    })