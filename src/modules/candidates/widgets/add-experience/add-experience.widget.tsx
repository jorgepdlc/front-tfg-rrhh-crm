import React, { useState } from 'react'
import styles from './add-experience.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import {
    experienceApi,
    ExperienceId,
    useExperiences,
} from '@/candidates/api/experience'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { AddTaskWidget } from '../add-task'

export type AddExperienceWidgetProps = {
    candidateId: CandidateId
    isEditing: boolean
    onSuccess: () => void
}

export function AddExperienceWidget(props: AddExperienceWidgetProps) {
    const { data, isLoading, isError, refetch } = useExperiences({
        candidateId: props.candidateId,
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

    const handleDeleteExperience = async (experienceId: ExperienceId) => {
        const success = await experienceApi.delete({
            resourceId: experienceId,
            candidateId: props.candidateId,
        })

        if (success) {
            await refetch()
        }
    }

    const dateTimeSuffix = 'T00:00:00.000Z'
    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const position = (
            event.currentTarget.elements.namedItem(
                'position'
            ) as HTMLInputElement
        ).value
        const company = (
            event.currentTarget.elements.namedItem(
                'company'
            ) as HTMLInputElement
        ).value
        const startedDate = (
            event.currentTarget.elements.namedItem(
                'startedDate'
            ) as HTMLInputElement
        ).value
        const finishedDate = (
            event.currentTarget.elements.namedItem(
                'finishedDate'
            ) as HTMLInputElement
        ).value

        const success = await experienceApi.create({
            newResource: {
                position: position,
                company: company,
                startedDate: startedDate + dateTimeSuffix,
                finishedDate: finishedDate + dateTimeSuffix,
            },
            candidateId: props.candidateId,
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
                startedDate: startedDate + dateTimeSuffix,
                finishedDate: finishedDate + dateTimeSuffix,
            },
            resourceId: experienceId,
            candidateId: props.candidateId,
        })

        if (success) {
            await refetch()
            setIsModified(false)
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
        <div data-testid="add-experience-widget" className={styles.container}>
            <div className="flex items-center">
                <h1 className="mr-4 mt-3">Experience</h1>
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
                        form="experienceForm"
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
                            <form onSubmit={submit} id="createExperience">
                                <div className={styles.gridFormDiv}>
                                    <div>
                                        <label id="position">
                                            Position: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="position"
                                                id="position"
                                                maxLength={100}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="company">
                                            Company: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="company"
                                                id="company"
                                                maxLength={100}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="startedDate">
                                            Start date: *
                                            <input
                                                className={styles.activeInput}
                                                type="date"
                                                name="startedDate"
                                                id="startedDate"
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="finishedDate">
                                            End date: *
                                            <input
                                                className={styles.activeInput}
                                                type="date"
                                                name="finishedDate"
                                                id="finishedDate"
                                                required
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
                                    form="createExperience"
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
                                onSubmit={(event) =>
                                    submitUpdate(event, exp.id)
                                }
                            >
                                <div className={styles.card}>
                                    <label className="lg:col-span-2">
                                        Position: *
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
                                            onChange={() => setIsModified(true)}
                                            maxLength={100}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Company: *
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
                                            onChange={() => setIsModified(true)}
                                            maxLength={100}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Started Date: *
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
                                            onChange={() => setIsModified(true)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Finished Date: *
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
                                            onChange={() => setIsModified(true)}
                                            required
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
                                <AddTaskWidget
                                    candidateId={props.candidateId}
                                    experienceId={exp.id}
                                    isEditing={props.isEditing}
                                    onSuccess={props.onSuccess}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}
