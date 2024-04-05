import { expect, it } from "bun:test";
import { HttpStatusCode } from "axios";
import { app } from '@/app/application'
import serverSettings from "@/settings/server.settings";
import { getRequestContext } from "@/shared/test/utils/request-context";


let _access_token: string; 
it('Should test authentication with valid credentials', async () => {
    const url = `${serverSettings.baseUrl}/auth`
    const request = getRequestContext({
        url, 
        body: {
            email: 'test@email.com',
            password: 'Test123@'
        },
        method: 'POST'
    })

    const response = await app.handle(request)
    const responseContext = await response.json()
    expect(response.status).toBe(HttpStatusCode.Accepted)
    _access_token = responseContext.data.access_token
    expect(responseContext.data.access_token).toBeString()
    expect(responseContext.data.expires_date).toBeString()

})

it('Should verify if token is valid after login', async () => {
    const url = `${serverSettings.baseUrl}/auth/validate`
    const request = getRequestContext({
        url, 
        body: {
            access_token: _access_token
        },
        method: 'POST'
    })

    const response = await app.handle(request)
    const responseContext = await response.json()

    expect(response.status).toBe(HttpStatusCode.Accepted)
    expect(responseContext).toStrictEqual({
        statusCode: 202,
        message: "Accesstoken verified successfully",
      })
})  
