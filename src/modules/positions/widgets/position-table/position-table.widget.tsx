import React, { ChangeEvent, useState } from 'react'
import styles from './position-table.module.css'
import { PositionId, usePositions } from '@/positions/api/position'
import Link from 'next/link'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

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

export function PositionTableWidget(props: PositionTableWidgetProps) {
    const { data, isLoading, isError } = usePositions({ size: 10 })
    const [searchTerm, setSearchTerm] = useState<string>('')

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const filteredPositions = data.data.filter(
        (position: Position) =>
            position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            position.department
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            position.employmentType
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            position.jobLevel
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            position.location
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            position.positionStatus
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    )

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
                        <button type="button" className={styles.filtersButton}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6 mr-1"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                />
                            </svg>
                            Filters
                        </button>
                    </span>
                    <span>
                        <button type="button" className={styles.createButton}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6 mr-1"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            Create
                        </button>
                    </span>
                </div>
            </div>
            <div className={styles.tableView}>
                <div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Employment Type</th>
                                    <th>Salary Range (EUR)</th>
                                    <th>Job Level</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {filteredPositions.map((p) => (
                                <tbody key={p.id}>
                                    <tr>
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
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
