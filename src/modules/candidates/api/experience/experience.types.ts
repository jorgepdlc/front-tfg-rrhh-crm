import type { Pagination } from '@/hookey'
import { CandidateId } from '../candidate'

export type Experience = {
    experienceId: ExperienceId
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

export type ExperienceUpdate = {
    experienceId: ExperienceId
    position: string
    company: string
    startedDate: string
    finishedDate: string
    duration: number
}

export type ExperienceId = string | number

export type ExperienceApiResult = Experience

export type ExperiencePaginatedApiResult = {
    results: ExperienceUpdate[]
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
    newResource: Omit<ExperienceUpdate, 'experienceId'>
    candidateId: CandidateId
}

export type ExperienceUpdateApiParams = {
    updatedResource: Omit<ExperienceUpdate, 'experienceId'>
    resourceId: ExperienceId
    candidateId: CandidateId
}

export type ExperienceDeleteApiParams = {
    resourceId: ExperienceId
    candidateId: CandidateId
}
