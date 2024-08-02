import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    CoursesApiResult,
    CoursesCreateApiParams,
    CoursesDeleteApiParams,
    CoursesGetApiParams,
    CoursesId,
    CoursesListApiParams,
    CoursesPaginatedApiResult,
    CoursesUpdateApiParams,
} from './courses.types'
import { CandidateId } from '../candidate'

export const coursesApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/candidates`

    type UrlParams = {
        resourceId?: CoursesId
        candidateId: CandidateId
    }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        return `${endpointUrl}/${urlParams.candidateId}/courses${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            {
                page,
                size,
                candidateId,
                ...otherQueryParams
            }: CoursesListApiParams
        ): Promise<CoursesPaginatedApiResult> {
            const urlParams: UrlParams = { candidateId }
            const queryParams = {
                // TODO: Map the pagination params as required by the API
                page: `${page}`,
                size: `${size}`,
                // limit: `${size}`,
                // offset: `${Math.max((page - 1) * size, 0)}`,
                ...otherQueryParams,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Listing Courses with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            return response.data as CoursesPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, candidateId, ...queryParams }: CoursesDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId, candidateId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Courses with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, candidateId, ...queryParams }: CoursesCreateApiParams
        ): Promise<CoursesId> {
            const urlParams: UrlParams = { candidateId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Courses resource:`,
                newResource,
                `on url: ${url}`
            )
            const response = await this.client.post(url, newResource)

            // TODO: Add code handle the response if needed

            // TODO: Adapt code to handle the receiving of the resourceId (if any)
            const locationHeader = response.headers.location as
                | string
                | undefined

            if (locationHeader) {
                const segments = new URL(locationHeader).pathname.split('/')
                const lastIdx = segments.length - 1
                const resourceId =
                    segments[lastIdx] || segments[Math.max(lastIdx - 1, 0)]
                if (!resourceId)
                    console.warn(new Error('Invalid location header received'))
                return resourceId as CoursesId
            }

            console.warn(new Error('No location header received'))
            return '' as CoursesId
        },
        async update(
            this: ApiContext,
            {
                updatedResource,
                resourceId,
                candidateId,
                ...queryParams
            }: CoursesUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `updating Courses resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, candidateId, ...queryParams }: CoursesGetApiParams
        ): Promise<CoursesApiResult> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Getting Courses with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            return response.data as CoursesApiResult
        },
        ...defaultApiContext,
    }
}

export const coursesApi = coursesApiProto()
