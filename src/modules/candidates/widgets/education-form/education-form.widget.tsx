import React from 'react'
import styles from './education-form.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import {
    educationApi,
    EducationId,
    useEducations,
} from '@/candidates/api/education'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { useRouter } from 'next/navigation'

export type EducationFormWidgetProps = {
    candidateId: CandidateId
    isEditing: boolean
}

export function EducationFormWidget(props: EducationFormWidgetProps) {
    const router = useRouter()
    const { data, isLoading, isError } = useEducations({
        candidateId: props.candidateId,
        size: 10,
    })

    const handleDeleteEducation = async (educationId: EducationId) => {
        const success = await educationApi.delete({
            resourceId: educationId,
            candidateId: props.candidateId,
        })

        if (success) {
            router.refresh()
        }
    }

    const submit = async (
        event: React.FormEvent<HTMLFormElement>,
        educationId: EducationId
    ) => {
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
            resourceId: educationId,
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
            {data.data && data.data.length > 0 ? (
                data.data.map((edu) => (
                    <div key={edu.id} className="pl-4">
                        <div className="flex items-center">
                            <h3 className="mr-4 mt-2">
                                &gt; {edu.degree} - {edu.endDate.slice(0, 4)}
                            </h3>
                            {props.isEditing && (
                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={() =>
                                        handleDeleteEducation(edu.id)
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
                            id="educationForm"
                            onSubmit={(event) => submit(event, edu.id)}
                        >
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
                                        defaultValue={edu.degree}
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
                                        defaultValue={edu.school}
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
                                        defaultValue={edu.endDate.slice(0, 10)}
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
