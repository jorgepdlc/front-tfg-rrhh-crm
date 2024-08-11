import { ChangeEvent, useState } from 'react'
import styles from './add-participant.module.css'
import { EventsId } from '@/events/api/events'
import {
    CandidateId,
    CandidateUpdate,
    useCandidates,
} from '@/candidates/api/candidate'
import { participantApi, useParticipants } from '@/events/api/participant'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { useRouter } from 'next/navigation'

export type AddParticipantWidgetProps = {
    eventId: EventsId
    isEditing: boolean
}

export function AddParticipantWidget(props: AddParticipantWidgetProps) {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState<string>('')

    const { data, isLoading, isError, refetch } = useCandidates({
        size: 100,
    })

    const {
        data: eventData,
        isLoading: loadingEvent,
        isError: errorEvent,
        refetch: refetchEvent,
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
            try {
                await refetch()
                await refetchEvent()
            } catch (error) {
                console.error('Error adding candidate to event', error)
            }
        }
        handleCloseModal()
    }

    const handleDeleteCandidate = async (candidateId: CandidateId) => {
        const success = await participantApi.delete({
            resourceId: candidateId,
            eventId: props.eventId,
        })

        if (success) {
            try {
                await refetchEvent()
            } catch (refetchError) {
                console.error('Error refetching data:', refetchError)
            }
        }
    }

    if (isLoading || loadingEvent) {
        return <LoadingSpinner />
    }

    if (isError || errorEvent) {
        return <IsError />
    }

    return (
        <div data-testid="add-participant-widget" className={styles.container}>
            <div className="flex items-center">
                <h1 className="mr-4 mt-3">Participants</h1>
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
            <div className={styles.gridFormDiv2}>
                {eventData?.data && eventData?.data.length > 0 ? (
                    eventData?.data.map((c) => (
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
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
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
                    <div></div>
                )}
            </div>
        </div>
    )
}
