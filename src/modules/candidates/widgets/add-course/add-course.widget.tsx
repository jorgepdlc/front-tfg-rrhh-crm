import React, { useState } from 'react'
import styles from './add-course.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { useRouter } from 'next/navigation'
import { coursesApi } from '@/candidates/api/courses'

export type AddCourseWidgetProps = {
    candidateId: CandidateId
    isEditing: boolean
}

export function AddCourseWidget(props: AddCourseWidgetProps) {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
        document.body.classList.add('overflow-hidden')
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
        document.body.classList.remove('overflow-hidden')
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const title = (
            event.currentTarget.elements.namedItem('title') as HTMLInputElement
        ).value
        const institution = (
            event.currentTarget.elements.namedItem(
                'institution'
            ) as HTMLInputElement
        ).value
        const endDate = (
            event.currentTarget.elements.namedItem(
                'endDate'
            ) as HTMLInputElement
        ).value

        const success = await coursesApi.create({
            newResource: {
                title: title,
                institution: institution,
                endDate: endDate + 'T00:00:00.000Z',
            },
            candidateId: props.candidateId,
        })

        if (success) {
            router.refresh()
        }
        handleCloseModal()
    }
    return (
        <div data-testid="add-course-widget" className={styles.container}>
            <button
                type="button"
                className={styles.button}
                onClick={handleOpenModal}
            >
                Add
            </button>
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                    <div className={styles.modal}>
                        <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full mx-4">
                            <form onSubmit={submit} id="createCourse">
                                <div className={styles.gridFormDiv}>
                                    <div>
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
                                        <label id="institution">
                                            Institution: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="institution"
                                                id="institution"
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="endDate">
                                            End date: *
                                            <input
                                                className={styles.activeInput}
                                                type="date"
                                                name="endDate"
                                                id="endDate"
                                                required
                                            />
                                        </label>
                                    </div>
                                </div>
                            </form>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    form="createCourse"
                                    className={styles.button}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
