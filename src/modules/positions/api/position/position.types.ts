import { CandidateId } from '@/candidates/api/candidate'
import type { Pagination } from '@/hookey'

export type Position = {
    id: PositionId
    name: string
    department: string
    description: string
    yearsExperience: number
    location: 'MADRID' | 'BARCELONA' | 'SALAMANCA' | 'CANTABRIA' | 'REMOTE'
    publicationDate: string
    positionStatus: 'OPEN' | 'CLOSED'
    employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY'
    salaryRangeMin: number
    salaryRangeMax: number
    jobLevel: string
    requirements: [
        {
            name: string
            description: string
            id: number
        }
    ]
    candidates: [
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

export type PositionUpdate = {
    id: PositionId
    name: string
    department: string
    description: string
    yearsExperience: number
    location: 'MADRID' | 'BARCELONA' | 'SALAMANCA' | 'CANTABRIA' | 'REMOTE'
    publicationDate: string
    positionStatus: 'OPEN' | 'CLOSED'
    employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY'
    salaryRangeMin: number
    salaryRangeMax: number
    jobLevel: string
}

export type PositionId = string | number

export type PositionApiResult = Position

export type PositionPaginatedApiResult = {
    data: Position[]
    count: number
}

export type PositionListApiParams = Pagination.UsePaginatedQueryParams<{}>

export type PositionGetApiParams = {
    resourceId: PositionId
}

export type PositionCreateApiParams = {
    newResource: Omit<PositionUpdate, 'id'>
}

export type PositionUpdateApiParams = {
    updatedResource: Omit<PositionUpdate, 'id'>
    resourceId: PositionId
}

export type PositionDeleteApiParams = {
    resourceId: PositionId
}
