import { useQuery } from '@tanstack/react-query'
import { cvApi } from './cv.api'
import { CvGetApiParams } from './cv.types'

export const useCv = (params: CvGetApiParams) => {
    return useQuery(
        ['cv-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => cvApi.get(params)
    )
}
