import React from 'react'
import styles from './experience-form.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { ExperienceId, useExperience } from '@/candidates/api/experience'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

export type ExperienceFormWidgetProps = {
    candidateId: CandidateId
    experienceId: ExperienceId
    isEditing: boolean
}

export function ExperienceFormWidget(props: ExperienceFormWidgetProps) {
    const { data, isLoading, isError } = useExperience({
        resourceId: props.experienceId,
        candidateId: props.candidateId,
    })

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }
    return (
        <div data-testid="experience-form-widget" className={styles.card}>
            <label className="lg:col-span-2">
                Position:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="text"
                    name="position"
                    defaultValue={data?.position}
                    readOnly={!props.isEditing}
                />
            </label>
            <label>
                Company:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="text"
                    name="company"
                    defaultValue={data?.company}
                    readOnly={!props.isEditing}
                />
            </label>
            <label>
                Started Date:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="date"
                    name="startedDate"
                    defaultValue={data?.startedDate.slice(0, 10)}
                    readOnly={!props.isEditing}
                />
            </label>
            <label>
                Finished Date:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="date"
                    name="finishedDate"
                    defaultValue={data?.finishedDate.slice(0, 10)}
                    readOnly={!props.isEditing}
                />
            </label>
            {!props.isEditing && (
                <label>
                    Years Experience:
                    <input
                        className={`${
                            props.isEditing ? styles.activeInput : styles.input
                        }`}
                        type="number"
                        name="duration"
                        defaultValue={data?.duration}
                        readOnly={!props.isEditing}
                    />
                </label>
            )}
        </div>
    )
}
