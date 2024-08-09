import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { cvApi } from './cv.api'
import { CvGetApiParams } from './cv.types'

export const useCvs = Pagination.makePaginationHook({
    cacheKey: 'cv-api-list',
    clientFn: cvApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.results,
})

export const useCv = (params: CvGetApiParams) => {
    return useQuery(
        ['cv-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => cvApi.get(params)
    )
}
