import type { Pagination } from '@/hookey'
import { CandidateId } from '../candidate'

export type Links = {
    linksId: LinksId
    url: string
    description: string
}

export type LinksId = string | number

export type LinksApiResult = Links

export type LinksPaginatedApiResult = {
    results: Links[]
    count: number
}

export type LinksListApiParams = Pagination.UsePaginatedQueryParams<{
    candidateId: CandidateId
}>

export type LinksGetApiParams = {
    resourceId: LinksId
    candidateId: CandidateId
}

export type LinksCreateApiParams = {
    newResource: Omit<Links, 'linksId'>
    candidateId: CandidateId
}

export type LinksUpdateApiParams = {
    updatedResource: Omit<Links, 'linksId'>
    resourceId: LinksId
    candidateId: CandidateId
}

export type LinksDeleteApiParams = {
    resourceId: LinksId
    candidateId: CandidateId
}
