import React, { ChangeEvent, useState } from 'react'
import styles from './add-requirement.module.css'
import { PositionId } from '@/positions/api/position'
import { Skill, SkillId, useSkills } from '@/positions/api/skill'
import {
    requirementApi,
    RequirementId,
    useRequirements,
} from '@/positions/api/requirement'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

export type AddRequirementWidgetProps = {
    positionId: PositionId
    isEditing: boolean
    onSuccess: () => void
}

export function AddRequirementWidget(props: AddRequirementWidgetProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState<string>('')

    const { data, isLoading, isError, refetch } = useSkills({
        size: 100,
    })

    const {
        data: posData,
        isLoading: loadingPos,
        isError: errorPos,
        refetch: refetchPos,
    } = useRequirements({
        positionId: props.positionId,
        size: 100,
    })

    const handleOpenModal = async () => {
        try {
            await refetch()
            await refetchPos()
        } catch (error) {
            console.error('Error refetching data:', error)
        }

        setIsModalOpen(true)
        document.body.classList.add('overflow-hidden')
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        document.body.classList.remove('overflow-hidden')
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const requirementIds = posData?.data?.map((requirement) => requirement.id)

    const filteredSkills = data?.data?.filter((skill: Skill) => {
        const matchesSearchTerm =
            skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchTerm.toLowerCase())

        const isNotInPositionData = !requirementIds?.includes(skill.id)

        return matchesSearchTerm && isNotInPositionData
    })

    const handleAddRequirement = async (skillId: SkillId) => {
        const success = await requirementApi.create({
            positionId: props.positionId,
            skillId: skillId,
        })

        if (success) {
            try {
                await refetch()
                await refetchPos()
                props.onSuccess()
            } catch (error) {
                console.error('Error adding candidate to event', error)
            }
        }
        handleCloseModal()
    }

    const handleDeleteRequirement = async (requirementId: RequirementId) => {
        const success = await requirementApi.delete({
            resourceId: requirementId,
            positionId: props.positionId,
        })

        if (success) {
            try {
                await refetchPos()
            } catch (refetchError) {
                console.error('Error refetching', refetchError)
            }
        }
    }

    if (isLoading || loadingPos) {
        return <LoadingSpinner />
    }

    if (isError || errorPos) {
        return <IsError />
    }

    return (
        <div data-testid="add-requirement-widget" className={styles.container}>
            <div className="flex items-center">
                <h1 className="mr-4 mt-3">Requirements</h1>
                <button
                    type="button"
                    className={styles.button}
                    onClick={handleOpenModal}
                >
                    Add
                </button>
                {isModalOpen && (
                    <>
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                        <div className={styles.modal}>
                            <div className="bg-white rounded-md shadow-lg p-3 max-w-4xl w-full mx-4">
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
                                <div className={styles.tableContainer}>
                                    <table>
                                        <thead className="text-xs uppercase bg-indigo-300">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-1 py-2"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-2"
                                                >
                                                    Email
                                                </th>
                                            </tr>
                                        </thead>
                                        {filteredSkills?.map((s) => (
                                            <tbody key={s.id}>
                                                <tr
                                                    className="bg-gray-50 border-b hover:bg-gray-200 cursor-pointer"
                                                    onClick={() =>
                                                        handleAddRequirement(
                                                            s.id
                                                        )
                                                    }
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-1 py-2 text-sm font-medium whitespace-nowrap"
                                                    >
                                                        {s.name}
                                                    </th>
                                                    <td className="text-sm">
                                                        {s.description}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className={styles.deleteButton}
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={styles.gridFormDiv}>
                {posData?.data && posData?.data?.length > 0 ? (
                    posData.data.map((req) => (
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
                    <></>
                )}
            </div>
        </div>
    )
}
