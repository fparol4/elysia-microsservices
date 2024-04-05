import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

/** Settings */
import swaggerSettings from '@/settings/swagger.settings'

const app = new Elysia()
app.use(cors())
app.use(swagger(swaggerSettings))


export default app