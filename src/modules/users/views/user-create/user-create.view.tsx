import React from 'react'
import styles from './user-create.module.css'
import { UserCreateFormWidget } from '@/users/widgets/user-create-form'

type UserCreateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function UserCreateView(props: UserCreateViewProps) {
    return (
        <div data-testid="user-create-view" className={styles.container}>
            <UserCreateFormWidget />
        </div>
    )
}
