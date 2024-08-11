import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    ExperienceApiResult,
    ExperienceCreateApiParams,
    ExperienceDeleteApiParams,
    ExperienceGetApiParams,
    ExperienceId,
    ExperienceListApiParams,
    ExperiencePaginatedApiResult,
    ExperienceUpdateApiParams,
} from './experience.types'
import { CandidateId } from '../candidate'

export const experienceApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/candidates`

    type UrlParams = { resourceId?: ExperienceId; candidateId: CandidateId }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        // TODO: Customize the endpoint url generation here
        return `${endpointUrl}/${urlParams.candidateId}/experience${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            {
                page,
                size,
                candidateId,
                ...otherQueryParams
            }: ExperienceListApiParams
        ): Promise<ExperiencePaginatedApiResult> {
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
                `Listing Experience with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as ExperiencePaginatedApiResult
        },
        async delete(
            this: ApiContext,
            {
                resourceId,
                candidateId,
                ...queryParams
            }: ExperienceDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId, candidateId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Experience with id:`,
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
                ...queryParams
            }: ExperienceCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { candidateId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Experience resource:`,
                newResource,
                `on url: ${url}`
            )
            const response = await this.client.post(url, newResource)

            return response.status >= 200 && response.status < 300
        },
        async update(
            this: ApiContext,
            {
                updatedResource,
                resourceId,
                candidateId,
                ...queryParams
            }: ExperienceUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `updating Experience resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, candidateId, ...queryParams }: ExperienceGetApiParams
        ): Promise<ExperienceApiResult> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Getting Experience with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as ExperienceApiResult
        },
        ...defaultApiContext,
    }
}

export const experienceApi = experienceApiProto()
