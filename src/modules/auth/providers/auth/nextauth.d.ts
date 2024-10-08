import { ApiSession, DefaultSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
    declare type Role = 'USER' | 'ADMIN'
    declare interface ApiSession {
        accessToken: string
    }
    declare interface User {
        id: number
        role: Role
        name: string
        email: string
        apiSession?: ApiSession
    }

    declare interface Session extends DefaultSession {
        user: User
        apiSession?: ApiSession
    }
}

declare module 'next-auth/jwt' {
    declare interface JWT
        extends WithOptional<ApiSession, 'accessToken'>,
            DefaultJWT {}
}

/*
 * Another way of doing it!
 *  also change auth-options callbacks
 * */
declare module 'next-auth/jwt' {
    declare interface JWT extends DefaultJWT {
        apiSession: ApiSession
        user: User
    }
}
