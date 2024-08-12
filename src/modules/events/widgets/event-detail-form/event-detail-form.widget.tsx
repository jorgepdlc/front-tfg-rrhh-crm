import React, { useState } from 'react'
import styles from './event-detail-form.module.css'
import { Textarea } from '@/common/components/ui/textarea'
import { eventsApi, EventsId, useEvents } from '@/events/api/events'
import { useRouter } from 'next/navigation'
import { IsError } from '@/common/components/ui/is-error'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { AddParticipantWidget } from '../add-participant'

export type EventDetailFormWidgetProps = {
    eventId: EventsId
}

export function EventDetailFormWidget(props: EventDetailFormWidgetProps) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    const { data, isLoading, isError, refetch } = useEvents({
        resourceId: props.eventId,
    })

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const title = (
            event.currentTarget.elements.namedItem('title') as HTMLInputElement
        ).value
        const startDate = (
            event.currentTarget.elements.namedItem(
                'startDate'
            ) as HTMLInputElement
        ).value
        const endDate = (
            event.currentTarget.elements.namedItem(
                'endDate'
            ) as HTMLInputElement
        ).value
        const type = (
            event.currentTarget.elements.namedItem('type') as HTMLSelectElement
        ).value as 'INTERVIEW' | 'MEETING' | 'OTHER'
        const description = (
            event.currentTarget.elements.namedItem(
                'description'
            ) as HTMLTextAreaElement
        ).value
        const link = (
            event.currentTarget.elements.namedItem('link') as HTMLInputElement
        ).value

        const success = await eventsApi.update({
            updatedResource: {
                title: title,
                startDate: startDate,
                endDate: endDate,
                type: type,
                description: description,
                link: link,
            },
            resourceId: props.eventId,
        })

        if (success) {
            setIsEditing(false)
            try {
                await refetch()
            } catch (error) {
                console.error('Error updating event', error)
            }
        }
    }

    const handleDeleteButton = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this event?'
        )
        if (!confirmed) {
            return
        }

        const success = await eventsApi.delete({
            resourceId: props.eventId,
        })

        if (success) {
            router.push('/events')
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    return (
        <div
            data-testid="event-detail-form-widget"
            className={styles.container}
        >
            <div className={styles.options}>
                <div className={styles.title}>
                    <p>Manage all events &gt; Event</p>
                    <div className="flex items-center mt-2">
                        <h3>{data.title}</h3>
                    </div>
                </div>
                <div className={styles.optionsRight}>
                    <span>
                        {isEditing ? (
                            <button
                                type="submit"
                                className={styles.button}
                                form="eventUpdateForm"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6 mr-2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                                    />
                                </svg>
                                Save
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={styles.deleteButton}
                                onClick={handleDeleteButton}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6 mr-2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                                Delete
                            </button>
                        )}
                    </span>
                    <span>
                        <button
                            type="button"
                            className={`${
                                isEditing
                                    ? styles.buttonDisabled
                                    : styles.button
                            }`}
                            disabled={isEditing}
                            onClick={() => setIsEditing(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                            Edit
                        </button>
                    </span>
                </div>
            </div>
            <div className={styles.formInfo}>
                <div className={styles.field}>
                    <h1>Position Information</h1>
                    <form onSubmit={submit} id="eventUpdateForm">
                        <div className={styles.gridFormDiv}>
                            <div className="lg:col-span-2">
                                <label id="title">
                                    Title: *
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="title"
                                        id="title"
                                        defaultValue={data.title}
                                        readOnly={!isEditing}
                                        required
                                        maxLength={100}
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="type">
                                    Type of event: *
                                    <select
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        name="type"
                                        defaultValue={data.type}
                                        disabled={!isEditing}
                                        required
                                    >
                                        <option value="INTERVIEW">
                                            INTERVIEW
                                        </option>
                                        <option value="MEETING">MEETING</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Start Date: *
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="datetime-local"
                                        name="startDate"
                                        defaultValue={data.startDate}
                                        readOnly={!isEditing}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    End Date: *
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="datetime-local"
                                        name="endDate"
                                        defaultValue={data.endDate}
                                        readOnly={!isEditing}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Link:
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : `${styles.input} cursor-pointer`
                                        }`}
                                        type="text"
                                        name="link"
                                        defaultValue={data.link}
                                        readOnly={!isEditing}
                                        onClick={() => {
                                            if (!isEditing) {
                                                window.open(data.link, '_blank')
                                            }
                                        }}
                                        maxLength={350}
                                    />
                                </label>
                            </div>
                            <div className="lg:col-span-3 md:col-span-2">
                                <label>
                                    Description:
                                    <Textarea
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        name="description"
                                        defaultValue={data.description}
                                        readOnly={!isEditing}
                                        maxLength={500}
                                    />
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styles.field}>
                    <AddParticipantWidget
                        eventId={props.eventId}
                        isEditing={isEditing}
                    />
                </div>
            </div>
        </div>
    )
}
