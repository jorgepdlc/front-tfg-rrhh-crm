import React from 'react'
import styles from './position-detail.module.css'
import { PositionDetailWidget } from '@/positions/widgets/position-detail'
import { PositionId } from '@/positions/api/position'

type PositionDetailViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { positionId: PositionId }
}

export function PositionDetailView(props: PositionDetailViewProps) {
    return (
        <div data-testid="candidate-detail-view" className={styles.container}>
            <PositionDetailWidget positionId={props.params.positionId} />
        </div>
    )
}
