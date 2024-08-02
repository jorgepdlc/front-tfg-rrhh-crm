import type { Pagination } from '@/hookey'

export type Register = {
    registerId: RegisterId
    name: string
    lastname: string
    email: string
    phone: string
    position: string
    username: string
    password: string
    role: 'ADMIN' | 'USER'
}

// TODO: Set the id type
export type RegisterId = string | number

export type RegisterApiResult = {
    // TODO: Replace with actual get api result
    results: Register
}

export type RegisterPaginatedApiResult = {
    // TODO: Replace with actual list api result
    results: Register[]
    count: number
}

export type RegisterListApiParams = Pagination.UsePaginatedQueryParams<{
    // TODO: Add other params here
}>

export type RegisterGetApiParams = {
    resourceId: RegisterId
    // TODO: Add other params here
}

export type RegisterCreateApiParams = {
    newResource: Omit<Register, 'registerId'>
}

export type RegisterUpdateApiParams = {
    updatedResource: Register
    // TODO: Switch params if the api requires an id in the url for updates
    // updatedResource: Omit<Register, 'registerId'>
    // resourceId: RegisterId
    // TODO: Add other params here
}

export type RegisterDeleteApiParams = {
    resourceId: RegisterId
    // TODO: Add other params here
}
