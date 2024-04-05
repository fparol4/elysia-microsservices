import Elysia from 'elysia'
import { HttpStatusCode } from 'axios'
import serverSettings from '@/settings/server.settings'

export const HealthCheckHandler = new Elysia()
    .get('/health-check', (context) => {
        context.set.status = HttpStatusCode.Ok
        return {
            statusCode: HttpStatusCode.Ok,
            message: `[${serverSettings.appName}] - Health checked successfully`,

        }
    })
