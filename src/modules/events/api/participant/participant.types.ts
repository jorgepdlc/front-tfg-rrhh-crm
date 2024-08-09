import type { Pagination } from '@/hookey'
import { EventsId } from '../events'
import { CandidateId } from '@/candidates/api/candidate'

export type Participant = {
    id: ParticipantId
    name: string
    lastname: string
    role: string
    email: string
    phone: string
    candidateStatus: 'EMPLOYED' | 'UNEMPLOYED' | 'DISCARDED'
    isAxpe: boolean
}

export type ParticipantId = string | number

export type ParticipantApiResult = Participant

export type ParticipantPaginatedApiResult = {
    data: Participant[]
    count: number
}

export type ParticipantListApiParams = Pagination.UsePaginatedQueryParams<{
    eventId: EventsId
}>

export type ParticipantGetApiParams = {
    resourceId: ParticipantId
    eventId: EventsId
}

export type ParticipantCreateApiParams = {
    candidateId: CandidateId
    eventId: EventsId
}

export type ParticipantDeleteApiParams = {
    resourceId: ParticipantId
    eventId: EventsId
}
