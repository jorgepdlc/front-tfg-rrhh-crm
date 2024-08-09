import React, { useState } from 'react'
import styles from './add-experience.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { useRouter } from 'next/navigation'
import { experienceApi } from '@/candidates/api/experience'

export type AddExperienceWidgetProps = {
    candidateId: CandidateId
    isEditing: boolean
}

export function AddExperienceWidget(props: AddExperienceWidgetProps) {
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

        const position = (
            event.currentTarget.elements.namedItem(
                'position'
            ) as HTMLInputElement
        ).value
        const company = (
            event.currentTarget.elements.namedItem(
                'company'
            ) as HTMLInputElement
        ).value
        const startedDate = (
            event.currentTarget.elements.namedItem(
                'startedDate'
            ) as HTMLInputElement
        ).value
        const finishedDate = (
            event.currentTarget.elements.namedItem(
                'finishedDate'
            ) as HTMLInputElement
        ).value

        const success = await experienceApi.create({
            newResource: {
                position: position,
                company: company,
                startedDate: startedDate + 'T00:00:00.000Z',
                finishedDate: finishedDate + 'T00:00:00.000Z',
            },
            candidateId: props.candidateId,
        })

        if (success) {
            router.refresh()
        }
        handleCloseModal()
    }

    return (
        <div data-testid="add-experience-widget" className={styles.container}>
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
                            <form onSubmit={submit} id="createExperience">
                                <div className={styles.gridFormDiv}>
                                    <div>
                                        <label id="position">
                                            Position: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="position"
                                                id="position"
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="company">
                                            Company: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="company"
                                                id="company"
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="startedDate">
                                            Start date: *
                                            <input
                                                className={styles.activeInput}
                                                type="date"
                                                name="startedDate"
                                                id="startedDate"
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="finishedDate">
                                            End date: *
                                            <input
                                                className={styles.activeInput}
                                                type="date"
                                                name="finishedDate"
                                                id="finishedDate"
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
                                    form="createExperience"
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
