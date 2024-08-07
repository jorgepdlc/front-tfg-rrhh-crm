import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    SkillApiResult,
    SkillGetApiParams,
    SkillId,
    SkillListApiParams,
    SkillPaginatedApiResult,
} from './skill.types'

export const skillApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/skills`

    type UrlParams = { resourceId?: SkillId }
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
            { page, size, ...otherQueryParams }: SkillListApiParams
        ): Promise<SkillPaginatedApiResult> {
            const urlParams: UrlParams = {}
            const queryParams = {
                page: `${page}`,
                size: `${size}`,
                // limit: `${size}`,
                // offset: `${Math.max((page - 1) * size, 0)}`,
                ...otherQueryParams,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Listing Skill with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as SkillPaginatedApiResult
        },
        async get(
            this: ApiContext,
            { resourceId, ...queryParams }: SkillGetApiParams
        ): Promise<SkillApiResult> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Getting Skill with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as SkillApiResult
        },
        ...defaultApiContext,
    }
}

export const skillApi = skillApiProto()
