import React, { useState } from 'react'
import styles from './user-table.module.css'
import { UserId, useUsers } from '@/users/api/user'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { AvatarRoot, AvatarFallback } from '@/common/components/ui/avatar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export type UserTableWidgetProps = {}

export interface User {
    id: UserId
    name: string
    lastname: string
    username: string
    email: string
    phone: string
    position: string
    role: string
    startedDate: string
    finishedDate: string
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function UserTableWidget(props: UserTableWidgetProps) {
    const router = useRouter()
    const { data, isLoading, isError } = useUsers({ size: 10 })

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false)
    const [roleFilters, setRoleFilters] = useState<{
        admin: boolean
        user: boolean
    }>({
        admin: false,
        user: false,
    })
    const [allowedFilters, setAllowedFilters] = useState<{
        allowed: boolean
        deleted: boolean
    }>({
        allowed: true,
        deleted: false,
    })
    const [sortColumn, setSortColumn] = useState<keyof User>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleFilterChange = (role: 'admin' | 'user') => {
        setRoleFilters((prevFilters) => ({
            ...prevFilters,
            [role]: !prevFilters[role],
        }))
    }

    const handleAllowedFilterChange = (filter: 'allowed' | 'deleted') => {
        setAllowedFilters((prevFilters) => ({
            ...prevFilters,
            [filter]: !prevFilters[filter],
        }))
    }

    const handleSortChange = (column: keyof User) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const sortedUsers =
        data.data?.sort((a, b) => {
            if (a[sortColumn] < b[sortColumn])
                return sortDirection === 'asc' ? -1 : 1
            if (a[sortColumn] > b[sortColumn])
                return sortDirection === 'asc' ? 1 : -1
            return 0
        }) || []

    const filteredUsers = sortedUsers.filter((user: User) => {
        const matchesSearchTerm =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesRoleFilter =
            (!roleFilters.admin && !roleFilters.user) ||
            (roleFilters.admin && user.role === 'ADMIN') ||
            (roleFilters.user && user.role === 'USER')

        const matchesAllowedFilter =
            (!allowedFilters.allowed && !allowedFilters.deleted) ||
            (allowedFilters.allowed && user.finishedDate === null) ||
            (allowedFilters.deleted && user.finishedDate !== null)

        return matchesSearchTerm && matchesRoleFilter && matchesAllowedFilter
    })

    return (
        <div data-testid="user-table-widget" className={styles.container}>
            <div className={styles.options}>
                <div className={styles.title}>
                    <p>Manage List of users</p>
                    <h3>Users</h3>
                </div>
                <div className={styles.optionsRight}>
                    <div className={styles.searchbar}>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mx-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <span>
                        <button
                            type="button"
                            className={`${
                                !filtersVisible
                                    ? styles.filtersButton
                                    : styles.filtersButtonActive
                            }`}
                            onClick={() => setFiltersVisible(!filtersVisible)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 mr-1"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                />
                            </svg>
                            Filters
                        </button>
                    </span>
                    <span>
                        <button
                            type="button"
                            className={styles.createButton}
                            onClick={() => router.push('/users/create')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 mr-1"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            Create
                        </button>
                    </span>
                </div>
            </div>
            {filtersVisible && (
                <div className={styles.filters}>
                    <button
                        type="button"
                        className={`${roleFilters.admin ? styles.active : ''}`}
                        onClick={() => handleFilterChange('admin')}
                    >
                        Admin
                    </button>
                    <button
                        type="button"
                        className={`${styles.filterButton} ${
                            roleFilters.user ? styles.active : ''
                        }`}
                        onClick={() => handleFilterChange('user')}
                    >
                        User
                    </button>
                    <button
                        type="button"
                        className={`${styles.filterButton} ${
                            allowedFilters.allowed ? styles.active : ''
                        }`}
                        onClick={() => handleAllowedFilterChange('allowed')}
                    >
                        Allowed Users
                    </button>
                    <button
                        type="button"
                        className={`${styles.filterButton} ${
                            allowedFilters.deleted ? styles.active : ''
                        }`}
                        onClick={() => handleAllowedFilterChange('deleted')}
                    >
                        Unallowed Users
                    </button>
                </div>
            )}
            <div className={styles.tableView}>
                <div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th
                                        onClick={() => handleSortChange('name')}
                                    >
                                        Full Name{' '}
                                        {sortColumn === 'name'
                                            ? sortDirection === 'asc'
                                                ? '↑'
                                                : '↓'
                                            : ''}
                                    </th>
                                    <th
                                        onClick={() =>
                                            handleSortChange('username')
                                        }
                                    >
                                        Username{' '}
                                        {sortColumn === 'username'
                                            ? sortDirection === 'asc'
                                                ? '↑'
                                                : '↓'
                                            : ''}
                                    </th>
                                    <th
                                        onClick={() =>
                                            handleSortChange('email')
                                        }
                                    >
                                        Email{' '}
                                        {sortColumn === 'email'
                                            ? sortDirection === 'asc'
                                                ? '↑'
                                                : '↓'
                                            : ''}
                                    </th>
                                    <th
                                        onClick={() =>
                                            handleSortChange('phone')
                                        }
                                    >
                                        Phone{' '}
                                        {sortColumn === 'phone'
                                            ? sortDirection === 'asc'
                                                ? '↑'
                                                : '↓'
                                            : ''}
                                    </th>
                                    <th
                                        onClick={() =>
                                            handleSortChange('position')
                                        }
                                    >
                                        Position{' '}
                                        {sortColumn === 'position'
                                            ? sortDirection === 'asc'
                                                ? '↑'
                                                : '↓'
                                            : ''}
                                    </th>
                                    <th
                                        onClick={() => handleSortChange('role')}
                                    >
                                        Role{' '}
                                        {sortColumn === 'role'
                                            ? sortDirection === 'asc'
                                                ? '↑'
                                                : '↓'
                                            : ''}
                                    </th>
                                    <th
                                        onClick={() =>
                                            handleSortChange('startedDate')
                                        }
                                    >
                                        Date Created{' '}
                                        {sortColumn === 'startedDate'
                                            ? sortDirection === 'asc'
                                                ? '↑'
                                                : '↓'
                                            : ''}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers?.map((user: User) => (
                                    <tr key={user.id}>
                                        <td>
                                            <Link href={`/users/${user.id}`}>
                                                <AvatarRoot>
                                                    <AvatarFallback
                                                        className={`font-medium text-white ${
                                                            user.role ===
                                                            'ADMIN'
                                                                ? 'bg-red-800'
                                                                : 'bg-indigo-800'
                                                        }`}
                                                    >
                                                        {user.name.charAt(0)}
                                                        {user.lastname.charAt(
                                                            0
                                                        )}
                                                    </AvatarFallback>
                                                </AvatarRoot>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link href={`/users/${user.id}`}>
                                                {user.name} {user.lastname}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link href={`/users/${user.id}`}>
                                                {user.username}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link href={`/users/${user.id}`}>
                                                {user.email}
                                            </Link>
                                        </td>
                                        <td>{user.phone}</td>
                                        <td>{user.position}</td>
                                        <td>{user.role}</td>
                                        <td>{user.startedDate.slice(0, 10)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
