import React, { useState } from 'react'
import styles from './candidate-detail-form.module.css'
import { AvatarFallback, AvatarRoot } from '@/common/components/ui/avatar'
import {
    candidateApi,
    CandidateId,
    useCandidate,
} from '@/candidates/api/candidate'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { useRouter } from 'next/navigation'
import { CurriculumVitaeWidget } from '../curriculum-vitae'
import { AddEducationWidget } from '../add-education'
import { AddCourseWidget } from '../add-course'
import { AddExperienceWidget } from '../add-experience'
import { AddLinkWidget } from '../add-link'

export type CandidateDetailFormWidgetProps = {
    candidateId: CandidateId
}

export function CandidateDetailFormWidget(
    props: CandidateDetailFormWidgetProps
) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    const { data, isError, isLoading, refetch } = useCandidate({
        resourceId: props.candidateId,
    })

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const name = (
            event.currentTarget.elements.namedItem(
                'candidateName'
            ) as HTMLInputElement
        ).value
        const lastname = (
            event.currentTarget.elements.namedItem(
                'candidateLastname'
            ) as HTMLInputElement
        ).value
        const phone = (
            event.currentTarget.elements.namedItem(
                'candidatePhone'
            ) as HTMLInputElement
        ).value
        const role = (
            event.currentTarget.elements.namedItem(
                'candidateRole'
            ) as HTMLInputElement
        ).value
        const email = (
            event.currentTarget.elements.namedItem(
                'candidateEmail'
            ) as HTMLInputElement
        ).value
        const candidateStatus = (
            event.currentTarget.elements.namedItem(
                'candidateStatus'
            ) as HTMLSelectElement
        ).value as 'EMPLOYED' | 'UNEMPLOYED' | 'DISCARDED'
        const isAxpe = (
            event.currentTarget.elements.namedItem(
                'isAxpe'
            ) as HTMLSelectElement
        ).value

        const success = await candidateApi.update({
            updatedResource: {
                name: name,
                lastname: lastname,
                phone: phone,
                role: role,
                email: email,
                candidateStatus: candidateStatus,
                isAxpe: isAxpe === 'true' ? true : false,
            },
            resourceId: props.candidateId,
        })

        if (success) {
            setIsEditing(false)
            try {
                await refetch()
            } catch (error) {
                console.error('Error updating candidate', error)
            }
        }
    }

    const handleSuccess = async () => {
        await refetch()
    }

    const handleDeleteButton = async () => {
        const success = await candidateApi.delete({
            resourceId: props.candidateId,
        })

        if (success) {
            await refetch()
            router.push('/candidates')
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    return (
        <div className={styles.container}>
            <div className={styles.options}>
                <div className={styles.title}>
                    <p>Manage List of candidates &gt; Candidate</p>
                    <div className="flex items-center mt-2">
                        <AvatarRoot>
                            <AvatarFallback className="bg-slate-800 font-medium text-white">
                                {data.name.charAt(0)}
                                {data.lastname.charAt(0)}
                            </AvatarFallback>
                        </AvatarRoot>
                        <h3>
                            {data.name} {data.lastname}
                        </h3>
                    </div>
                </div>
                <div className={styles.optionsRight}>
                    <span>
                        {isEditing ? (
                            <button
                                type="submit"
                                className={styles.button}
                                form="candidateUpdateForm"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6 mr-2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                                    />
                                </svg>
                                Save
                            </button>
                        ) : (
                            data.candidateStatus !== 'DISCARDED' && (
                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={handleDeleteButton}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="size-6 mr-2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                        />
                                    </svg>
                                    Discard
                                </button>
                            )
                        )}
                    </span>
                    <span>
                        <button
                            type="button"
                            className={`${
                                isEditing
                                    ? styles.buttonDisabled
                                    : styles.button
                            }`}
                            disabled={isEditing}
                            onClick={() => setIsEditing(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                            Edit
                        </button>
                    </span>
                </div>
            </div>
            <div className={styles.formInfo}>
                <div className={styles.field}>
                    <h1>Candidate Information</h1>
                    <form onSubmit={submit} id="candidateUpdateForm">
                        <div className={styles.gridFormDiv}>
                            <div>
                                <label id="candidateName">
                                    Name: *
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="candidateName"
                                        id="candidateName"
                                        defaultValue={data.name}
                                        readOnly={!isEditing}
                                        maxLength={100}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="candidateLastname">
                                    Lastname: *
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="candidateLastname"
                                        id="candidateLastname"
                                        defaultValue={data.lastname}
                                        readOnly={!isEditing}
                                        maxLength={100}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="candidatePhone">
                                    Phone: *
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="candidatePhone"
                                        id="candidatePhone"
                                        defaultValue={data.phone}
                                        readOnly={!isEditing}
                                        maxLength={100}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="candidateRole">
                                    Role: *
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="candidateRole"
                                        id="candidateRole"
                                        defaultValue={data.role}
                                        readOnly={!isEditing}
                                        maxLength={100}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="md:col-span-2">
                                <label id="candidateEmail">
                                    Email: *
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="candidateEmail"
                                        id="candidateEmail"
                                        defaultValue={data.email}
                                        readOnly={!isEditing}
                                        maxLength={100}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="lg:col-span-2">
                                <label id="candidateStatus">
                                    Candidate Status: *
                                    <select
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        name="candidateStatus"
                                        id="candidateStatus"
                                        defaultValue={data.candidateStatus}
                                        disabled={!isEditing}
                                        required
                                    >
                                        <option value="EMPLOYED">
                                            EMPLOYED
                                        </option>
                                        <option value="UNEMPLOYED">
                                            UNEMPLOYED
                                        </option>
                                        <option value="DISCARDED">
                                            DISCARDED
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label id="isAxpe">
                                    Is Axpe: *
                                    <select
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        name="isAxpe"
                                        id="isAxpe"
                                        defaultValue={data.isAxpe.toString()}
                                        disabled={!isEditing}
                                        required
                                    >
                                        <option value="true">YES</option>
                                        <option value="false">NO</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-center">
                        <CurriculumVitaeWidget
                            isEditing={isEditing}
                            candidateId={props.candidateId}
                        />
                    </div>
                </div>
                <div className={styles.field}>
                    <AddEducationWidget
                        isEditing={isEditing}
                        candidateId={props.candidateId}
                        onSuccess={handleSuccess}
                    />
                </div>
                <div className={styles.field}>
                    <AddCourseWidget
                        isEditing={isEditing}
                        candidateId={props.candidateId}
                        onSuccess={handleSuccess}
                    />
                </div>
                <div className={styles.field}>
                    <AddExperienceWidget
                        candidateId={props.candidateId}
                        isEditing={isEditing}
                        onSuccess={handleSuccess}
                    />
                </div>
                <div className={styles.field}>
                    <AddLinkWidget
                        candidateId={props.candidateId}
                        isEditing={isEditing}
                        onSuccess={handleSuccess}
                    />
                </div>
                <div className="flex justify-end mb-2">
                    {isEditing && (
                        <button
                            type="submit"
                            className={styles.button}
                            form="candidateUpdateForm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6 mr-2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                                />
                            </svg>
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
