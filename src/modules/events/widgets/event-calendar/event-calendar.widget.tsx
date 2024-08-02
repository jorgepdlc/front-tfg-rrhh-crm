import React from 'react'
import styles from './event-calendar.module.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

export type EventCalendarWidgetProps = {}

export function EventCalendarWidget(props: EventCalendarWidgetProps) {
    const events = [
        {
            id: '1',
            start: '2024-07-24T12:30:00',
            end: '2024-07-24T17:00:00',
            title: 'Event 1',
        },
        {
            id: '2',
            start: '2024-07-25T11:00:00',
            end: '2024-07-25T18:00:00',
            title: 'Event 2',
        },
        {
            id: '3',
            start: '2024-07-25T13:00:00',
            end: '2024-07-25T14:00:00',
            title: 'Event 3',
        },
        {
            id: '4',
            start: '2024-07-25T12:00:00',
            end: '2024-07-25T16:30:00',
            title: 'Event 4',
        },
        {
            id: '5',
            start: '2024-07-25T10:00:00',
            end: '2024-07-25T11:00:00',
            title: 'Event 5',
        },
        {
            id: '6',
            start: '2024-07-25T12:00:00',
            end: '2024-07-25T16:00:00',
            title: 'Event 6',
        },
    ]

    return (
        <div data-testid="event-calendar-widget" className={styles.container}>
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                ]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: 'today prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,list',
                }}
                dayMaxEventRows={2}
                dayMaxEvents={2}
                weekends={false}
                navLinks={true}
                navLinkDayClick={'day'}
                navLinkWeekClick={'week'}
                height={'85vh'}
                events={events}
            />
        </div>
    )
}
