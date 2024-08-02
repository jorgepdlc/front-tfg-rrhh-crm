import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { candidateApi } from './candidate.api'
import { CandidateGetApiParams } from './candidate.types'

export const useCandidates = Pagination.makePaginationHook({
    cacheKey: 'candidate-api-list',
    clientFn: candidateApi.list,
    useApiContext: useApiContext,
    getCount: (data) => data.count,
    getPageData: (data) => data.data,
})

export const useCandidate = (params: CandidateGetApiParams) => {
    return useQuery(
        ['candidate-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => candidateApi.get(params)
    )
}
