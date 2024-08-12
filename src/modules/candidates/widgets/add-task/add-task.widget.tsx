import { useState } from 'react'
import styles from './add-task.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { ExperienceId } from '@/candidates/api/experience'
import { tasksApi, TasksId, useTaskss } from '@/candidates/api/tasks'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { Textarea } from '@/common/components/ui/textarea'

export type AddTaskWidgetProps = {
    candidateId: CandidateId
    experienceId: ExperienceId
    isEditing: boolean
    onSuccess: () => void
}

export function AddTaskWidget(props: AddTaskWidgetProps) {
    const { data, isLoading, isError, refetch } = useTaskss({
        candidateId: props.candidateId,
        experienceId: props.experienceId,
        size: 10,
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModified, setIsModified] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
        document.body.classList.add('overflow-hidden')
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        document.body.classList.remove('overflow-hidden')
    }

    const handleDeleteTask = async (
        taskId: TasksId,
        experienceId: ExperienceId
    ) => {
        const success = await tasksApi.delete({
            resourceId: taskId,
            candidateId: props.candidateId,
            experienceId: experienceId,
        })

        if (success) {
            await refetch()
        }
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
            try {
                await refetch()
                props.onSuccess()
            } catch (error) {
                console.error('Error creating course', error)
            }
        }
        handleCloseModal()
    }

    const submitUpdate = async (
        event: React.FormEvent<HTMLFormElement>,
        taskId: TasksId
    ) => {
        event.preventDefault()

        const name = (
            event.currentTarget.elements.namedItem(
                'taskName'
            ) as HTMLInputElement
        ).value
        const description = (
            event.currentTarget.elements.namedItem(
                'taskDescription'
            ) as HTMLInputElement
        ).value

        const success = await tasksApi.update({
            updatedResource: {
                name: name,
                description: description,
            },
            resourceId: taskId,
            candidateId: props.candidateId,
            experienceId: props.experienceId,
        })

        if (success) {
            await refetch()
            setIsModified(false)
        } else {
            alert('Failed to update task')
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    return (
        <div data-testid="add-task-widget" className={styles.container}>
            <div className="flex items-center">
                <h1 className="mr-4 mt-3">Tasks</h1>
                {props.isEditing &&
                    (data?.data?.length <= 5 || data.data == null) && (
                        <button
                            type="button"
                            className={styles.button}
                            onClick={handleOpenModal}
                        >
                            Add
                        </button>
                    )}
                {isModified && (
                    <button
                        type="submit"
                        form="tasksForm"
                        className={`ml-2 ${styles.button}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-4 mr-2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                        Update
                    </button>
                )}
            </div>
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
                                                maxLength={100}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="description">
                                            Description:
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="description"
                                                id="description"
                                                maxLength={500}
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
            <div className="mt-4">
                {data?.data && data?.data?.length > 0 ? (
                    data.data.map((task) => (
                        <div key={task.id}>
                            <div className="flex items-center">
                                <h3 className="mr-4 mt-2 !text-base !text-amber-600">
                                    &gt;&gt; {task.name}
                                </h3>
                                {props.isEditing && (
                                    <button
                                        type="button"
                                        className={styles.deleteButton}
                                        onClick={() =>
                                            handleDeleteTask(
                                                task.id,
                                                props.experienceId
                                            )
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <form
                                id="tasksForm"
                                onSubmit={(event) =>
                                    submitUpdate(event, task.id)
                                }
                            >
                                <div className={styles.card}>
                                    <label>
                                        Name: *
                                        <input
                                            className={`${
                                                props.isEditing
                                                    ? styles.activeInput
                                                    : styles.input
                                            }`}
                                            type="text"
                                            name="taskName"
                                            defaultValue={task.name}
                                            readOnly={!props.isEditing}
                                            onChange={() => setIsModified(true)}
                                            maxLength={100}
                                            required
                                        />
                                    </label>
                                    <label className="lg:col-span-2">
                                        Description:
                                        <Textarea
                                            className={`${
                                                props.isEditing
                                                    ? styles.activeInput
                                                    : styles.input
                                            }`}
                                            name="taskDescription"
                                            defaultValue={task.description}
                                            readOnly={!props.isEditing}
                                            onChange={() => setIsModified(true)}
                                            maxLength={500}
                                        />
                                    </label>
                                </div>
                            </form>
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}
