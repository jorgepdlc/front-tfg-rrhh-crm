import { useState } from 'react'
import styles from './add-task.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { ExperienceId } from '@/candidates/api/experience'
import { useRouter } from 'next/navigation'
import { tasksApi } from '@/candidates/api/tasks'

export type AddTaskWidgetProps = {
    candidateId: CandidateId
    experienceId: ExperienceId
    isEditing: boolean
}

export function AddTaskWidget(props: AddTaskWidgetProps) {
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

        const name = (
            event.currentTarget.elements.namedItem('name') as HTMLInputElement
        ).value
        const description = (
            event.currentTarget.elements.namedItem(
                'description'
            ) as HTMLInputElement
        ).value

        const success = await tasksApi.create({
            newResource: {
                name: name,
                description: description,
            },
            candidateId: props.candidateId,
            experienceId: props.experienceId,
        })

        if (success) {
            router.refresh()
        }
        handleCloseModal()
    }

    return (
        <div data-testid="add-task-widget" className={styles.container}>
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
                            <form onSubmit={submit} id="createTask">
                                <div className={styles.gridFormDiv}>
                                    <div>
                                        <label id="name">
                                            Name: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="name"
                                                id="name"
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="description">
                                            Description: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="description"
                                                id="description"
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
                                    form="createTask"
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
