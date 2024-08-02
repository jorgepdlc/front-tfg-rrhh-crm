import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    TasksApiResult,
    TasksCreateApiParams,
    TasksDeleteApiParams,
    TasksGetApiParams,
    TasksId,
    TasksListApiParams,
    TasksPaginatedApiResult,
    TasksUpdateApiParams,
} from './tasks.types'
import { CandidateId } from '../candidate'
import { ExperienceId } from '../experience'

export const tasksApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/candidates`

    type UrlParams = {
        resourceId?: TasksId
        candidateId: CandidateId
        experienceId: ExperienceId
    }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        // TODO: Customize the endpoint url generation here
        return `${endpointUrl}/${urlParams.candidateId}/experience/${urlParams.experienceId}/tasks${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            {
                page,
                size,
                candidateId,
                experienceId,
                ...otherQueryParams
            }: TasksListApiParams
        ): Promise<TasksPaginatedApiResult> {
            const urlParams: UrlParams = { candidateId, experienceId }
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
                `Listing Tasks with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as TasksPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            {
                resourceId,
                candidateId,
                experienceId,
                ...queryParams
            }: TasksDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
                experienceId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Tasks with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            {
                newResource,
                candidateId,
                experienceId,
                ...queryParams
            }: TasksCreateApiParams
        ): Promise<TasksId> {
            const urlParams: UrlParams = { candidateId, experienceId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Tasks resource:`,
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
                return resourceId as TasksId
            }

            console.warn(new Error('No location header received'))
            return '' as TasksId
        },
        async update(
            this: ApiContext,
            {
                updatedResource,
                resourceId,
                candidateId,
                experienceId,
                ...queryParams
            }: TasksUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
                experienceId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `updating Tasks resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            {
                resourceId,
                candidateId,
                experienceId,
                ...queryParams
            }: TasksGetApiParams
        ): Promise<TasksApiResult> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
                experienceId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Getting Tasks with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as TasksApiResult
        },
        ...defaultApiContext,
    }
}

export const tasksApi = tasksApiProto()
