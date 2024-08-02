import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { positionApi } from './position.api'
import { PositionGetApiParams } from './position.types'

export const usePositions = Pagination.makePaginationHook({
    cacheKey: 'position-api-list',
    clientFn: positionApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.data,
})

export const usePosition = (params: PositionGetApiParams) => {
    return useQuery(
        ['position-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => positionApi.get(params)
    )
}
