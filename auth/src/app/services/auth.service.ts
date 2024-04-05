
import moment from "moment";
import { BadRequestError } from "../errors/bad-request.error";
import { generateToken, verifyToken } from "../lib/jwt.lib";
import { authenticate } from "../providers/account.provider";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { JwtPayload } from "jsonwebtoken";

export interface SignInDTO {
    email: string;
    password: string;
}

export const login = async (context: SignInDTO) => {
    const isAuthorized = await authenticate(context)

    if (!isAuthorized) {
        throw new BadRequestError('Login was unsuccessful - username or password is incorrect')
    }

    const { accessToken, expiresDate } = generateToken(context)

    return {
        accessToken,
        expiresDate
    }
}

interface ValidateDTO {
    accessToken: string
}

export const validate = async (context: ValidateDTO): Promise<JwtPayload> => {
    try {
        return verifyToken(context.accessToken) as Promise<JwtPayload>
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            throw new UnauthorizedError('Accesstoken is expired')
        }

        throw new UnauthorizedError('Accesstoken is not valid')
    }
}