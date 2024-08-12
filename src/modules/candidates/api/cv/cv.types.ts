import { CandidateId } from '../candidate'

export type Cv = {
    file: File
}

export type CvApiResult = {
    data: Blob
}

export type CvGetApiParams = {
    candidateId: CandidateId
}

export type CvCreateApiParams = {
    newResource: Cv
    candidateId: CandidateId
}

export type CvDeleteApiParams = {
    candidateId: CandidateId
}
