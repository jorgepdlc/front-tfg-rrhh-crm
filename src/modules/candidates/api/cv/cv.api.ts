import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    CvCreateApiParams,
    CvDeleteApiParams,
    CvGetApiParams,
} from './cv.types'
import { CandidateId } from '../candidate'

export const cvApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/candidates`

    type UrlParams = { candidateId: CandidateId }
    const endpoint = (urlParams: UrlParams) => {
        return `${endpointUrl}/${urlParams.candidateId}/cv`
    }

    return {
        async get(
            this: ApiContext,
            { candidateId }: CvGetApiParams
        ): Promise<Blob> {
            const urlParams: UrlParams = { candidateId }

            const url = endpoint(urlParams)
            console.debug(
                `Getting Cv with candidateId: ${candidateId} on url: ${url}`
            )

            const response = await this.client.get(
                `${
                    process.env.NEXT_PUBLIC_API_ENDPOINT || ''
                }/candidates/${candidateId}/cv`,
                {
                    responseType: 'blob',
                }
            )

            return response.data as Blob
        },
        async delete(
            this: ApiContext,
            { candidateId }: CvDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { candidateId }
            const url = endpoint(urlParams)
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
            { newResource, candidateId }: CvCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { candidateId }
            const url = endpoint(urlParams)
            console.debug(
                `Creating Cv resource:`,
                newResource,
                `on url: ${url}`
            )
            const formData = new FormData()
            formData.append('file', newResource.file)

            const response = await this.client.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            return response.status >= 200 && response.status < 300
        },
        ...defaultApiContext,
    }
}

export const cvApi = cvApiProto()
