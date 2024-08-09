import React from 'react'
import styles from './event-detail.module.css'
import { EventDetailFormWidget } from '@/events/widgets/event-detail-form'
import { EventsId } from '@/events/api/events'

type EventDetailViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { eventId: EventsId }
}

export function EventDetailView(props: EventDetailViewProps) {
    return (
        <div data-testid="event-detail-view" className={styles.container}>
            <EventDetailFormWidget eventId={props.params.eventId} />
        </div>
    )
}
