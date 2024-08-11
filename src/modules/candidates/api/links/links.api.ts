import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    LinksApiResult,
    LinksCreateApiParams,
    LinksDeleteApiParams,
    LinksGetApiParams,
    LinksId,
    LinksListApiParams,
    LinksPaginatedApiResult,
    LinksUpdateApiParams,
} from './links.types'
import { CandidateId } from '../candidate'

export const linksApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/candidates`

    type UrlParams = { resourceId?: LinksId; candidateId: CandidateId }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        // TODO: Customize the endpoint url generation here
        return `${endpointUrl}/${urlParams.candidateId}/links${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            { page, size, candidateId, ...otherQueryParams }: LinksListApiParams
        ): Promise<LinksPaginatedApiResult> {
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
                `Listing Links with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as LinksPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, candidateId, ...queryParams }: LinksDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId, candidateId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Links with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, candidateId, ...queryParams }: LinksCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { candidateId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Links resource:`,
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
            }: LinksUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `updating Links resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, candidateId, ...queryParams }: LinksGetApiParams
        ): Promise<LinksApiResult> {
            const urlParams: UrlParams = {
                resourceId,
                candidateId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Getting Links with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as LinksApiResult
        },
        ...defaultApiContext,
    }
}

export const linksApi = linksApiProto()
