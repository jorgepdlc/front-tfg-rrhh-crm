import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { linksApi } from './links.api'
import { LinksGetApiParams } from './links.types'

export const useLinkss = Pagination.makePaginationHook({
    cacheKey: 'links-api-list',
    clientFn: linksApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.data,
})

export const useLinks = (params: LinksGetApiParams) => {
    return useQuery(
        ['links-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => linksApi.get(params)
    )
}
