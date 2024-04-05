import { describe, expect, it } from "bun:test";
import { app } from '@/app/application'
import serverSettings from "@/settings/server.settings";
import { HttpStatusCode } from "axios";

describe('Application health-check', () => {
    it('Should return HttpStatusCode.OK when server is running up', async () => {
        const healthCheckUrl = serverSettings.baseUrl + '/health-check'
        const testRequest = new Request(healthCheckUrl)

        const response = await app.handle(testRequest)
        const responseContext = await response.json()

        expect(response.status).toBe(HttpStatusCode.Ok)
        expect(responseContext).toStrictEqual({
            statusCode: HttpStatusCode.Ok,
            message: 'Health checked successfully',
        })
    })
})