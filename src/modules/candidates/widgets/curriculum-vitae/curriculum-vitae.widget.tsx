import React from 'react'
import styles from './curriculum-vitae.module.css'
import { cvApi, useCv } from '@/candidates/api/cv'
import { CandidateId } from '@/candidates/api/candidate'

export type CurriculumVitaeWidgetProps = {
    isEditing: boolean
    candidateId: CandidateId
}

export function CurriculumVitaeWidget(props: CurriculumVitaeWidgetProps) {
    const { data, refetch } = useCv({ candidateId: props.candidateId })

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const file = (
            event.currentTarget.elements.namedItem('file') as HTMLInputElement
        ).value

        const success = await cvApi.create({
            newResource: {
                file: file,
            },
            candidateId: props.candidateId,
        })

        if (success) {
            try {
                await refetch()
            } catch (error) {
                console.error('Error posting CV', error)
            }
        }
    }

    return (
        <div data-testid="curriculum-vitae-widget" className={styles.container}>
            {!props.isEditing ? (
                <button
                    className={`${
                        props.isEditing ? styles.buttonDisabled : styles.button
                    }`}
                    type="button"
                    disabled={props.isEditing}
                >
                    Download Candidate CV
                </button>
            ) : (
                <>
                    <label className="block mt-2 text-sm font-medium text-gray-900">
                        Upload the CV
                    </label>
                    <input
                        className="p-2 -mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                        id="file"
                        name="file"
                        type="file"
                    />
                </>
            )}
        </div>
    )
}
