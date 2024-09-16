import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { coursesApi } from './courses.api'
import { CoursesGetApiParams } from './courses.types'

export const useCoursess = Pagination.makePaginationHook({
    cacheKey: 'courses-api-list',
    clientFn: coursesApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.data,
})

export const useCourses = (params: CoursesGetApiParams) => {
    return useQuery(
        ['courses-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => coursesApi.get(params)
    )
}
