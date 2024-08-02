import React from 'react'
import styles from './position-table.module.css'
import { PositionTableWidget } from '@/positions/widgets/position-table'

type PositionTableViewProps = {}

export function PositionTableView(props: PositionTableViewProps) {
    return (
        <div data-testid="position-table-view" className={styles.container}>
            <PositionTableWidget />
        </div>
    )
}
