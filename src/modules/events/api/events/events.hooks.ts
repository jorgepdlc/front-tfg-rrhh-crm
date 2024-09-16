import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { eventsApi } from './events.api'
import { EventsGetApiParams } from './events.types'

export const useEventss = Pagination.makePaginationHook({
    cacheKey: 'events-api-list',
    clientFn: eventsApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.data,
})

export const useEvents = (params: EventsGetApiParams) => {
    return useQuery(
        ['events-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => eventsApi.get(params)
    )
}
