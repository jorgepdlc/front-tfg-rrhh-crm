import { useState } from 'react'
import styles from './add-link.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { useRouter } from 'next/navigation'
import { linksApi } from '@/candidates/api/links'

export type AddLinkWidgetProps = {
    candidateId: CandidateId
    isEditing: boolean
}

export function AddLinkWidget(props: AddLinkWidgetProps) {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
        document.body.classList.add('overflow-hidden')
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        document.body.classList.remove('overflow-hidden')
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const url = (
            event.currentTarget.elements.namedItem('url') as HTMLInputElement
        ).value
        const description = (
            event.currentTarget.elements.namedItem(
                'description'
            ) as HTMLInputElement
        ).value

        const success = await linksApi.create({
            newResource: {
                url: url,
                description: description,
            },
            candidateId: props.candidateId,
        })

        if (success) {
            router.refresh()
        }
        handleCloseModal()
    }

    return (
        <div data-testid="add-link-widget" className={styles.container}>
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
                        <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full mx-4">
                            <form onSubmit={submit} id="createLink">
                                <div className={styles.gridFormDiv}>
                                    <div>
                                        <label id="url">
                                            Url: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="url"
                                                id="url"
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label id="description">
                                            Description: *
                                            <input
                                                className={styles.activeInput}
                                                type="text"
                                                name="description"
                                                id="description"
                                                required
                                            />
                                        </label>
                                    </div>
                                </div>
                            </form>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    form="createLink"
                                    className={styles.button}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
