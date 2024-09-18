import React, { ChangeEvent, useState } from 'react'
import styles from './position-table.module.css'
import { PositionId, usePositions } from '@/positions/api/position'
import Link from 'next/link'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

export type PositionTableWidgetProps = {}

export interface Position {
    id: PositionId
    name: string
    department: string
    employmentType: string
    salaryRangeMin: number
    salaryRangeMax: number
    jobLevel: string
    location: string
    positionStatus: string
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function PositionTableWidget(props: PositionTableWidgetProps) {
    const router = useRouter()
    const { data, isLoading, isError } = usePositions({ size: 10 })
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false)
    const [employmentTypeFilters, setEmploymentTypeFilters] = useState<{
        full_time: boolean
        part_time: boolean
        contractor: boolean
        temporary: boolean
    }>({
        full_time: false,
        part_time: false,
        contractor: false,
        temporary: false,
    })
    const [locationFilters, setLocationFilters] = useState<{
        barcelona: boolean
        cantabria: boolean
        madrid: boolean
        salamanca: boolean
        remote: boolean
    }>({
        barcelona: false,
        cantabria: false,
        madrid: false,
        salamanca: false,
        remote: false,
    })
    const [positionStatusFilters, setPositionStatusFilters] = useState<{
        open: boolean
        closed: boolean
    }>({
        open: false,
        closed: false,
    })
    const [sortBy, setSortBy] = useState<string>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleTypeChange = (
        type: 'full_time' | 'part_time' | 'contractor' | 'temporary'
    ) => {
        setEmploymentTypeFilters((prevFilters) => ({
            ...prevFilters,
            [type]: !prevFilters[type],
        }))
    }

    const handleLocationChange = (
        location: 'barcelona' | 'cantabria' | 'madrid' | 'salamanca' | 'remote'
    ) => {
        setLocationFilters((prevFilters) => ({
            ...prevFilters,
            [location]: !prevFilters[location],
        }))
    }

    const handleStatusChange = (status: 'open' | 'closed') => {
        setPositionStatusFilters((prevFilters) => ({
            ...prevFilters,
            [status]: !prevFilters[status],
        }))
    }

    const handleSortChange = (column: string) => {
        if (sortBy === column) {
            setSortDirection((prevDirection) =>
                prevDirection === 'asc' ? 'desc' : 'asc'
            )
        } else {
            setSortBy(column)
            setSortDirection('asc')
        }
    }

    const matchesSearchTerm = (position: Position) => {
        const searchTermLower = searchTerm.toLowerCase()
        return (
            position.name.toLowerCase().includes(searchTermLower) ||
            position.department.toLowerCase().includes(searchTermLower) ||
            position.employmentType.toLowerCase().includes(searchTermLower) ||
            position.jobLevel.toLowerCase().includes(searchTermLower) ||
            position.location.toLowerCase().includes(searchTermLower) ||
            position.positionStatus.toLowerCase().includes(searchTermLower)
        )
    }

    const matchesTypeFilters = (position: Position) => {
        const { full_time, part_time, contractor, temporary } =
            employmentTypeFilters

        return (
            (!full_time && !part_time && !contractor && !temporary) ||
            (full_time && position.employmentType === 'FULL_TIME') ||
            (part_time && position.employmentType === 'PART_TIME') ||
            (contractor && position.employmentType === 'CONTRACTOR') ||
            (temporary && position.employmentType === 'TEMPORARY')
        )
    }

    const matchesLocationFilters = (position: Position) => {
        const { barcelona, cantabria, madrid, salamanca, remote } =
            locationFilters

        return (
            (!barcelona && !cantabria && !madrid && !salamanca && !remote) ||
            (barcelona && position.location === 'BARCELONA') ||
            (cantabria && position.location === 'CANTABRIA') ||
            (madrid && position.location === 'MADRID') ||
            (salamanca && position.location === 'SALAMANCA') ||
            (remote && position.location === 'REMOTE')
        )
    }

    const matchesStatusFilters = (position: Position) => {
        const { open, closed } = positionStatusFilters

        return (
            (!open && !closed) ||
            (open && position.positionStatus === 'OPEN') ||
            (closed && position.positionStatus === 'CLOSED')
        )
    }

    const filteredPositions =
        data.data?.filter((position: Position) => {
            return (
                matchesSearchTerm(position) &&
                matchesTypeFilters(position) &&
                matchesLocationFilters(position) &&
                matchesStatusFilters(position)
            )
        }) || []

