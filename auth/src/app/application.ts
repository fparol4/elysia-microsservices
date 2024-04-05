import { Elysia } from 'elysia'
import { HealthCheckHandler } from '@/handlers/health-check.handler'
import { LoginHandler } from '@/handlers/login.handler'
import { ValidateTokenHandler } from './handlers/validate-token.handler'
import { logger } from "@bogeychan/elysia-logger";

import swagger from '@elysiajs/swagger';
import swaggerSettings from '@/settings/swagger.settings';
import cors from '@elysiajs/cors';

const application = new Elysia()
application.use(cors())
application.use(swagger(swaggerSettings))
application.use(logger())


/** Handlers */
application.use(HealthCheckHandler)
application.use(LoginHandler)
application.use(ValidateTokenHandler)

export const app = application
export default application