import React, { useState, ChangeEvent } from 'react'
import styles from './candidate-table.module.css'
import { CandidateId, useCandidates } from '@/candidates/api/candidate'
import Link from 'next/link'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

export type CandidateTableWidgetProps = {}

export interface Candidate {
    id: CandidateId
    name: string
    lastname: string
    role: string
    email: string
    phone: string
    candidateStatus: 'EMPLOYED' | 'UNEMPLOYED' | 'DISCARDED'
    isAxpe: boolean
}

export function CandidateTableWidget(props: CandidateTableWidgetProps) {
    const { data, isLoading, isError } = useCandidates({ size: 10 })
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

    const filteredCandidates = data.data.filter(
        (candidate: Candidate) =>
            candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.lastname
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.candidateStatus
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    )

    return (
        <div data-testid="candidate-table-widget" className={styles.container}>
            <div className={styles.options}>
                <div className={styles.title}>
                    <p>Manage List of candidates</p>
                    <h3>Candidates</h3>
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
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
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
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Candidate Status</th>
                                    <th scope="col">In Axpe</th>
                                </tr>
                            </thead>
                            {filteredCandidates.map((c) => (
                                <tbody key={c.id}>
                                    <tr>
                                        <td className="underline">
                                            <Link href={`/candidates/${c.id}`}>
                                                {c.name} {c.lastname}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link href={`/candidates/${c.id}`}>
                                                {c.role}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link href={`/candidates/${c.id}`}>
                                                {c.email}
                                            </Link>
                                        </td>
                                        <td>{c.phone}</td>
                                        <td>{c.candidateStatus}</td>
                                        <td>{c.isAxpe ? 'Yes' : 'No'}</td>
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
