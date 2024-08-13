import React, { useState } from 'react'
import styles from './user-detail-form.module.css'
import { userApi, UserId, useUser } from '@/users/api/user'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { AvatarFallback, AvatarRoot } from '@/common/components/ui/avatar'
import { useRouter } from 'next/navigation'

export type UserDetailFormWidgetProps = { userId: UserId }

// eslint-disable-next-line sonarjs/cognitive-complexity
export function UserDetailFormWidget(props: UserDetailFormWidgetProps) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    const { data, isError, isLoading, refetch } = useUser({
        resourceId: props.userId,
    })

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const name = (
            event.currentTarget.elements.namedItem('name') as HTMLInputElement
        ).value
        const lastname = (
            event.currentTarget.elements.namedItem(
                'lastname'
            ) as HTMLInputElement
        ).value
        const phone = (
            event.currentTarget.elements.namedItem('phone') as HTMLInputElement
        ).value
        const role = (
            event.currentTarget.elements.namedItem('role') as HTMLInputElement
        ).value as 'ADMIN' | 'USER'
        const position = (
            event.currentTarget.elements.namedItem(
                'position'
            ) as HTMLInputElement
        ).value

        const success = await userApi.patch({
            updatedResource: {
                name: name,
                lastname: lastname,
                phone: phone,
                position: position,
                role: role,
            },
            resourceId: props.userId,
        })

        if (success) {
            setIsEditing(false)
            try {
                await refetch()
            } catch (error) {
                console.error('Error refetching user', error)
            }
        }
    }

    const handleDeleteButton = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to unallow this user?'
        )
        if (!confirmed) {
            return
        }

        const success = await userApi.delete({
            resourceId: props.userId,
        })

        if (success) {
            router.push('/users')
        }
    }

    const handleChangePasswordButton = async () => {
        const newPassword = prompt('Introduce la nueva contraseña:')
        const confirmPassword = prompt('Confirma la nueva contraseña:')

        if (
            newPassword === confirmPassword &&
            newPassword !== null &&
            newPassword?.length > 2
        ) {
            const success = await userApi.patch({
                updatedResource: {
                    password: newPassword,
                },
                resourceId: props.userId,
            })

            if (success) {
                setIsEditing(false)
                await refetch()
                alert('Contraseña cambiada correctamente.')
            }
        } else {
            alert('Las contraseñas no coinciden. Inténtalo de nuevo.')
        }
    }

    const handleRecoverButton = async () => {
        const success = await userApi.patch({
            updatedResource: {
                finishedDate: undefined,
            },
            resourceId: props.userId,
        })

        if (success) {
            try {
                await refetch()
            } catch (error) {
                console.error('Error refetching user', error)
            }
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    return (
        <div data-testid="user-detail-form-widget" className={styles.container}>
            <div className={styles.options}>
                <div className={styles.title}>
                    <p>Manage List of users &gt; User</p>
                    <div className="flex items-center mt-2">
                        <AvatarRoot>
                            <AvatarFallback
                                className={`font-medium text-white ${
                                    data.role === 'ADMIN'
                                        ? 'bg-red-800'
                                        : 'bg-indigo-800'
                                }`}
                            >
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
                                form="userUpdateForm"
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
                        ) : data.finishedDate === null ? (
                            <button
                                type="button"
                                className={`${
                                    data.username === 'JPrietoC'
                                        ? styles.buttonDisabled
                                        : styles.deleteButton
                                }`}
                                onClick={handleDeleteButton}
                                disabled={data.username === 'JPrietoC'}
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
                        ) : (
                            <button
                                type="button"
                                className={styles.recoverButton}
                                onClick={handleRecoverButton}
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
                                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                                    />
                                </svg>
                                Allow
                            </button>
                        )}
                    </span>
                    <span>
                        {data.finishedDate === null && (
                            <button
                                type="button"
                                className={`${
                                    isEditing || data.username === 'JPrietoC'
                                        ? styles.buttonDisabled
                                        : styles.button
                                }`}
                                disabled={
                                    isEditing || data.username === 'JPrietoC'
                                }
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
                        )}
                    </span>
                </div>
            </div>
            <div className={styles.formInfo}>
                <div className={styles.field}>
                    <h1>User Information</h1>
                    <form onSubmit={submit} id="userUpdateForm">
                        <div className={styles.gridFormDiv}>
                            <div>
                                <label id="name">
                                    Name: *
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
                                        maxLength={100}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="lg:col-span-2">
                                <label id="lastname">
                                    Lastname: *
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        defaultValue={data.lastname}
                                        readOnly={!isEditing}
                                        maxLength={100}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="username">
                                    Username:
                                    <input
                                        className={styles.input}
                                        type="text"
                                        name="username"
                                        id="username"
                                        defaultValue={data.username}
                                        readOnly={true}
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="email">
                                    Email:
                                    <input
                                        className={styles.input}
                                        type="text"
                                        name="email"
                                        id="email"
                                        defaultValue={data.email}
                                        readOnly={true}
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="phone">
                                    Phone:
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        defaultValue={data.phone}
                                        readOnly={!isEditing}
                                        maxLength={100}
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="position">
                                    Position: *
                                    <input
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="position"
                                        id="position"
                                        defaultValue={data.position}
                                        readOnly={!isEditing}
                                        maxLength={100}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="md:col-span-2">
                                <label id="role">
                                    User Role: *
                                    <select
                                        className={`${
                                            isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        name="role"
                                        id="role"
                                        defaultValue={data.role}
                                        disabled={!isEditing}
                                        required
                                    >
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="USER">USER</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end mb-2">
                    {isEditing && (
                        <div className="flex items-center">
                            <button
                                type="button"
                                className={`mr-2 ${styles.button}`}
                                onClick={handleChangePasswordButton}
                            >
                                Change Password
                            </button>
                            <button
                                type="submit"
                                className={styles.button}
                                form="userUpdateForm"
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
