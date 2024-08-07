import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { requirementApi } from './requirement.api'
import { RequirementGetApiParams } from './requirement.types'

export const useRequirements = Pagination.makePaginationHook({
    cacheKey: 'requirement-api-list',
    clientFn: requirementApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.results,
})

export const useRequirement = (params: RequirementGetApiParams) => {
    return useQuery(
        ['requirement-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => requirementApi.get(params)
    )
}
