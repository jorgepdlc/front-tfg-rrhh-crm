import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { participantApi } from './participant.api'
import { ParticipantGetApiParams } from './participant.types'

export const useParticipants = Pagination.makePaginationHook({
    cacheKey: 'participant-api-list',
    clientFn: participantApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.data,
})

export const useParticipant = (params: ParticipantGetApiParams) => {
    return useQuery(['participant-api-get', params] as [string, typeof params])
}
