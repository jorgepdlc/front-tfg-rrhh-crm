import React from 'react'
import styles from './candidates-main.module.css'
import { CandidateTableView } from '../candidate-table'

export function CandidatesMainView() {
    return (
        <div data-testid="candidates-main-view" className={styles.container}>
            <CandidateTableView />
            {/*<CandidateDetailView />*/}
        </div>
    )
}
