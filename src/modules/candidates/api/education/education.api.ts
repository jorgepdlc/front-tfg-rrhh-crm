import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    EducationApiResult,
    EducationCreateApiParams,
    EducationDeleteApiParams,
    EducationGetApiParams,
    EducationId,
    EducationListApiParams,
    EducationPaginatedApiResult,
    EducationUpdateApiParams,
} from './education.types'
import { CandidateId } from '../candidate'

export const educationApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/candidates`

    type UrlParams = {
        candidateId: CandidateId
        resourceId?: EducationId
    }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        return `${endpointUrl}/${urlParams.candidateId}/education${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            {
                page,
                size,
                candidateId,
                ...otherQueryParams
            }: EducationListApiParams
        ): Promise<EducationPaginatedApiResult> {
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
                `Listing Education with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as EducationPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            {
                resourceId,
                candidateId,
                ...queryParams
            }: EducationDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId, candidateId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Education with id:`,
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
            }: EducationCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { candidateId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Education resource:`,
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
            }: EducationUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `updating Education resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, candidateId, ...queryParams }: EducationGetApiParams
        ): Promise<EducationApiResult> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Getting Education with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as EducationApiResult
        },
        ...defaultApiContext,
    }
}

export const educationApi = educationApiProto()
