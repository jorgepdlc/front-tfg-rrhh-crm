import { CandidateId } from '@/candidates/api/candidate'
import type { Pagination } from '@/hookey'

export type Events = {
    id: EventsId
    title: string
    startDate: string
    endDate: string
    type: 'INTERVIEW' | 'MEETING' | 'OTHER'
    description: string
    link: string
    participants: [
        {
            name: string
            lastname: string
            role: string
            email: string
            phone: string
            candidateStatus: 'EMPLOYED' | 'UNEMPLOYED' | 'DISCARDED'
            isAxpe: boolean
            id: CandidateId
        }
    ]
}

// TODO: Set the id type
export type EventsId = string | number

export type EventsApiResult = {
    // TODO: Replace with actual get api result
    results: Events
}

export type EventsPaginatedApiResult = {
    // TODO: Replace with actual list api result
    results: Events[]
    count: number
}

export type EventsListApiParams = Pagination.UsePaginatedQueryParams<{
    // TODO: Add other params here
}>

export type EventsGetApiParams = {
    resourceId: EventsId
    // TODO: Add other params here
}

export type EventsCreateApiParams = {
    newResource: Omit<Events, 'eventsId'>
    // TODO: Add other params here
}

export type EventsUpdateApiParams = {
    updatedResource: Events
    // TODO: Switch params if the api requires an id in the url for updates
    // updatedResource: Omit<Events, 'eventsId'>
    // resourceId: EventsId
    // TODO: Add other params here
}

export type EventsDeleteApiParams = {
    resourceId: EventsId
    // TODO: Add other params here
}
