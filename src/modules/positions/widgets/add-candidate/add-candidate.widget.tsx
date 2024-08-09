import React from 'react'
import styles from './add-candidate.module.css'

export type AddCandidateWidgetProps = {
    positionId: PositionId
    isEditing: boolean
    onSuccess: () => void
}

export function AddCandidateWidget(props: AddCandidateWidgetProps) {
    return (
        <div
            data-testid="add-candidate-widget"
            className={styles.container}
        ></div>
    )
}
