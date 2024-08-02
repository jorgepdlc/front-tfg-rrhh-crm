import React from 'react'
import styles from './events-main.module.css'
import { EventCalendarWidget } from '@/events/widgets/event-calendar'

type EventsMainViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function EventsMainView(props: EventsMainViewProps) {
    return (
        <div data-testid="events-main-view" className={styles.container}>
            <EventCalendarWidget />
        </div>
    )
}
