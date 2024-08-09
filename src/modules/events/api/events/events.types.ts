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

export type EventsUpdate = {
    id: EventsId
    title: string
    startDate: string
    endDate: string
    type: 'INTERVIEW' | 'MEETING' | 'OTHER'
    description: string
    link: string
}

export type EventsId = string | number

export type EventsApiResult = Events

export type EventsPaginatedApiResult = {
    data: Events[]
    count: number
}

export type EventsListApiParams = Pagination.UsePaginatedQueryParams<{}>

export type EventsGetApiParams = {
    resourceId: EventsId
}

export type EventsCreateApiParams = {
    newResource: Omit<EventsUpdate, 'id'>
}

export type EventsUpdateApiParams = {
    updatedResource: Omit<EventsUpdate, 'id'>
    resourceId: EventsId
}

export type EventsDeleteApiParams = {
    resourceId: EventsId
}
