import type { Pagination } from '@/hookey'

export type User = {
    id: UserId
    name: string
    lastname: string
    email: string
    phone: string
    position: string
    username: string
    role: string
    startedDate: string
    finishedDate: string
}

export type UserUpdate = {
    id: UserId
    name: string
    lastname: string
    email: string
    phone: string
    position: string
    username: string
    password: string
    role: 'ADMIN' | 'USER'
}

export type UserPatch = {
    name?: string
    lastname?: string
    phone?: string
    position?: string
    username?: string
    email?: string
    password?: string
    role?: 'ADMIN' | 'USER'
    finishedDate?: string
}

export type UserId = string | number

export type UserApiResult = User

export type UserPaginatedApiResult = {
    data: User[]
    count: number
}

export type UserListApiParams = Pagination.UsePaginatedQueryParams<{}>

export type UserGetApiParams = {
    resourceId: UserId
}

export type UserCreateApiParams = {
    newResource: Omit<UserUpdate, 'id'>
}

export type UserUpdateApiParams = {
    updatedResource: Omit<UserUpdate, 'id'>
    resourceId: UserId
}

export type UserPatchApiParams = {
    updatedResource: UserPatch
    resourceId: UserId
}

export type UserDeleteApiParams = {
    resourceId: UserId
}
