import { CandidateId } from '../candidate'

export type Cv = {
    id: CvId
    file: File
}

export type CvId = string | number

export type CvApiResult = Omit<Cv, 'id'>

export type CvGetApiParams = {
    candidateId: CandidateId
}

export type CvCreateApiParams = {
    newResource: Omit<Cv, 'id'>
    candidateId: CandidateId
}

export type CvDeleteApiParams = {
    candidateId: CandidateId
}
