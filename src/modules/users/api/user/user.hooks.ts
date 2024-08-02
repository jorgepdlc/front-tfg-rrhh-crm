import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { userApi } from './user.api'
import { UserGetApiParams } from './user.types'

export const useUsers = Pagination.makePaginationHook({
    cacheKey: 'user-api-list',
    clientFn: userApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.results,
})

export const useUser = (params: UserGetApiParams) => {
    return useQuery(
        ['user-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => userApi.get(params)
    )
}
