import React from 'react'
import styles from './task-form.module.css'
import { ExperienceId } from '@/candidates/api/experience'
import { CandidateId } from '@/candidates/api/candidate'
import { TasksId, useTasks } from '@/candidates/api/tasks'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { Textarea } from '@/common/components/ui/textarea'

export type TaskFormWidgetProps = {
    candidateId: CandidateId
    experienceId: ExperienceId
    taskId: TasksId
    isEditing: boolean
}

export function TaskFormWidget(props: TaskFormWidgetProps) {
    const { data, isLoading, isError } = useTasks({
        resourceId: props.taskId,
        candidateId: props.candidateId,
        experienceId: props.experienceId,
    })

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }
    return (
        <div data-testid="task-form-widget" className={styles.card}>
            <label>
                Name:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="text"
                    name="name"
                    defaultValue={data.name}
                    readOnly={!props.isEditing}
                />
            </label>
            <label className="col-span-2">
                Description:
                <Textarea
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    name="description"
                    defaultValue={data.description}
                    readOnly={!props.isEditing}
                />
            </label>
        </div>
    )
}
