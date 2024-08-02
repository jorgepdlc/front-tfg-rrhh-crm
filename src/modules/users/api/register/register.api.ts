import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    RegisterApiResult,
    RegisterCreateApiParams,
    RegisterDeleteApiParams,
    RegisterGetApiParams,
    RegisterId,
    RegisterListApiParams,
    RegisterPaginatedApiResult,
    RegisterUpdateApiParams,
} from './register.types'

export const registerApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/register`

    type UrlParams = { resourceId?: RegisterId }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        // TODO: Customize the endpoint url generation here
        return `${endpointUrl}${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            { page, size, ...otherQueryParams }: RegisterListApiParams
        ): Promise<RegisterPaginatedApiResult> {
            const urlParams: UrlParams = {}
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
                `Listing Register with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as RegisterPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, ...queryParams }: RegisterDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Register with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, ...queryParams }: RegisterCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {}
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Register resource:`,
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
                // resourceId,
                ...queryParams
            }: RegisterUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                // resourceId
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `updating Register resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, ...queryParams }: RegisterGetApiParams
        ): Promise<RegisterApiResult> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Getting Register with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as RegisterApiResult
        },
        ...defaultApiContext,
    }
}

export const registerApi = registerApiProto()
