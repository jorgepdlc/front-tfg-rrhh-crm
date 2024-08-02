import React from 'react'
import styles from './user-table.module.css'
import { UserTableWidget } from '@/users/widgets/user-table'

type UserTableViewProps = {}

export function UserTableView(props: UserTableViewProps) {
    return (
        <div data-testid="user-table-view" className={styles.container}>
            <UserTableWidget />
        </div>
    )
}
