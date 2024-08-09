import React from 'react'
import styles from './courses-form.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { coursesApi, CoursesId, useCoursess } from '@/candidates/api/courses'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { useRouter } from 'next/navigation'

export type CoursesFormWidgetProps = {
    candidateId: CandidateId
    isEditing: boolean
}

export function CoursesFormWidget(props: CoursesFormWidgetProps) {
    const router = useRouter()

    const { data, isLoading, isError } = useCoursess({
        candidateId: props.candidateId,
        size: 10,
    })

    const handleDeleteCourse = async (courseId: CoursesId) => {
        const success = await coursesApi.delete({
            resourceId: courseId,
            candidateId: props.candidateId,
        })

        if (success) {
            router.refresh()
        }
    }

    const submit = async (
        event: React.FormEvent<HTMLFormElement>,
        courseId: CoursesId
    ) => {
        event.preventDefault()

        const title = (
            event.currentTarget.elements.namedItem(
                'courseTitle'
            ) as HTMLInputElement
        ).value
        const institution = (
            event.currentTarget.elements.namedItem(
                'courseInstitution'
            ) as HTMLInputElement
        ).value
        const date = (
            event.currentTarget.elements.namedItem(
                'courseEndDate'
            ) as HTMLInputElement
        ).value

        const success = await coursesApi.update({
            updatedResource: {
                title: title,
                institution: institution,
                endDate: date + 'T00:00:00.000Z',
            },
            resourceId: courseId,
            candidateId: props.candidateId,
        })

        if (success) {
            alert('Course updated')
        } else {
            alert('Failed to update course')
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }
    return (
        <div data-testid="courses-form-widget" className={styles.container}>
            {data.data && data.data.length > 0 ? (
                data.data.map((cou) => (
                    <div key={cou.id} className="pl-4">
                        <div className="flex items-center">
                            <h3 className="mr-4 mt-2">
                                &gt; {cou.title} - {cou.endDate.slice(0, 4)}
                            </h3>
                            {props.isEditing && (
                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={() => handleDeleteCourse(cou.id)}
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
                            id="coursesForm"
                            onSubmit={(event) => submit(event, cou.id)}
                        >
                            <div className={styles.card}>
                                <label>
                                    Title:
                                    <input
                                        className={`${
                                            props.isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="courseTitle"
                                        defaultValue={cou.title}
                                        readOnly={!props.isEditing}
                                    />
                                </label>
                                <label>
                                    Institution:
                                    <input
                                        className={`${
                                            props.isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="courseInstitution"
                                        defaultValue={cou.institution}
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
                                        name="courseEndDate"
                                        defaultValue={cou.endDate.slice(0, 10)}
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
