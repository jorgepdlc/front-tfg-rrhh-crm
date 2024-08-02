import React from 'react'
import styles from './candidate-table.module.css'
import { CandidateTableWidget } from '@/candidates/widgets/candidate-table'

export function CandidateTableView() {
    return (
        <div data-testid="candidates-table-view" className={styles.container}>
            <CandidateTableWidget />
        </div>
    )
}
