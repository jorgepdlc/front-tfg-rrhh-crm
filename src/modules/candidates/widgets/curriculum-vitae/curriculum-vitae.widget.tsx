import React from 'react'
import styles from './curriculum-vitae.module.css'

export type CurriculumVitaeWidgetProps = {
    isEditing: boolean
}

export function CurriculumVitaeWidget(props: CurriculumVitaeWidgetProps) {
    return (
        <div data-testid="curriculum-vitae-widget" className={styles.container}>
            <button
                className={`${
                    props.isEditing ? styles.buttonDisabled : styles.button
                }`}
                type="button"
                disabled={props.isEditing}
            >
                Download Candidate CV
            </button>
        </div>
    )
}
