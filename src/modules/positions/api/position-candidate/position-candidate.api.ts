import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    PositionCandidateCreateApiParams,
    PositionCandidateDeleteApiParams,
    PositionCandidateId,
    PositionCandidateListApiParams,
    PositionCandidatePaginatedApiResult,
} from './position-candidate.types'
import { PositionId } from '../position/position.types'

export const positionCandidateApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/positions`

    type UrlParams = {
        resourceId?: PositionCandidateId
        positionId: PositionId
    }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        return `${endpointUrl}/${urlParams.positionId}/candidates${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            {
                page,
                size,
                positionId,
                ...otherQueryParams
            }: PositionCandidateListApiParams
        ): Promise<PositionCandidatePaginatedApiResult> {
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
                `Listing PositionCandidate with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as PositionCandidatePaginatedApiResult
        },
        async delete(
            this: ApiContext,
            {
                resourceId,
                positionId,
                ...queryParams
            }: PositionCandidateDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId, positionId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting PositionCandidate with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            {
                positionId,
                candidateId,
                ...queryParams
            }: PositionCandidateCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { positionId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating PositionCandidate resource:`,
                candidateId,
                `on url: ${url}`
            )
            const response = await this.client.post(url, candidateId)

            return response.status >= 200 && response.status < 300
        },
        ...defaultApiContext,
    }
}

export const positionCandidateApi = positionCandidateApiProto()
