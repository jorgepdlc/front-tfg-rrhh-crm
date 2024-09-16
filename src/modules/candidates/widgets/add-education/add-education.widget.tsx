import React, { useState } from 'react'
import styles from './add-education.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import {
    educationApi,
    EducationId,
    useEducations,
} from '@/candidates/api/education'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

export type AddEducationWidgetProps = {
    candidateId: CandidateId
    isEditing: boolean
    onSuccess: () => void
}

export function AddEducationWidget(props: AddEducationWidgetProps) {
    const { data, isLoading, isError, refetch } = useEducations({
        candidateId: props.candidateId,
        size: 10,
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modifiedEducations, setModifiedEducations] = useState<{
        [key: EducationId]: boolean
    }>({})

    const handleEducationModification = (educationId: EducationId) => {
        setModifiedEducations((prev) => ({
            ...prev,
            [educationId]: true,
        }))
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
        document.body.classList.add('overflow-hidden')
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
        document.body.classList.remove('overflow-hidden')
    }

    const handleDeleteEducation = async (educationId: EducationId) => {
        const success = await educationApi.delete({
            resourceId: educationId,
            candidateId: props.candidateId,
        })

        if (success) {
            await refetch()
            props.onSuccess()
        }
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const degree = (
            event.currentTarget.elements.namedItem('degree') as HTMLInputElement
        ).value
        const school = (
            event.currentTarget.elements.namedItem('school') as HTMLInputElement
        ).value
        const endDate = (
            event.currentTarget.elements.namedItem(
                'endDate'
            ) as HTMLInputElement
        ).value

        const success = await educationApi.create({
            newResource: {
                degree: degree,
                school: school,
                endDate: endDate + 'T00:00:00.000Z',
            },
            candidateId: props.candidateId,
        })

        if (success) {
            try {
                await refetch()
                props.onSuccess()
            } catch (error) {
                console.error('Error creating education', error)
            }
        }
        handleCloseModal()
    }

    const submitUpdate = async (
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
            await refetch()
            setModifiedEducations((prev) => ({
                ...prev,
                [educationId]: false,
            }))
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
        <div data-testid="add-education-widget" className={styles.container}>
            <div className="flex items-center">
                <h1 className="mr-4 mt-3">Education</h1>
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
            </div>
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                    <div className={styles.modal}>
                        <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full mx-4">
                            <form onSubmit={submit} id="createEducation">
                                <div className={styles.gridFormDiv}>
                                    <div>
                                        <label id="degree">
                                            Degree: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="degree"
                                                id="degree"
                                                maxLength={100}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="school">
                                            School:
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="school"
                                                id="school"
                                                maxLength={100}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="endDate">
                                            End date: *
                                            <input
                                                className={styles.activeInput}
                                                type="date"
                                                name="endDate"
                                                id="endDate"
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
                                    form="createEducation"
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
                {data?.data && data?.data.length > 0 ? (
                    data?.data.map((edu) => (
                        <div key={edu.id} className="pl-4">
                            <div className="flex items-center">
                                <h3 className="mr-4 mt-2">
                                    &gt; {edu.degree} -{' '}
                                    {edu.endDate.slice(0, 4)}
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
                                {modifiedEducations[edu.id] && (
                                    <button
                                        type="submit"
                                        form={`educationForm-${edu.id}`}
                                        className={`ml-2 ${styles.button}`}
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
                                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <form
                                id={`educationForm-${edu.id}`}
                                onSubmit={(event) =>
                                    submitUpdate(event, edu.id)
                                }
                            >
                                <div className={`w-full ${styles.card}`}>
                                    <label>
                                        Degree: *
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
                                            maxLength={100}
                                            onChange={() =>
                                                handleEducationModification(
                                                    edu.id
                                                )
                                            }
                                            required
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
                                            maxLength={100}
                                            onChange={() =>
                                                handleEducationModification(
                                                    edu.id
                                                )
                                            }
                                        />
                                    </label>
                                    <label>
                                        End Date: *
                                        <input
                                            className={`${
                                                props.isEditing
                                                    ? styles.activeInput
                                                    : styles.input
                                            }`}
                                            type="date"
                                            name="educationEndDate"
                                            defaultValue={edu.endDate.slice(
                                                0,
                                                10
                                            )}
                                            readOnly={!props.isEditing}
                                            onChange={() =>
                                                handleEducationModification(
                                                    edu.id
                                                )
                                            }
                                            required
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
        </div>
    )
}
