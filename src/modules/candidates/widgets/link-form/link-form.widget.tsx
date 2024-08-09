import React from 'react'
import styles from './link-form.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { linksApi, LinksId, useLinkss } from '@/candidates/api/links'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'
import { useRouter } from 'next/navigation'

export type LinkFormWidgetProps = {
    candidateId: CandidateId
    isEditing: boolean
}

export function LinkFormWidget(props: LinkFormWidgetProps) {
    const router = useRouter()
    const { data, isLoading, isError } = useLinkss({
        candidateId: props.candidateId,
        size: 10,
    })

    const handleDeleteLink = async (linkId: LinksId) => {
        const success = await linksApi.delete({
            resourceId: linkId,
            candidateId: props.candidateId,
        })

        if (success) {
            router.push(`/candidates/${props.candidateId}`)
        }
    }

    const submit = async (
        event: React.FormEvent<HTMLFormElement>,
        linkId: LinksId
    ) => {
        event.preventDefault()

        const url = (
            event.currentTarget.elements.namedItem(
                'linkUrl'
            ) as HTMLInputElement
        ).value
        const description = (
            event.currentTarget.elements.namedItem(
                'linkDescription'
            ) as HTMLInputElement
        ).value

        const success = await linksApi.update({
            updatedResource: {
                url: url,
                description: description,
            },
            resourceId: linkId,
            candidateId: props.candidateId,
        })

        if (success) {
            alert('Link updated')
        } else {
            alert('Failed to update link')
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    return (
        <div data-testid="link-form-widget" className={styles.container}>
            {data.data && data.data.length > 0 ? (
                data.data.map((lin) => (
                    <div key={lin.id} className="pl-4">
                        <div className="flex items-center">
                            <h3 className="mr-4 mt-2">
                                &gt; {lin.description}
                            </h3>
                            {props.isEditing && (
                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={() => handleDeleteLink(lin.id)}
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
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <form
                            id="linkForm"
                            onSubmit={(event) => submit(event, lin.id)}
                        >
                            <div className={styles.card}>
                                <label className="lg:col-span-2">
                                    Link:
                                    <input
                                        className={`${
                                            props.isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="linkUrl"
                                        defaultValue={lin.url}
                                        readOnly={!props.isEditing}
                                        onClick={() => {
                                            if (!props.isEditing) {
                                                window.open(lin.url, '_blank')
                                            }
                                        }}
                                    />
                                </label>
                                <label>
                                    Description:
                                    <input
                                        className={`${
                                            props.isEditing
                                                ? styles.activeInput
                                                : styles.input
                                        }`}
                                        type="text"
                                        name="linkDescription"
                                        defaultValue={lin.description}
                                        readOnly={!props.isEditing}
                                    />
                                </label>
                            </div>
                        </form>
                    </div>
                ))
            ) : (
                <div></div>
            )}
        </div>
    )
}
