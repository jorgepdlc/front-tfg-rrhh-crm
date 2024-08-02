import type { Pagination } from '@/hookey'
import { CandidateId } from '../candidate'

export type Education = {
    educationId: EducationId
    degree: string
    school: string
    endDate: string
}

// TODO: Set the id type
export type EducationId = string | number

export type EducationApiResult = Education

export type EducationPaginatedApiResult = {
    // TODO: Replace with actual list api result
    results: Education[]
    count: number
}

export type EducationListApiParams = Pagination.UsePaginatedQueryParams<{
    candidateId: CandidateId
}>

export type EducationGetApiParams = {
    resourceId: EducationId
    candidateId: CandidateId
}

export type EducationCreateApiParams = {
    newResource: Omit<Education, 'educationId'>
    candidateId: CandidateId
}

export type EducationUpdateApiParams = {
    updatedResource: Omit<Education, 'educationId'>
    resourceId: EducationId
    candidateId: CandidateId
}

export type EducationDeleteApiParams = {
    resourceId: EducationId
    candidateId: CandidateId
}
