import { JwtPayload } from "jsonwebtoken"

export type authenticatedRequest = Request &{
    user?: JwtPayload | any
    cookies: {
        token?: string
    }
}