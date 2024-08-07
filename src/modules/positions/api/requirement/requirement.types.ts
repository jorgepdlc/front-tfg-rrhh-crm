import type { Pagination } from '@/hookey'
import { PositionId } from '../position'
import { SkillId } from '../skill'

export type Requirement = {
    requirementId: RequirementId
    name: string
    description: string
}

export type RequirementId = string | number

export type RequirementApiResult = Requirement

export type RequirementPaginatedApiResult = {
    data: Requirement[]
    count: number
}

export type RequirementListApiParams = Pagination.UsePaginatedQueryParams<{
    positionId: PositionId
}>

export type RequirementCreateApiParams = {
    skillId: SkillId
    positionId: PositionId
}

export type RequirementDeleteApiParams = {
    resourceId: RequirementId
    positionId: PositionId
}
