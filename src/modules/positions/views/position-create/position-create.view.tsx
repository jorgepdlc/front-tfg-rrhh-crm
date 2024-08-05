import React from 'react'
import styles from './position-create.module.css'
import { PositionCreateFormWidget } from '@/positions/widgets/position-create-form'

type PositionCreateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function PositionCreateView(props: PositionCreateViewProps) {
    return (
        <div data-testid="position-create-view" className={styles.container}>
            <PositionCreateFormWidget />
        </div>
    )
}
