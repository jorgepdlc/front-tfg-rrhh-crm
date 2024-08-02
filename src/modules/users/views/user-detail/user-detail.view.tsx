import React from 'react'
import styles from './user-detail.module.css'
import { UserId } from '@/users/api/user'
import { UserDetailFormWidget } from '@/users/widgets/user-detail-form'

type UserDetailViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { userId: UserId }
}

export function UserDetailView(props: UserDetailViewProps) {
    return (
        <div data-testid="user-detail-view" className={styles.container}>
            <UserDetailFormWidget userId={props.params.userId} />
        </div>
    )
}
