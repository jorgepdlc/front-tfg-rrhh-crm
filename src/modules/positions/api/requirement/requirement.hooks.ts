import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { requirementApi } from './requirement.api'

export const useRequirements = Pagination.makePaginationHook({
    cacheKey: 'requirement-api-list',
    clientFn: requirementApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.data,
})
