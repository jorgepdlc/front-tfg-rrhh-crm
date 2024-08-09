import React from 'react'
import styles from './event-create-form.module.css'
import { useRouter } from 'next/navigation'
import { eventsApi } from '@/events/api/events'
import { Textarea } from '@/common/components/ui/textarea'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type EventCreateFormWidgetProps = {}

export function EventCreateFormWidget(props: EventCreateFormWidgetProps) {
    const router = useRouter()

    const validateLink = (link: string) => {
        const linkRegex =
            /^(https?:\/\/)?([\w.-]+)(:[0-9]+)?(\/[a-zA-Z0-9/-]*)?(\?[\w=&]*)?$/
        return linkRegex.test(link)
    }

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

        if (!validateLink(link)) {
            toast.error('Invalid link', {
                position: 'bottom-right',
            })
            return
        }

        if (endDate <= startDate) {
            toast.error(
                'La fecha de fin debe ser posterior a la fecha de inicio',
                {
                    position: 'bottom-right',
                }
            )
            return
        }

        const success = await eventsApi.create({
            newResource: {
                title: title,
                startDate: startDate,
                endDate: endDate,
                type: type,
                description: description,
                link: link,
            },
        })

        if (success) {
            router.push(`/events`)
        }
    }

    return (
        <div
            data-testid="event-create-form-widget"
            className={styles.container}
        >
            <div className={styles.formInfo}>
                <div className={styles.field}>
                    <h1>New event information</h1>
                    <form onSubmit={submit} id="eventCreateForm">
                        <div className={styles.gridFormDiv}>
                            <div className="lg:col-span-2">
                                <label id="title">
                                    Title: *
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="title"
                                        id="title"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="type">
                                    Type of event: *
                                    <select
                                        className={styles.activeInput}
                                        name="type"
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
                                        className={styles.activeInput}
                                        type="datetime-local"
                                        name="startDate"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    End Date: *
                                    <input
                                        className={styles.activeInput}
                                        type="datetime-local"
                                        name="endDate"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Link: *
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="link"
                                        required
                                    />
                                </label>
                            </div>
                            <div className="lg:col-span-3 md:col-span-2">
                                <label>
                                    Description:
                                    <Textarea
                                        className={styles.activeInput}
                                        name="description"
                                    />
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={styles.button}
                        form="eventCreateForm"
                    >
                        Submit
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
