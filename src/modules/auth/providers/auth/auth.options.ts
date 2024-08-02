import { getApiContext } from '@/common/providers/api-context/api-context.default'
import { AuthOptions, Role, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/sign-in',
    },
    callbacks: {
        async session({ session, token }) {
            if (token?.accessToken && session) {
                // Update server side API_CONTEXT
                getApiContext().setAuthorizationToken(token.accessToken)
                session.apiSession = {
                    accessToken: token.accessToken,
                }
                session.user = token.user as User
            }
            return session
        },
        async jwt({ token, user }) {
            if (user?.apiSession) {
                token.accessToken = user.apiSession.accessToken
                token.user = user
            }
            return token
        },
    },
    providers: [
        CredentialsProvider({
            name: 'custom-credentials',
            credentials: {
                username: { type: 'text' },
                password: { type: 'password' },
            },
            authorize: async (credentials, _req) => {
                if (!credentials || credentials.password === '') return null

                const response = await fetch(
                    'http://localhost:8080/rrhh/api/v1/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                        }),
                    }
                )

                if (!response.ok) return null

                type ResponseBody = {
                    token: string
                }
                const response_body = (await response.json()) as ResponseBody

                type JWTPyload = {
                    role: [
                        {
                            authority: Role
                        }
                    ]
                    userId: number
                    email: string
                    sub: string
                }
                const token_payload = JSON.parse(
                    atob(response_body.token.split('.')[1])
                ) as JWTPyload

                const user: User = {
                    id: token_payload.userId,
                    role: token_payload.role[0].authority,
                    name: token_payload.sub,
                    email: token_payload.email,
                    apiSession: {
                        accessToken: response_body.token,
                    },
                }

                return user
            },
        }),
    ],
}
