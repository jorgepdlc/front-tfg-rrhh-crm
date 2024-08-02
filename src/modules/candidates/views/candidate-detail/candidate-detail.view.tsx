import React from 'react'
import styles from './candidate-detail.module.css'
import { CandidateDetailFormWidget } from '@/candidates/widgets/candidate-detail-form'
import { CandidateId } from '@/candidates/api/candidate'

type CandidateDetailViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { candidateId: CandidateId }
}

export function CandidateDetailView(props: CandidateDetailViewProps) {
    return (
        <div data-testid="candidate-detail-view" className={styles.container}>
            <CandidateDetailFormWidget candidateId={props.params.candidateId} />
        </div>
    )
}
