import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    RequirementCreateApiParams,
    RequirementDeleteApiParams,
    RequirementId,
    RequirementListApiParams,
    RequirementPaginatedApiResult,
} from './requirement.types'
import { PositionId } from '../position'

export const requirementApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/positions`

    type UrlParams = {
        resourceId?: RequirementId
        positionId: PositionId
    }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        return `${endpointUrl}/${urlParams.positionId}/requirements${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            {
                page,
                size,
                positionId,
                ...otherQueryParams
            }: RequirementListApiParams
        ): Promise<RequirementPaginatedApiResult> {
            const urlParams: UrlParams = { positionId }
            const queryParams = {
                page: `${page}`,
                size: `${size}`,
                // limit: `${size}`,
                // offset: `${Math.max((page - 1) * size, 0)}`,
                ...otherQueryParams,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Listing Requirement with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            return response.data as RequirementPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            {
                resourceId,
                positionId,
                ...queryParams
            }: RequirementDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId, positionId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Requirement with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { skillId, positionId, ...queryParams }: RequirementCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { positionId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Requirement resource:`,
                skillId,
                `on url: ${url}`
            )
            const response = await this.client.post(url, skillId)

            return response.status >= 200 && response.status < 300
        },
        ...defaultApiContext,
    }
}

export const requirementApi = requirementApiProto()
