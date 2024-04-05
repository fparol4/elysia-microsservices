import { Elysia } from 'elysia'
import { logger } from "@bogeychan/elysia-logger";
import { HealthCheckHandler } from '@/handlers/health-check.handler'

import cors from '@elysiajs/cors';
import swaggerSettings from '@/settings/swagger.settings'
import swagger from '@elysiajs/swagger';

const application = new Elysia()

/** Setup */
application.use(cors())
application.use(swagger(swaggerSettings))
application.use(logger())

/** Handlers */
application.use(HealthCheckHandler)

export default application