import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { positionCandidateApi } from './position-candidate.api'
import { PositionCandidateGetApiParams } from './position-candidate.types'

export const usePositionCandidates = Pagination.makePaginationHook({
    cacheKey: 'position-candidate-api-list',
    clientFn: positionCandidateApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.results,
})

export const usePositionCandidate = (params: PositionCandidateGetApiParams) => {
    return useQuery(
        ['position-candidate-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => positionCandidateApi.get(params)
    )
}
