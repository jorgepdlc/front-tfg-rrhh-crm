import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { tasksApi } from './tasks.api'
import { TasksGetApiParams } from './tasks.types'

export const useTaskss = Pagination.makePaginationHook({
    cacheKey: 'tasks-api-list',
    clientFn: tasksApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.results,
})

export const useTasks = (params: TasksGetApiParams) => {
    return useQuery(
        ['tasks-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => tasksApi.get(params)
    )
}
