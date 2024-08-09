import React from 'react'
import styles from './task-form.module.css'
import { ExperienceId } from '@/candidates/api/experience'
import { CandidateId } from '@/candidates/api/candidate'
import { tasksApi, TasksId, useTaskss } from '@/candidates/api/tasks'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { Textarea } from '@/common/components/ui/textarea'
import { useRouter } from 'next/navigation'

export type TaskFormWidgetProps = {
    candidateId: CandidateId
    experienceId: ExperienceId
    isEditing: boolean
}

export function TaskFormWidget(props: TaskFormWidgetProps) {
    const router = useRouter()
    const { data, isLoading, isError } = useTaskss({
        candidateId: props.candidateId,
        experienceId: props.experienceId,
        size: 10,
    })

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
            router.push(`/candidates/${props.candidateId}`)
        }
    }

    const submit = async (
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
            alert('Task updated')
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
        <div data-testid="task-form-widget" className={styles.container}>
            {data.data && data.data.length > 0 ? (
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
                            id="taskForm"
                            onSubmit={(event) => submit(event, task.id)}
                        >
                            <div className={styles.card}>
                                <label>
                                    Name:
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
    )
}
