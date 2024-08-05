import React from 'react'
import styles from './candidate-create-form.module.css'
import { useRouter } from 'next/navigation'
import { candidateApi } from '@/candidates/api/candidate'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type CandidateCreateFormWidgetProps = {}

export function CandidateCreateFormWidget(
    props: CandidateCreateFormWidgetProps
) {
    const router = useRouter()

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\+?[0-9\- ]+$/
        return phoneRegex.test(phone)
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const name = (
            event.currentTarget.elements.namedItem(
                'candidateName'
            ) as HTMLInputElement
        ).value
        const lastname = (
            event.currentTarget.elements.namedItem(
                'candidateLastname'
            ) as HTMLInputElement
        ).value
        const phone = (
            event.currentTarget.elements.namedItem(
                'candidatePhone'
            ) as HTMLInputElement
        ).value
        const role = (
            event.currentTarget.elements.namedItem(
                'candidateRole'
            ) as HTMLInputElement
        ).value
        const email = (
            event.currentTarget.elements.namedItem(
                'candidateEmail'
            ) as HTMLInputElement
        ).value
        const candidateStatus = (
            event.currentTarget.elements.namedItem(
                'candidateStatus'
            ) as HTMLSelectElement
        ).value as 'EMPLOYED' | 'UNEMPLOYED' | 'DISCARDED'
        const isAxpe = (
            event.currentTarget.elements.namedItem(
                'isAxpe'
            ) as HTMLSelectElement
        ).value

        const toastPosition = 'bottom-right'

        if (!validateEmail(email)) {
            toast.error('Invalid email format', {
                position: toastPosition,
            })
            return
        }

        if (!validatePhone(phone)) {
            toast.error('Invalid phone format', {
                position: toastPosition,
            })
            return
        }

        const success = await candidateApi.create({
            newResource: {
                name: name,
                lastname: lastname,
                phone: phone,
                role: role,
                email: email,
                candidateStatus: candidateStatus,
                isAxpe: isAxpe === 'true' ? true : false,
            },
        })

        if (success) {
            router.push('/candidates')
        }
    }

    return (
        <div
            data-testid="candidate-create-form-widget"
            className={styles.container}
        >
            <div className={styles.formInfo}>
                <div className={styles.field}>
                    <h1>New candidate information</h1>
                    <form onSubmit={submit} id="candidateCreateForm">
                        <div className={styles.gridFormDiv}>
                            <div>
                                <label id="candidateName">
                                    Name:
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="candidateName"
                                        id="candidateName"
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="candidateLastname">
                                    Lastname:
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="candidateLastname"
                                        id="candidateLastname"
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="candidatePhone">
                                    Phone:
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="candidatePhone"
                                        id="candidatePhone"
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="candidateRole">
                                    Role:
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="candidateRole"
                                        id="candidateRole"
                                    />
                                </label>
                            </div>
                            <div className="col-span-2">
                                <label id="candidateEmail">
                                    Email:
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="candidateEmail"
                                        id="candidateEmail"
                                    />
                                </label>
                            </div>
                            <div className="lg:col-span-2">
                                <label id="candidateStatus">
                                    Candidate Status:
                                    <select
                                        className={styles.activeInput}
                                        name="candidateStatus"
                                        id="candidateStatus"
                                    >
                                        <option value="EMPLOYED">
                                            EMPLOYED
                                        </option>
                                        <option value="UNEMPLOYED">
                                            UNEMPLOYED
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label id="isAxpe">
                                    Is Axpe:
                                    <select
                                        className={styles.activeInput}
                                        name="isAxpe"
                                        id="isAxpe"
                                    >
                                        <option value="true">YES</option>
                                        <option value="false">NO</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={styles.button}
                        form="candidateCreateForm"
                    >
                        Submit
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
