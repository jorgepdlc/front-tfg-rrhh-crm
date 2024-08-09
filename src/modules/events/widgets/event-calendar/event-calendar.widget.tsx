import React, { useEffect, useState } from 'react'
import styles from './event-calendar.module.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { useEventss } from '@/events/api/events'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { useRouter } from 'next/navigation'

export type EventCalendarWidgetProps = {}

export function EventCalendarWidget(props: EventCalendarWidgetProps) {
    const router = useRouter()
    const [isMediumScreen, setIsMediumScreen] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)')
        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsMediumScreen(event.matches)
        }
        setIsMediumScreen(mediaQuery.matches)
        mediaQuery.addEventListener('change', handleMediaQueryChange)
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
        }
    }, [])

    const { data, isLoading, isError } = useEventss({ size: 10 })

    const formattedData = data?.data?.map((event) => ({
        id: event.id.toString(),
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        color:
            event.type === 'INTERVIEW'
                ? '#f26a8d'
                : event.type === 'MEETING'
                ? '#06d6a0'
                : '#118ab2',
        backgroundColor:
            event.type === 'INTERVIEW'
                ? '#f26a8d'
                : event.type === 'MEETING'
                ? '#06d6a0'
                : '#118ab2',
    }))

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    return (
        <div data-testid="event-calendar-widget" className={styles.container}>
            <div className={styles.options}>
                <div className={styles.title}>
                    <p>Manage all events</p>
                    <h3>Events</h3>
                </div>
                <div className={styles.optionsRight}>
                    <span>
                        <button
                            type="button"
                            className={styles.createButton}
                            onClick={() => router.push('/events/create')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6 mr-1"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            Create
                        </button>
                    </span>
                </div>
            </div>
            <div className={styles.calendarField}>
                <FullCalendar
                    themeSystem="bootstrap5"
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                    ]}
                    initialView="listMonth"
                    headerToolbar={{
                        start: isMediumScreen ? 'today prev,next' : 'prev,next',
                        center: isMediumScreen ? 'title' : '',
                        right: 'dayGridMonth,listMonth',
                    }}
                    dayMaxEventRows={2}
                    dayMaxEvents={2}
                    weekends={false}
                    navLinks={true}
                    navLinkDayClick={'timeGridDay'}
                    navLinkWeekClick={'week'}
                    nowIndicator={true}
                    height={'auto'}
                    events={formattedData}
                    eventClick={(info) => {
                        router.push(`/events/${info.event.id}`)
                    }}
                />
            </div>
        </div>
    )
}
