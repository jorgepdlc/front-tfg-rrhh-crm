import { ChangeEvent, useState } from 'react'
import styles from './add-participant.module.css'
import { EventsId } from '@/events/api/events'
import { useRouter } from 'next/navigation'
import {
    CandidateId,
    CandidateUpdate,
    useCandidates,
} from '@/candidates/api/candidate'
import { participantApi, useParticipants } from '@/events/api/participant'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

export type AddParticipantWidgetProps = {
    eventId: EventsId
    isEditing: boolean
}

export function AddParticipantWidget(props: AddParticipantWidgetProps) {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState<string>('')

    const { data, isLoading, isError } = useCandidates({
        size: 100,
    })

    const {
        data: eventData,
        isLoading: loadingEvent,
        isError: errorEvent,
    } = useParticipants({
        eventId: props.eventId,
        size: 100,
    })

    const handleOpenModal = () => {
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

    const participantIds = eventData?.data?.map((participant) => participant.id)

    const filteredCandidates = data?.data?.filter(
        (candidate: CandidateUpdate) => {
            const matchesSearchTerm =
                candidate.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                candidate.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                candidate.lastname
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())

            const isNotInEventData = !participantIds?.includes(candidate.id)

            return matchesSearchTerm && isNotInEventData
        }
    )

    const handleAddCandidate = async (candidateId: CandidateId) => {
        const success = await participantApi.create({
            candidateId: candidateId,
            eventId: props.eventId,
        })

        if (success) {
            router.refresh()
        }
        handleCloseModal()
    }

    if (isLoading || loadingEvent) {
        return <LoadingSpinner />
    }

    if (isError || errorEvent) {
        return <IsError />
    }

    return (
        <div data-testid="add-participant-widget" className={styles.container}>
            <h1 className="mr-4 mt-3">Candidates</h1>
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
                                            <th scope="col" className="py-2">
                                                Email
                                            </th>
                                        </tr>
                                    </thead>
                                    {filteredCandidates?.map((c) => (
                                        <tbody key={c.id}>
                                            <tr
                                                className="bg-gray-50 border-b hover:bg-gray-200 cursor-pointer"
                                                onClick={() =>
                                                    handleAddCandidate(c.id)
                                                }
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-1 py-2 text-sm font-medium whitespace-nowrap"
                                                >
                                                    {c.name} {c.lastname}
                                                </th>
                                                <td className="text-sm">
                                                    {c.email}
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
    )
}
