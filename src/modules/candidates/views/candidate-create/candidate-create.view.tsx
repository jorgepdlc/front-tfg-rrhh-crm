import React from 'react'
import styles from './candidate-create.module.css'
import { CandidateCreateFormWidget } from '@/candidates/widgets/candidate-create-form'

type CandidateCreateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function CandidateCreateView(props: CandidateCreateViewProps) {
    return (
        <div data-testid="candidate-create-view" className={styles.container}>
            <CandidateCreateFormWidget />
        </div>
    )
}
