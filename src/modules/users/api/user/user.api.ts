import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    UserApiResult,
    UserCreateApiParams,
    UserDeleteApiParams,
    UserGetApiParams,
    UserId,
    UserListApiParams,
    UserPaginatedApiResult,
    UserPatchApiParams,
    UserUpdateApiParams,
} from './user.types'

export const userApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/users`

    type UrlParams = { resourceId?: UserId }
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
            { page, size, ...otherQueryParams }: UserListApiParams
        ): Promise<UserPaginatedApiResult> {
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
                `Listing User with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as UserPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, ...queryParams }: UserDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting User with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, ...queryParams }: UserCreateApiParams
        ): Promise<UserId> {
            const urlParams: UrlParams = {}
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating User resource:`,
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
                return resourceId as UserId
            }

            console.warn(new Error('No location header received'))
            return '' as UserId
        },
        async update(
            this: ApiContext,
            { updatedResource, resourceId, ...queryParams }: UserUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `updating User resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async patch(
            this: ApiContext,
            { updatedResource, resourceId, ...queryParams }: UserPatchApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `updating User resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.patch(url, updatedResource)

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, ...queryParams }: UserGetApiParams
        ): Promise<UserApiResult> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(`Getting User with id:`, resourceId, `on url: ${url}`)

            const response = await this.client.get(url)

            return response.data as UserApiResult
        },
        ...defaultApiContext,
    }
}

export const userApi = userApiProto()
