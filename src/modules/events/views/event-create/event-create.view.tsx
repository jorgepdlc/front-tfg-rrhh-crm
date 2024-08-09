import React from 'react'
import styles from './event-create.module.css'
import { EventCreateFormWidget } from '@/events/widgets/event-create-form'

type EventCreateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function EventCreateView(props: EventCreateViewProps) {
    return (
        <div data-testid="event-create-view" className={styles.container}>
            <EventCreateFormWidget />
        </div>
    )
}
