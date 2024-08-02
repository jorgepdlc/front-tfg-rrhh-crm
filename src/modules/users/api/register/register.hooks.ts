import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { registerApi } from './register.api'
import { RegisterGetApiParams } from './register.types'

export const useRegisters = Pagination.makePaginationHook({
    cacheKey: 'register-api-list',
    clientFn: registerApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.results,
})

export const useRegister = (params: RegisterGetApiParams) => {
    return useQuery(
        ['register-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => registerApi.get(params)
    )
}
