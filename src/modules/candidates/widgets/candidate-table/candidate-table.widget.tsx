import React, { useState, ChangeEvent } from 'react'
import styles from './candidate-table.module.css'
import { CandidateId, useCandidates } from '@/candidates/api/candidate'
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
    const router = useRouter()
    const { data, isLoading, isError } = useCandidates({ size: 10 })
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false)
    const [statusFilters, setStatusFilters] = useState<{
        employed: boolean
        unemployed: boolean
        discarded: boolean
    }>({
        employed: true,
        unemployed: true,
        discarded: false,
    })
    const [isAxpeFilters, setIsAxpeFilters] = useState<{
        axpe: boolean
        notAxpe: boolean
    }>({
        axpe: false,
        notAxpe: false,
    })

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleStatusFilterChange = (
        candidateStatus: 'employed' | 'unemployed' | 'discarded'
    ) => {
        setStatusFilters((prevFilters) => ({
            ...prevFilters,
            [candidateStatus]: !prevFilters[candidateStatus],
        }))
    }

    const handleAxpeFilterChange = (filterType: 'axpe' | 'notAxpe') => {
        setIsAxpeFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: !prevFilters[filterType],
        }))
    }

    const filteredCandidates = data.data.filter((candidate: Candidate) => {
        const matchesSearchTerm =
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

        const matchesStatusFilters =
            (!statusFilters.employed &&
                !statusFilters.unemployed &&
                !statusFilters.discarded) ||
            (statusFilters.employed &&
                candidate.candidateStatus === 'EMPLOYED') ||
            (statusFilters.unemployed &&
                candidate.candidateStatus === 'UNEMPLOYED') ||
            (statusFilters.discarded &&
                candidate.candidateStatus === 'DISCARDED')

        const matchesAxpeFilters =
            (!isAxpeFilters.axpe && !isAxpeFilters.notAxpe) ||
            (isAxpeFilters.axpe && candidate.isAxpe) ||
            (isAxpeFilters.notAxpe && !candidate.isAxpe)

        return matchesSearchTerm && matchesStatusFilters && matchesAxpeFilters
    })

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
                        <button
                            type="button"
                            className={styles.createButton}
                            onClick={() => router.push('/candidates/create')}
                        >
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
            {filtersVisible && (
                <div className={styles.filters}>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={`mr-2 ${
                                statusFilters.discarded ||
                                statusFilters.employed ||
                                statusFilters.unemployed
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
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-4 ml-1"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
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
                                        statusFilters.employed
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleStatusFilterChange('employed')
                                    }
                                >
                                    Employed
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        statusFilters.unemployed
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleStatusFilterChange('unemployed')
                                    }
                                >
                                    Unemployed
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        statusFilters.discarded
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleStatusFilterChange('discarded')
                                    }
                                >
                                    Discarded
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={`mr-2 ${
                                isAxpeFilters.axpe || isAxpeFilters.notAxpe
                                    ? styles.active
                                    : ''
                            }`}
                        >
                            <button className="flex items-center">
                                Is Axpe
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-4 ml-1"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
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
                                        isAxpeFilters.axpe ? styles.active : ''
                                    }`}
                                    onClick={() =>
                                        handleAxpeFilterChange('axpe')
                                    }
                                >
                                    Yes
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center">
                                <button
                                    type="button"
                                    className={`${styles.filterOption} ${
                                        isAxpeFilters.notAxpe
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleAxpeFilterChange('notAxpe')
                                    }
                                >
                                    No
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
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
