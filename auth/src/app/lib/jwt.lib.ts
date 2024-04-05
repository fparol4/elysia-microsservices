import jwt from 'jsonwebtoken'
import jwtSettings from '@/settings/jwt.settings'
import moment from 'moment'

export const generateToken = (data: object) => {
    const expiresDate = moment().add(2, 'hours').toDate()
    const tokenContext = { ...data, expiresDate }
    const accessToken = jwt.sign(tokenContext, jwtSettings.secret, { expiresIn: jwtSettings.expiresIn })
    return {
        accessToken,
        expiresDate: expiresDate
    }
}

export const verifyToken = (jwtToken: string) => {
    const decoded = jwt.verify(jwtToken, jwtSettings.secret)
    return decoded
}

export default {
    generateToken
}
