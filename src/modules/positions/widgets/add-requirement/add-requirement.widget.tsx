import React from 'react'
import styles from './add-requirement.module.css'
import { PositionId } from '@/positions/api/position'

export type AddRequirementWidgetProps = {
    positionId: PositionId
    isEditing: boolean
    onSuccess: () => void
}

export function AddRequirementWidget(props: AddRequirementWidgetProps) {
    return (
        <div
            data-testid="add-requirement-widget"
            className={styles.container}
        ></div>
    )
}
