import React from 'react'
import styles from './experience-form.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import {
    experienceApi,
    ExperienceId,
    useExperiences,
} from '@/candidates/api/experience'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { TaskFormWidget } from '../task-form'
import { useRouter } from 'next/navigation'
import { AddTaskWidget } from '../add-task'

export type ExperienceFormWidgetProps = {
    candidateId: CandidateId
    isEditing: boolean
}

export function ExperienceFormWidget(props: ExperienceFormWidgetProps) {
    const router = useRouter()
    const { data, isLoading, isError } = useExperiences({
        candidateId: props.candidateId,
        size: 10,
    })

    const handleDeleteExperience = async (experienceId: ExperienceId) => {
        const success = await experienceApi.delete({
            resourceId: experienceId,
            candidateId: props.candidateId,
        })

        if (success) {
            router.refresh()
        }
    }

    const submit = async (
        event: React.FormEvent<HTMLFormElement>,
        experienceId: ExperienceId
    ) => {
        event.preventDefault()

        const position = (
            event.currentTarget.elements.namedItem(
                'expPosition'
            ) as HTMLInputElement
        ).value
        const company = (
            event.currentTarget.elements.namedItem(
                'expCompany'
            ) as HTMLInputElement
        ).value
        const startedDate = (
            event.currentTarget.elements.namedItem(
                'expStartDate'
            ) as HTMLInputElement
        ).value
        const finishedDate = (
            event.currentTarget.elements.namedItem(
                'expEndDate'
            ) as HTMLInputElement
        ).value

        const success = await experienceApi.update({
            updatedResource: {
                position: position,
                company: company,
                startedDate: startedDate + 'T00:00:00.000Z',
                finishedDate: finishedDate + 'T00:00:00.000Z',
            },
            resourceId: experienceId,
            candidateId: props.candidateId,
        })

        if (success) {
            alert('Experience updated')
        } else {
            alert('Failed to update experience')
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }
    return (
        <div data-testid="experience-form-widget" className={styles.container}>
            {data.data && data.data.length > 0 ? (
                data.data.map((exp) => (
                    <div key={exp.id} className="pl-4">
                        <div className="flex items-center">
                            <h3 className="mr-4 mt-2">
                                &gt; {exp.position} - {exp.company}
                            </h3>
                            {props.isEditing && (
                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={() =>
                                        handleDeleteExperience(exp.id)
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
                            id="experienceForm"
                            onSubmit={(event) => submit(event, exp.id)}
                        >
                            <div className={styles.card}>
                                <label className="lg:col-span-2">
                                    Position:
                                    <input
                                        className={`${
                                            props.isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="expPosition"
                                        defaultValue={exp.position}
                                        readOnly={!props.isEditing}
                                    />
                                </label>
                                <label>
                                    Company:
                                    <input
                                        className={`${
                                            props.isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="expCompany"
                                        defaultValue={exp.company}
                                        readOnly={!props.isEditing}
                                    />
                                </label>
                                <label>
                                    Started Date:
                                    <input
                                        className={`${
                                            props.isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="date"
                                        name="expStartDate"
                                        defaultValue={exp.startedDate.slice(
                                            0,
                                            10
                                        )}
                                        readOnly={!props.isEditing}
                                    />
                                </label>
                                <label>
                                    Finished Date:
                                    <input
                                        className={`${
                                            props.isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="date"
                                        name="expEndDate"
                                        defaultValue={exp.finishedDate.slice(
                                            0,
                                            10
                                        )}
                                        readOnly={!props.isEditing}
                                    />
                                </label>
                                {!props.isEditing && (
                                    <label>
                                        Years Experience:
                                        <input
                                            className={styles.input}
                                            type="number"
                                            name="duration"
                                            defaultValue={exp.duration}
                                            readOnly={true}
                                        />
                                    </label>
                                )}
                            </div>
                        </form>
                        <div className="col-span-3 pl-2 border-l-2 border-amber-500">
                            <div className="flex items-center">
                                <h1 className="mr-4 mt-3">Tasks</h1>
                                <AddTaskWidget
                                    candidateId={props.candidateId}
                                    experienceId={exp.id}
                                    isEditing={props.isEditing}
                                />
                            </div>
                            <TaskFormWidget
                                candidateId={props.candidateId}
                                experienceId={exp.id}
                                isEditing={props.isEditing}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <div></div>
            )}
        </div>
    )
}