    const sortedPositions = filteredPositions.sort((a, b) => {
        const aValue = a[sortBy as keyof Position]
        const bValue = b[sortBy as keyof Position]

        if (aValue < bValue) {
            return sortDirection === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
            return sortDirection === 'asc' ? 1 : -1
        }
        return 0
    })

    return (
        <div data-testid="candidate-table-widget" className={styles.container}>
            <div className={styles.options}>
                <div className={styles.title}>
                    <p>Manage List of positions</p>
                    <h3>Positions</h3>
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
                            onClick={() => router.push('/positions/create')}
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
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={`mr-2 ${
                                employmentTypeFilters.full_time ||
                                employmentTypeFilters.part_time ||
                                employmentTypeFilters.contractor ||
                                employmentTypeFilters.temporary
                                    ? styles.active
                                    : ''
                            }`}
                        >
                            <button className="flex items-center">
                                Employment Type
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4 ml-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={styles.filterContent}>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        employmentTypeFilters.full_time
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleTypeChange('full_time')
                                    }
                                >
                                    Full-Time
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        employmentTypeFilters.part_time
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleTypeChange('part_time')
                                    }
                                >
                                    Part-Time
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        employmentTypeFilters.contractor
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleTypeChange('contractor')
                                    }
                                >
                                    Contractor
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        employmentTypeFilters.temporary
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleTypeChange('temporary')
                                    }
                                >
                                    Temporary
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={`mr-2 ${
                                locationFilters.barcelona ||
                                locationFilters.cantabria ||
                                locationFilters.madrid ||
                                locationFilters.salamanca ||
                                locationFilters.remote
                                    ? styles.active
                                    : ''
                            }`}
                        >
                            <button className="flex items-center">
                                Location
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4 ml-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={styles.filterContent}>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        locationFilters.barcelona
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleLocationChange('barcelona')
                                    }
                                >
                                    Barcelona
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        locationFilters.cantabria
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleLocationChange('cantabria')
                                    }
                                >
                                    Cantabria
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        locationFilters.madrid
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleLocationChange('madrid')
                                    }
                                >
                                    Madrid
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        locationFilters.salamanca
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleLocationChange('salamanca')
                                    }
                                >
                                    Salamanca
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        locationFilters.remote
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleLocationChange('remote')
                                    }
                                >
                                    Remote
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={`${
                                positionStatusFilters.open ||
                                positionStatusFilters.closed
                                    ? styles.active
                                    : ''
                            }`}
                        >
                            <button className="flex items-center">
                                Status
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4 ml-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={styles.filterContent}>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        positionStatusFilters.open
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() => handleStatusChange('open')}
                                >
                                    Open
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        positionStatusFilters.closed
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() => handleStatusChange('closed')}
                                >
                                    Closed
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
            <div className={styles.tableView}>
                <div>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th
                                    className={styles.th}
                                    onClick={() => handleSortChange('name')}
                                >
                                    Name{' '}
                                    {sortBy === 'name' &&
                                        (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    className={styles.th}
                                    onClick={() =>
                                        handleSortChange('department')
                                    }
                                >
                                    Department{' '}
                                    {sortBy === 'department' &&
                                        (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    className={styles.th}
                                    onClick={() =>
                                        handleSortChange('employmentType')
                                    }
                                >
                                    Employment Type{' '}
                                    {sortBy === 'employmentType' &&
                                        (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    className={styles.th}
                                    onClick={() =>
                                        handleSortChange('salaryRangeMin')
                                    }
                                >
                                    Salary Range (EUR){' '}
                                    {sortBy === 'salaryRangeMin' &&
                                        (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    className={styles.th}
                                    onClick={() => handleSortChange('jobLevel')}
                                >
                                    Job Level{' '}
                                    {sortBy === 'jobLevel' &&
                                        (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    className={styles.th}
                                    onClick={() => handleSortChange('location')}
                                >
                                    Location{' '}
                                    {sortBy === 'location' &&
                                        (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                    className={styles.th}
                                    onClick={() =>
                                        handleSortChange('positionStatus')
                                    }
                                >
                                    Status{' '}
                                    {sortBy === 'positionStatus' &&
                                        (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPositions.map((p) => (
                                <tr key={p.id}>
                                    <td className="underline">
                                        <Link href={`/positions/${p.id}`}>
                                            {p.name}
                                        </Link>
                                    </td>
                                    <td>{p.department}</td>
                                    <td>{p.employmentType}</td>
                                    <td>
                                        {p.salaryRangeMin}
                                        {' - '}
                                        {p.salaryRangeMax}
                                    </td>
                                    <td>{p.jobLevel}</td>
                                    <td>{p.location}</td>
                                    <td>{p.positionStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
