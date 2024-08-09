import React, { useState } from 'react'
import styles from './add-education.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { educationApi } from '@/candidates/api/education'
import { useRouter } from 'next/navigation'

export type AddEducationWidgetProps = {
    candidateId: CandidateId
    isEditing: boolean
}

export function AddEducationWidget(props: AddEducationWidgetProps) {
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

        const degree = (
            event.currentTarget.elements.namedItem('degree') as HTMLInputElement
        ).value
        const school = (
            event.currentTarget.elements.namedItem('school') as HTMLInputElement
        ).value
        const endDate = (
            event.currentTarget.elements.namedItem(
                'endDate'
            ) as HTMLInputElement
        ).value

        const success = await educationApi.create({
            newResource: {
                degree: degree,
                school: school,
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
        <div data-testid="add-education-widget" className={styles.container}>
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
                            <form onSubmit={submit} id="createEducation">
                                <div className={styles.gridFormDiv}>
                                    <div>
                                        <label id="degree">
                                            Degree: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="degree"
                                                id="degree"
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="school">
                                            School: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="school"
                                                id="school"
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
                                    form="createEducation"
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
