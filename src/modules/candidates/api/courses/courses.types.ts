import type { Pagination } from '@/hookey'
import { CandidateId } from '../candidate'

export type Courses = {
    coursesId: CoursesId
    title: string
    institution: string
    endDate: string
}

export type CoursesId = string | number

export type CoursesApiResult = Courses

export type CoursesPaginatedApiResult = {
    // TODO: Replace with actual list api result
    data: Courses[]
    count: number
}

export type CoursesListApiParams = Pagination.UsePaginatedQueryParams<{
    candidateId: CandidateId
}>

export type CoursesGetApiParams = {
    resourceId: CoursesId
    candidateId: CandidateId
}

export type CoursesCreateApiParams = {
    newResource: Omit<Courses, 'coursesId'>
    candidateId: CandidateId
}

export type CoursesUpdateApiParams = {
    updatedResource: Omit<Courses, 'coursesId'>
    resourceId: CoursesId
    candidateId: CandidateId
}

export type CoursesDeleteApiParams = {
    resourceId: CoursesId
    candidateId: CandidateId
}
