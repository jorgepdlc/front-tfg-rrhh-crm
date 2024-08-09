import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    ParticipantCreateApiParams,
    ParticipantDeleteApiParams,
    ParticipantId,
    ParticipantListApiParams,
    ParticipantPaginatedApiResult,
} from './participant.types'
import { EventsId } from '../events'

export const participantApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/events`

    type UrlParams = { resourceId?: ParticipantId; eventId: EventsId }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        // TODO: Customize the endpoint url generation here
        return `${endpointUrl}/${urlParams.eventId}/participants${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            {
                page,
                size,
                eventId,
                ...otherQueryParams
            }: ParticipantListApiParams
        ): Promise<ParticipantPaginatedApiResult> {
            const urlParams: UrlParams = { eventId }
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
                `Listing Participant with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            return response.data as ParticipantPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, eventId, ...queryParams }: ParticipantDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId, eventId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Participant with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { eventId, candidateId, ...queryParams }: ParticipantCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { eventId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Participant resource:`,
                candidateId,
                `on url: ${url}`
            )
            const response = await this.client.post(url, candidateId)

            return response.status >= 200 && response.status < 300
        },
        ...defaultApiContext,
    }
}

export const participantApi = participantApiProto()
