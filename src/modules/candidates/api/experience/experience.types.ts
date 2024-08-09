import type { Pagination } from '@/hookey'
import { CandidateId } from '../candidate'

export type Experience = {
    id: ExperienceId
    position: string
    company: string
    startedDate: string
    finishedDate: string
    duration: number
    tasks: [
        {
            name: string
            description: string
            id: number
        }
    ]
}

export type ExperienceListItem = {
    id: ExperienceId
    position: string
    company: string
    startedDate: string
    finishedDate: string
    duration: number
}

export type ExperienceUpdate = {
    id: ExperienceId
    position: string
    company: string
    startedDate: string
    finishedDate: string
}

export type ExperienceId = string | number

export type ExperienceApiResult = Experience

export type ExperiencePaginatedApiResult = {
    data: ExperienceListItem[]
    count: number
}

export type ExperienceListApiParams = Pagination.UsePaginatedQueryParams<{
    candidateId: CandidateId
}>

export type ExperienceGetApiParams = {
    resourceId: ExperienceId
    candidateId: CandidateId
}

export type ExperienceCreateApiParams = {
    newResource: Omit<ExperienceUpdate, 'id'>
    candidateId: CandidateId
}

export type ExperienceUpdateApiParams = {
    updatedResource: Omit<ExperienceUpdate, 'id'>
    resourceId: ExperienceId
    candidateId: CandidateId
}

export type ExperienceDeleteApiParams = {
    resourceId: ExperienceId
    candidateId: CandidateId
}
