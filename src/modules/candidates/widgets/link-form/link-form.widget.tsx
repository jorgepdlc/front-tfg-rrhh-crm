import React from 'react'
import styles from './link-form.module.css'
import { CandidateId } from '@/candidates/api/candidate'
import { LinksId, useLinks } from '@/candidates/api/links'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

export type LinkFormWidgetProps = {
    candidateId: CandidateId
    linkId: LinksId
    isEditing: boolean
}

export function LinkFormWidget(props: LinkFormWidgetProps) {
    const { data, isLoading, isError } = useLinks({
        resourceId: props.linkId,
        candidateId: props.candidateId,
    })

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    return (
        <div data-testid="link-form-widget" className={styles.card}>
            <label className="lg:col-span-2">
                Link:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="text"
                    name="url"
                    defaultValue={data?.url}
                    readOnly={!props.isEditing}
                    onClick={() => {
                        if (!props.isEditing) {
                            window.open(data?.url, '_blank')
                        }
                    }}
                />
            </label>
            <label>
                Description:
                <input
                    className={`${
                        props.isEditing ? styles.activeInput : styles.input
                    }`}
                    type="text"
                    name="description"
                    defaultValue={data?.description}
                    readOnly={!props.isEditing}
                />
            </label>
        </div>
    )
}
