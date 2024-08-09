import type { Pagination } from '@/hookey'

export type Cv = {
    cvId: CvId
}

// TODO: Set the id type
export type CvId = string | number

export type CvApiResult = {
    // TODO: Replace with actual get api result
    results: Cv
}

export type CvPaginatedApiResult = {
    // TODO: Replace with actual list api result
    results: Cv[]
    count: number
}

export type CvListApiParams = Pagination.UsePaginatedQueryParams<{
    // TODO: Add other params here
}>

export type CvGetApiParams = {
    resourceId: CvId
    // TODO: Add other params here
}

export type CvCreateApiParams = {
    newResource: Omit<Cv, 'cvId'>
    // TODO: Add other params here
}

export type CvUpdateApiParams = {
    updatedResource: Cv
    // TODO: Switch params if the api requires an id in the url for updates
    // updatedResource: Omit<Cv, 'cvId'>
    // resourceId: CvId
    // TODO: Add other params here
}

export type CvDeleteApiParams = {
    resourceId: CvId
    // TODO: Add other params here
}
