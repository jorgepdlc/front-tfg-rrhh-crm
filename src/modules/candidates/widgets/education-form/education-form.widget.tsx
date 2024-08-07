import React from 'react'
import styles from './education-form.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import {
    educationApi,
    EducationId,
    useEducation,
} from '@/candidates/api/education'
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

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const degree = (
            event.currentTarget.elements.namedItem(
                'educationDegree'
            ) as HTMLInputElement
        ).value
        const school = (
            event.currentTarget.elements.namedItem(
                'educationSchool'
            ) as HTMLInputElement
        ).value
        const date = (
            event.currentTarget.elements.namedItem(
                'educationEndDate'
            ) as HTMLInputElement
        ).value

        const success = await educationApi.update({
            updatedResource: {
                degree: degree,
                school: school,
                endDate: date + 'T00:00:00.000Z',
            },
            resourceId: props.educationId,
            candidateId: props.candidateId,
        })

        if (success) {
            alert('Education updated')
        } else {
            alert('Failed to update education')
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    return (
        <div data-testid="education-form-widget" className={styles.container}>
            <form id="educationForm" onSubmit={submit}>
                <div className={`w-full ${styles.card}`}>
                    <label>
                        Degree:
                        <input
                            className={`${
                                props.isEditing
                                    ? styles.activeInput
                                    : styles.input
                            }`}
                            type="text"
                            name="educationDegree"
                            defaultValue={data?.degree}
                            readOnly={!props.isEditing}
                        />
                    </label>
                    <label>
                        School:
                        <input
                            className={`${
                                props.isEditing
                                    ? styles.activeInput
                                    : styles.input
                            }`}
                            type="text"
                            name="educationSchool"
                            defaultValue={data?.school}
                            readOnly={!props.isEditing}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            className={`${
                                props.isEditing
                                    ? styles.activeInput
                                    : styles.input
                            }`}
                            type="date"
                            name="educationEndDate"
                            defaultValue={data?.endDate.slice(0, 10)}
                            readOnly={!props.isEditing}
                        />
                    </label>
                </div>
            </form>
        </div>
    )
}
