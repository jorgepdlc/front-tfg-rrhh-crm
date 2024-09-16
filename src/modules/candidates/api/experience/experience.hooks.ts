import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { experienceApi } from './experience.api'
import { ExperienceGetApiParams } from './experience.types'

export const useExperiences = Pagination.makePaginationHook({
    cacheKey: 'experience-api-list',
    clientFn: experienceApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.data,
})

export const useExperience = (params: ExperienceGetApiParams) => {
    return useQuery(
        ['experience-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => experienceApi.get(params)
    )
}
