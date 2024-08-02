import type { Pagination } from '@/hookey'

export type Candidate = {
    id: CandidateId
    name: string
    lastname: string
    role: string
    email: string
    phone: string
    candidateStatus: 'EMPLOYED' | 'UNEMPLOYED' | 'DISCARDED'
    isAxpe: boolean
    education: [
        {
            degree: string
            school: string
            endDate: string
            id: number
        }
    ]
    courses: [
        {
            title: string
            institution: string
            endDate: string
            id: number
        }
    ]
    experience: [
        {
            position: string
            company: string
            startedDate: string
            finishedDate: string
            duration: number
            tasks: [
                {
                    name: string
                    description: string
                    id: number
                }
            ]
            id: number
        }
    ]
    links: [
        {
            url: string
            description: string
            id: number
        }
    ]
}

export type CandidateUpdate = {
    id: CandidateId
    name: string
    lastname: string
    role: string
    email: string
    phone: string
    candidateStatus: 'EMPLOYED' | 'UNEMPLOYED' | 'DISCARDED'
    isAxpe: boolean
}

export type CandidateId = number | string

export type CandidateApiResult = Candidate

export type CandidatePaginatedApiResult = {
    data: Candidate[]
    count: number
}

export type CandidateListApiParams = Pagination.UsePaginatedQueryParams<{}>

export type CandidateGetApiParams = {
    resourceId: CandidateId
}

export type CandidateCreateApiParams = {
    newResource: Omit<CandidateUpdate, 'candidateId'>
    // TODO: Add other params here
}

export type CandidateUpdateApiParams = {
    updatedResource: Omit<CandidateUpdate, 'candidateId'>
    resourceId: CandidateId
}

export type CandidateDeleteApiParams = {
    resourceId: CandidateId
    // TODO: Add other params here
}
