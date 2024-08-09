import React from 'react'
import styles from './position-requirement.module.css'
import {
    requirementApi,
    RequirementId,
    useRequirements,
} from '@/positions/api/requirement'
import { PositionId } from '@/positions/api/position'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

export type PositionRequirementProps = {
    positionId: PositionId
}

export function PositionRequirement(props: PositionRequirementProps) {
    const { data, isLoading, isError, refetch } = useRequirements({
        positionId: props.positionId,
        size: 10,
    })

    const handleDeleteRequirement = async (requirementId: RequirementId) => {
        const success = await requirementApi.delete({
            resourceId: requirementId,
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
        <div data-testid="position-requirement" className={styles.container}>
            <div className={styles.gridFormDiv}>
                {data.data && data.data.length > 0 ? (
                    data.data.map((req) => (
                        <div
                            key={req.id}
                            className="flex justify-between p-2 border-2 mb-2 rounded-2xl"
                        >
                            <div className="w-full ml-2 text-lg font-semibold">
                                {req.name}
                            </div>
                            <div className="w-10 flex items-center justify-center">
                                <button
                                    onClick={() =>
                                        handleDeleteRequirement(req.id)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6 text-red-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}
