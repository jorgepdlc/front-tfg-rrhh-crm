import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { educationApi } from './education.api'
import { EducationGetApiParams } from './education.types'

export const useEducations = Pagination.makePaginationHook({
    cacheKey: 'education-api-list',
    clientFn: educationApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.data,
})

export const useEducation = (params: EducationGetApiParams) => {
    return useQuery(
        ['education-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => educationApi.get(params)
    )
}
