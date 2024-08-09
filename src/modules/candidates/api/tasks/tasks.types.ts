import type { Pagination } from '@/hookey'
import { CandidateId } from '../candidate'
import { ExperienceId } from '../experience'

export type Tasks = {
    id: TasksId
    name: string
    description: string
}

export type TasksId = string | number

export type TasksApiResult = Tasks

export type TasksPaginatedApiResult = {
    data: Tasks[]
    count: number
}

export type TasksListApiParams = Pagination.UsePaginatedQueryParams<{
    candidateId: CandidateId
    experienceId: ExperienceId
}>

export type TasksGetApiParams = {
    resourceId: TasksId
    candidateId: CandidateId
    experienceId: ExperienceId
}

export type TasksCreateApiParams = {
    newResource: Omit<Tasks, 'id'>
    candidateId: CandidateId
    experienceId: ExperienceId
}

export type TasksUpdateApiParams = {
    updatedResource: Omit<Tasks, 'id'>
    resourceId: TasksId
    candidateId: CandidateId
    experienceId: ExperienceId
}

export type TasksDeleteApiParams = {
    resourceId: TasksId
    candidateId: CandidateId
    experienceId: ExperienceId
}
