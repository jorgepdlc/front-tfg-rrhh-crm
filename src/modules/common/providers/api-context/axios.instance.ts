import axios from 'axios'

const isServer = typeof window === 'undefined'
const baseURL =
    (isServer
        ? process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_URL) || ''

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance
