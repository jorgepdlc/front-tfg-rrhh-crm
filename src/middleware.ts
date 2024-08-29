import { authOptions } from '@/auth/providers/auth/auth.options'
import { withAuth } from 'next-auth/middleware'

export default withAuth({
    pages: authOptions.pages,
    callbacks: {
        authorized({ req, token }) {
            if (token) return true
            const pathname = req.nextUrl.pathname

            return (
                pathname.startsWith('/_next/') ||
                pathname.startsWith('/favicon.ico') ||
                pathname.startsWith('/assets/') ||
                pathname === '/'
            )
        },
    },
})
