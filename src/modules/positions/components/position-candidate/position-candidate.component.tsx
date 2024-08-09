import React from 'react'
import styles from './position-candidate.module.css'
import { PositionId } from '@/positions/api/position'
import {
    positionCandidateApi,
    usePositionCandidates,
} from '@/positions/api/position-candidate'
import { IsError } from '@/common/components/ui/is-error'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { CandidateId } from '@/candidates/api/candidate'
import { useRouter } from 'next/navigation'

export type PositionCandidateProps = {
    positionId: PositionId
}

export function PositionCandidate(props: PositionCandidateProps) {
    const router = useRouter()

    const { data, isLoading, isError, refetch } = usePositionCandidates({
        positionId: props.positionId,
        size: 10,
    })

    const handleDeleteCandidate = async (candidateId: CandidateId) => {
        const success = await positionCandidateApi.delete({
            resourceId: candidateId,
            positionId: props.positionId,
        })

        if (success) {
            try {
                await refetch()
            } catch (refetchError) {
                console.error('Error refetching data:', refetchError)
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
        <div data-testid="position-candidate" className={styles.container}>
            <div className={styles.gridFormDiv2}>
                {data.data && data.data.length > 0 ? (
                    data.data.map((c) => (
                        <div
                            key={c.id}
                            className="pl-4 mb-4 border-b-2 border-l-2 border-indigo-100"
                        >
                            <div className="flex justify-between">
                                <h3>
                                    {c.name} {c.lastname}:
                                </h3>
                                <div className="flex">
                                    <button
                                        type="button"
                                        className={styles.viewButton}
                                        onClick={() => {
                                            router.push(`/candidates/${c.id}`)
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.removeButton}
                                        onClick={() =>
                                            handleDeleteCandidate(c.id)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.card}>
                                <label>
                                    Email:
                                    <input
                                        className={styles.input}
                                        type="text"
                                        name="email"
                                        defaultValue={c.email}
                                        readOnly={true}
                                    />
                                </label>
                                <label>
                                    Phone:
                                    <input
                                        className={styles.input}
                                        type="text"
                                        name="phone"
                                        defaultValue={c.phone}
                                        readOnly={true}
                                    />
                                </label>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No candidates found.</div>
                )}
            </div>
        </div>
    )
}
