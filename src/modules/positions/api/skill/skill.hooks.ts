import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { skillApi } from './skill.api'
import { SkillGetApiParams } from './skill.types'

export const useSkills = Pagination.makePaginationHook({
    cacheKey: 'skill-api-list',
    clientFn: skillApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.results,
})

export const useSkill = (params: SkillGetApiParams) => {
    return useQuery(
        ['skill-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => skillApi.get(params)
    )
}
