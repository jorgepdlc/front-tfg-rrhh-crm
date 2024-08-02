import React from 'react'
import styles from './users-main.module.css'
import { UserTableView } from '../user-table'

export function UsersMainView() {
    return (
        <div data-testid="users-main-view" className={styles.container}>
            <UserTableView />
        </div>
    )
}
