import React from 'react'
import styles from './courses-form.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { CoursesId, useCourses } from '@/candidates/api/courses'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

export type CoursesFormWidgetProps = {
    candidateId: CandidateId
    courseId: CoursesId
    isEditing: boolean
}

export function CoursesFormWidget(props: CoursesFormWidgetProps) {
    const { data, isLoading, isError } = useCourses({
        resourceId: props.courseId,
        candidateId: props.candidateId,
    })

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }
    return (
        <div data-testid="courses-form-widget" className={styles.card}>
            <label>
                Title:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="text"
                    name="title"
                    defaultValue={data?.title}
                    readOnly={!props.isEditing}
                />
            </label>
            <label>
                Institution:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="text"
                    name="institution"
                    defaultValue={data?.institution}
                    readOnly={!props.isEditing}
                />
            </label>
            <label>
                End Date:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="date"
                    name="endDate"
                    defaultValue={data?.endDate.slice(0, 10)}
                    readOnly={!props.isEditing}
                />
            </label>
        </div>
    )
}
