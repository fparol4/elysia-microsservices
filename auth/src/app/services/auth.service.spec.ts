import {
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    jest,
    mock,
} from "bun:test";
import moment from "moment";

import { authenticate } from '@/providers/account.provider'
import { AppError } from "@/errors/app.error";
import { login, validate } from "@/services/auth.service";
import { UnauthorizedError } from "@/errors/unauthorized.error";

describe('login()', () => {
    const mockDate = new Date('2024-10-04 15:00:00')

    beforeAll(() => jest.setSystemTime(mockDate))
    beforeEach(() => jest.clearAllMocks())

    it('Should login succesfully', async () => {
        mock.module('@/app/providers/account.provider', () => ({
            authenticate: jest.fn().mockResolvedValue(true)
        }))

        const context = {
            email: 'email@example.com',
            password: 'password'
        }

        const response = await login(context)

        expect(authenticate).toHaveBeenCalledTimes(1)
        expect(response.accessToken).toBeString()
        expect(response.expiresDate).toBeDate()
    })

    it('Should throw an error when is not authorized', async () => {
        mock.module('@/app/providers/account.provider', () => ({
            authenticate: jest.fn().mockResolvedValue(false)
        }))

        const context = {
            email: 'email@example.com',
            password: 'password'
        }

        expect(login(context)).rejects.toThrow(
            new AppError({
                message: 'Login was unsuccessful - username or password is incorrect'
            })
        )
    })

})

describe('validateToken()', () => {
    beforeEach(() => jest.clearAllMocks())

    it('Should verify an accessToken successfully', async () => {
        mock.module('@/app/providers/account.provider', () => ({
            authenticate: jest.fn().mockResolvedValue(true)
        }))

        const authContext = {
            email: 'email@example.com',
            password: '12345'
        }

        const { accessToken } = await login(authContext)
        const decodedToken = await validate({ accessToken })
        expect(decodedToken).toBeDefined()
    })

    it('Should throw an error when token is expired', async () => {
        mock.module('@/app/providers/account.provider', () => ({
            authenticate: jest.fn().mockResolvedValue(true)
        }))

        const tokenCreationDate = moment('2024-10-04 15:00:00')
        jest.setSystemTime(tokenCreationDate.toDate())

        const authContext = {
            email: 'email@example.com',
            password: '12345'
        }

        const { accessToken } = await login(authContext)

        tokenCreationDate.add(3, 'hours')
        jest.setSystemTime(tokenCreationDate.toDate())

        expect(validate({ accessToken })).rejects
            .toThrow(new UnauthorizedError('Accesstoken is expired'))
    })

    it('Should throw an error when token is invalid', async () => {
        mock.module('@/app/providers/account.provider', () => ({
            authenticate: jest.fn().mockResolvedValue(true)
        }))

        const tokenCreationDate = moment('2024-10-04 15:00:00')
        jest.setSystemTime(tokenCreationDate.toDate())

        const authContext = {
            email: 'email@example.com',
            password: '12345'
        }

        const { accessToken } = await login(authContext)

        expect(validate({ accessToken: accessToken.slice(-1) })).rejects
            .toThrow(new UnauthorizedError('Accesstoken is not valid'))
    })
})