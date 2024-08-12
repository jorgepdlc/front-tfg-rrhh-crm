import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    CvApiResult,
    CvCreateApiParams,
    CvDeleteApiParams,
    CvGetApiParams,
    CvId,
} from './cv.types'
import { CandidateId } from '../candidate'

export const cvApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/candidates`

    type UrlParams = { resourceId?: CvId; candidateId: CandidateId }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        return `${endpointUrl}/${urlParams.candidateId}/cv${resourceIdParam}?${queryParamString}`
    }

    return {
        async get(
            this: ApiContext,
            { candidateId, ...otherQueryParams }: CvGetApiParams
        ): Promise<CvApiResult> {
            const urlParams: UrlParams = { candidateId }
            const queryParams = {
                ...otherQueryParams,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Getting Cv with candidateId: ${candidateId} on url: ${url}`
            )

            const response = await this.client.get(url)

            return response.data as CvApiResult
        },
        async delete(
            this: ApiContext,
            { candidateId, ...queryParams }: CvDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { candidateId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Cv with candidateId:`,
                candidateId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, candidateId, ...queryParams }: CvCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { candidateId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Cv resource:`,
                newResource,
                `on url: ${url}`
            )
            const response = await this.client.post(url, newResource)

            return response.status >= 200 && response.status < 300
        },
        ...defaultApiContext,
    }
}

export const cvApi = cvApiProto()
