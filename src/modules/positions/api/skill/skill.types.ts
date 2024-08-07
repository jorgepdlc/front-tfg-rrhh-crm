import type { Pagination } from '@/hookey'

export type Skill = {
    skillId: SkillId
    name: string
    description: string
}

export type SkillId = string | number

export type SkillApiResult = Skill

export type SkillPaginatedApiResult = {
    data: Skill[]
    count: number
}

export type SkillListApiParams = Pagination.UsePaginatedQueryParams<{}>

export type SkillGetApiParams = {
    resourceId: SkillId
}
