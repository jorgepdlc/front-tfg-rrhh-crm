import { CandidateId } from '@/candidates/api/candidate'
import type { Pagination } from '@/hookey'
import { PositionId } from '../position/position.types'

export type PositionCandidate = {
    id: PositionCandidateId
    name: string
    lastname: string
    role: string
    email: string
    phone: string
    candidateStatus: 'EMPLOYED' | 'UNEMPLOYED' | 'DISCARDED'
    isAxpe: boolean
}

export type PositionCandidateId = string | number

export type PositionCandidateApiResult = PositionCandidate

export type PositionCandidatePaginatedApiResult = {
    data: PositionCandidate[]
    count: number
}

export type PositionCandidateListApiParams =
    Pagination.UsePaginatedQueryParams<{
        positionId: PositionId
    }>

export type PositionCandidateGetApiParams = {
    resourceId: PositionCandidateId
    positionId: PositionId
}

export type PositionCandidateCreateApiParams = {
    candidateId: CandidateId
    positionId: PositionId
}

export type PositionCandidateDeleteApiParams = {
    resourceId: PositionCandidateId
    positionId: PositionId
}
