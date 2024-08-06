import React, { useState } from 'react'
import styles from './position-detail.module.css'
import { positionApi, PositionId, usePosition } from '@/positions/api/position'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { Textarea } from '@/common/components/ui/textarea'
import { useRouter } from 'next/navigation'

export type PositionDetailWidgetProps = {
    positionId: PositionId
}

export function PositionDetailWidget(props: PositionDetailWidgetProps) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    const { data, isError, isLoading } = usePosition({
        resourceId: props.positionId,
    })

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const name = (
            event.currentTarget.elements.namedItem('name') as HTMLInputElement
        ).value
        const department = (
            event.currentTarget.elements.namedItem(
                'department'
            ) as HTMLInputElement
        ).value
        const description = (
            event.currentTarget.elements.namedItem(
                'description'
            ) as HTMLInputElement
        ).value
        const yearsExperience = (
            event.currentTarget.elements.namedItem(
                'yearsExperience'
            ) as HTMLInputElement
        ).value
        const location = (
            event.currentTarget.elements.namedItem(
                'location'
            ) as HTMLInputElement
        ).value as 'BARCELONA' | 'CANTABRIA' | 'MADRID' | 'SALAMANCA' | 'REMOTE'
        const positionStatus = (
            event.currentTarget.elements.namedItem(
                'positionStatus'
            ) as HTMLSelectElement
        ).value as 'OPEN' | 'CLOSED'
        const employmentType = (
            event.currentTarget.elements.namedItem(
                'employmentType'
            ) as HTMLSelectElement
        ).value as 'FULL_TIME' | 'PART_TIME' | 'TEMPORARY' | 'CONTRACTOR'
        const salaryRangeMin = (
            event.currentTarget.elements.namedItem(
                'salaryRangeMin'
            ) as HTMLInputElement
        ).value
        const salaryRangeMax = (
            event.currentTarget.elements.namedItem(
                'salaryRangeMax'
            ) as HTMLInputElement
        ).value
        const jobLevel = (
            event.currentTarget.elements.namedItem(
                'jobLevel'
            ) as HTMLInputElement
        ).value

        const success = await positionApi.update({
            updatedResource: {
                name: name,
                department: department,
                description: description,
                yearsExperience: parseInt(yearsExperience),
                location: location,
                positionStatus: positionStatus,
                employmentType: employmentType,
                salaryRangeMin: parseInt(salaryRangeMin),
                salaryRangeMax: parseInt(salaryRangeMax),
                jobLevel: jobLevel,
            },
            resourceId: props.positionId,
        })

        if (success) {
            setIsEditing(false)
            router.push(`/positions/${props.positionId}`)
        }
    }

    const handleDeleteButton = async () => {
        const success = await positionApi.delete({
            resourceId: props.positionId,
        })

        if (success) {
            router.push('/positions')
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
                    <p>Manage List of positions &gt; Position</p>
                    <div className="flex items-center mt-2">
                        <h3>{data.name}</h3>
                    </div>
                </div>
                <div className={styles.optionsRight}>
                    <span>
                        {isEditing ? (
                            <button
                                type="submit"
                                className={styles.button}
                                form="positionUpdateForm"
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
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                                Delete
                            </button>
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
                    <h1>Position Information</h1>
                    <form onSubmit={submit} id="positionUpdateForm">
                        <div className={styles.gridFormDiv}>
                            <div>
                                <label id="name">
                                    Name:
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="name"
                                        id="name"
                                        defaultValue={data.name}
                                        readOnly={!isEditing}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Department:
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="department"
                                        defaultValue={data.department}
                                        readOnly={!isEditing}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Employment Type:
                                    <select
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        name="employmentType"
                                        defaultValue={data.employmentType}
                                        disabled={!isEditing}
                                    >
                                        <option value="FULL_TIME">
                                            FULL-TIME
                                        </option>
                                        <option value="PART_TIME">
                                            PART-TIME
                                        </option>
                                        <option value="TEMPORARY">
                                            TEMPORARY
                                        </option>
                                        <option value="CONTRACTOR">
                                            CONTRACTOR
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <label>
                                        Min salary (EUR):
                                        <input
                                            className={`${
                                                isEditing
                                                    ? styles.activeInput
                                                    : styles.input
                                            }`}
                                            type="number"
                                            name="salaryRangeMin"
                                            defaultValue={data.salaryRangeMin}
                                            readOnly={!isEditing}
                                        />
                                    </label>
                                </div>
                                <div className="px-2">-</div>
                                <div>
                                    <label>
                                        Max Salary (EUR):
                                        <input
                                            className={`${
                                                isEditing
                                                    ? styles.activeInput
                                                    : styles.input
                                            }`}
                                            type="number"
                                            name="salaryRangeMax"
                                            defaultValue={data.salaryRangeMax}
                                            readOnly={!isEditing}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label>
                                    Job Level:
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="jobLevel"
                                        defaultValue={data.jobLevel}
                                        readOnly={!isEditing}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Years of Experience required:
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="number"
                                        name="yearsExperience"
                                        defaultValue={data.yearsExperience}
                                        readOnly={!isEditing}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Location:
                                    <select
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        name="location"
                                        defaultValue={data.location}
                                        disabled={!isEditing}
                                    >
                                        <option value="BARCELONA">
                                            BARCELONA
                                        </option>
                                        <option value="CANTABRIA">
                                            CANTABRIA
                                        </option>
                                        <option value="MADRID">MADRID</option>
                                        <option value="SALAMANCA">
                                            SALAMANCA
                                        </option>
                                        <option value="REMOTE">REMOTE</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Status:
                                    <select
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        name="positionStatus"
                                        defaultValue={data.positionStatus}
                                        disabled={!isEditing}
                                    >
                                        <option value="OPEN">OPEN</option>
                                        <option value="CLOSED">CLOSED</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Publication Date:
                                    <input
                                        className={styles.input}
                                        type="date"
                                        name="publicationDate"
                                        defaultValue={data.publicationDate.slice(
                                            0,
                                            10
                                        )}
                                        readOnly={true}
                                    />
                                </label>
                            </div>
                            <div className="lg:col-span-3 md:col-span-2">
                                <label>
                                    Description:
                                    <Textarea
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        name="description"
                                        defaultValue={data.description}
                                        readOnly={!isEditing}
                                    />
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styles.field}>
                    <div className="flex items-center">
                        <h1 className="mr-4 mt-3">Requirements</h1>
                        <button type="button" className={styles.button}>
                            Add
                        </button>
                    </div>
                    <div className={styles.gridFormDiv}>
                        {data.requirements.map((req) => (
                            <div
                                key={req.id}
                                className="flex justify-between p-2 border-2 mb-2 rounded-2xl"
                                data-tip={req.description}
                            >
                                <div className="w-full ml-2 text-lg font-semibold">
                                    {req.name}
                                </div>
                                <div className="w-10 flex items-center justify-center">
                                    <button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="size-6 text-red-600"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.field}>
                    <div className="flex items-center">
                        <h1 className="mr-4 mt-3">Candidates</h1>
                        <button type="button" className={styles.button}>
                            Add
                        </button>
                    </div>
                    <div className={styles.gridFormDiv2}>
                        {data.candidates.map((c) => (
                            <div
                                key={c.id}
                                className="pl-4 mb-4 border-b-2 border-l-2 border-indigo-100"
                            >
                                <div className="flex justify-between">
                                    <h3>
                                        {c.name} {c.lastname}:
                                    </h3>
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className={styles.viewButton}
                                            onClick={() => {
                                                router.push(
                                                    `/candidates/${c.id}`
                                                )
                                            }}
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
                                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                />
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.removeButton}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <label>
                                        Email:
                                        <input
                                            className={styles.input}
                                            type="text"
                                            name="email"
                                            defaultValue={c.email}
                                            readOnly={true}
                                        />
                                    </label>
                                    <label>
                                        Phone:
                                        <input
                                            className={styles.input}
                                            type="text"
                                            name="phone"
                                            defaultValue={c.phone}
                                            readOnly={true}
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
