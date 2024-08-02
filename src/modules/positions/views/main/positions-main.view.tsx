import React from 'react'
import styles from './positions-main.module.css'
import { PositionTableView } from '../position-table'

type PositionsMainViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function PositionsMainView(props: PositionsMainViewProps) {
    return (
        <div data-testid="positions-main-view" className={styles.container}>
            <PositionTableView />
        </div>
    )
}
