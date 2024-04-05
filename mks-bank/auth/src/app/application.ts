import { Elysia } from 'elysia'
import appSetup from '@/app/setup'

import { HealthCheckHandler } from '@/handlers/health-check.handler'
import { LoginHandler } from '@/handlers/login.handler'
import { ValidateTokenHandler } from './handlers/validate-token.handler'
import { logger } from '@/settings/pino.settings'

const application = new Elysia()
application.use(appSetup)

/** Setup Logger */
application
    .decorate('logger', logger)
    .onBeforeHandle(({ logger, body, path }) => {
        logger.info(body, `[${path}] - Request Received Succesfully')`)
    })

/** Handlers */
application.use(HealthCheckHandler)
application.use(LoginHandler)
application.use(ValidateTokenHandler)

export const app = application
export default application