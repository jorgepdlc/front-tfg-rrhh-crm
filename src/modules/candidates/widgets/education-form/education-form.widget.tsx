import React from 'react'
import styles from './education-form.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { EducationId, useEducation } from '@/candidates/api/education'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

export type EducationFormWidgetProps = {
    candidateId: CandidateId
    educationId: EducationId
    isEditing: boolean
}

export function EducationFormWidget(props: EducationFormWidgetProps) {
    const { data, isLoading, isError } = useEducation({
        resourceId: props.educationId,
        candidateId: props.candidateId,
    })

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    return (
        <div data-testid="education-form-widget" className={styles.card}>
            <label>
                Degree:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="text"
                    name="degree"
                    defaultValue={data?.degree}
                    readOnly={!props.isEditing}
                />
            </label>
            <label>
                School:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="text"
                    name="school"
                    defaultValue={data?.school}
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
