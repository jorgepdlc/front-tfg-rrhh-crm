import React, { useState } from 'react'
import styles from './curriculum-vitae.module.css'
import { cvApi } from '@/candidates/api/cv'
import { CandidateId, useCandidate } from '@/candidates/api/candidate'
import { LoadingSpinner } from '@/common/components/ui/loading-spinner'
import { IsError } from '@/common/components/ui/is-error'

export type CurriculumVitaeWidgetProps = {
    isEditing: boolean
    candidateId: CandidateId
}

export function CurriculumVitaeWidget(props: CurriculumVitaeWidgetProps) {
    const { data, isLoading, isError, refetch } = useCandidate({
        resourceId: props.candidateId,
    })
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0])
        }
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!file) {
            alert('Please select a file to upload.')
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        const success = await cvApi.create({
            newResource: {
                file,
            },
            candidateId: props.candidateId,
        })

        if (success) {
            try {
                alert('CV successfully uploaded')
                await refetch()
            } catch (error) {
                console.error('Error posting CV', error)
            }
        }
    }

    const handleDownload = async () => {
        try {
            const blob = await cvApi.get({
                candidateId: props.candidateId,
            })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            data
                ? (a.download = `${data.name}-${data.lastname}-CV.pdf`)
                : (a.download = 'CV.pdf')
            a.click()
        } catch (error) {
            console.error('Error downloading CV', error)
        }
    }

    const handleDeleteCv = async () => {
        try {
            const success = await cvApi.delete({
                candidateId: props.candidateId,
            })
            if (success) {
                alert('CV successfully deleted')
                await refetch()
            }
        } catch (error) {
            console.error('Error deleting CV', error)
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <IsError />
    }

    return (
        <div data-testid="curriculum-vitae-widget" className={styles.container}>
            {!props.isEditing ? (
                <button
                    className={`${
                        !data.cvSaved ? styles.buttonDisabled : styles.button
                    }`}
                    type="button"
                    disabled={!data.cvSaved}
                    onClick={handleDownload}
                >
                    Download Candidate CV
                </button>
            ) : !data.cvSaved ? (
                <div className="flex items-center">
                    <form id="fileForm" onSubmit={submit}>
                        <div>
                            <label className="block mt-2 text-sm font-medium text-gray-900">
                                Upload the CV
                            </label>
                            <input
                                className="p-2 -mt-2 block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                id="cv"
                                name="cv"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                        </div>
                    </form>

                    <button
                        type="submit"
                        form="fileForm"
                        className={`mt-9 ml-4 ${styles.button}`}
                    >
                        Upload
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        className={styles.button}
                        type="button"
                        onClick={handleDownload}
                    >
                        Download Candidate CV
                    </button>
                    <button
                        className={`ml-2 ${styles.deleteButton}`}
                        type="button"
                        onClick={handleDeleteCv}
                    >
                        Delete current CV
                    </button>
                </div>
            )}
        </div>
    )
}
