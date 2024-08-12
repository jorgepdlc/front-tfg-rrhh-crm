import React from 'react'
import styles from './position-create-form.module.css'
import { Textarea } from '@/common/components/ui/textarea'
import { toast, ToastContainer } from 'react-toastify'
import { positionApi } from '@/positions/api/position'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'

export type PositionCreateFormWidgetProps = {}

export function PositionCreateFormWidget(props: PositionCreateFormWidgetProps) {
    const router = useRouter()

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const name = (
            event.currentTarget.elements.namedItem('name') as HTMLInputElement
        ).value
        const department = (
            event.currentTarget.elements.namedItem(
                'department'
            ) as HTMLInputElement
        ).value
        const description = (
            event.currentTarget.elements.namedItem(
                'description'
            ) as HTMLInputElement
        ).value
        const yearsExperience = (
            event.currentTarget.elements.namedItem(
                'yearsExperience'
            ) as HTMLInputElement
        ).value
        const location = (
            event.currentTarget.elements.namedItem(
                'location'
            ) as HTMLInputElement
        ).value as 'BARCELONA' | 'CANTABRIA' | 'MADRID' | 'SALAMANCA' | 'REMOTE'
        const positionStatus = (
            event.currentTarget.elements.namedItem(
                'positionStatus'
            ) as HTMLSelectElement
        ).value as 'OPEN' | 'CLOSED'
        const employmentType = (
            event.currentTarget.elements.namedItem(
                'employmentType'
            ) as HTMLSelectElement
        ).value as 'FULL_TIME' | 'PART_TIME' | 'TEMPORARY' | 'CONTRACTOR'
        const salaryRangeMin = (
            event.currentTarget.elements.namedItem(
                'salaryRangeMin'
            ) as HTMLInputElement
        ).value
        const salaryRangeMax = (
            event.currentTarget.elements.namedItem(
                'salaryRangeMax'
            ) as HTMLInputElement
        ).value
        const jobLevel = (
            event.currentTarget.elements.namedItem(
                'jobLevel'
            ) as HTMLInputElement
        ).value

        if (salaryRangeMin > salaryRangeMax) {
            toast.error('Min salary must be lower than max salary', {
                position: 'bottom-right',
            })
            return
        }

        const success = await positionApi.create({
            newResource: {
                name: name,
                department: department,
                description: description,
                location: location,
                yearsExperience: parseInt(yearsExperience),
                positionStatus: positionStatus,
                employmentType: employmentType,
                salaryRangeMin: parseInt(salaryRangeMin),
                salaryRangeMax: parseInt(salaryRangeMax),
                jobLevel: jobLevel,
            },
        })

        if (success) {
            router.push(`/positions`)
        }
    }

    return (
        <div
            data-testid="position-create-form-widget"
            className={styles.container}
        >
            <div className={styles.formInfo}>
                <div className={styles.field}>
                    <h1>New position information</h1>
                    <form onSubmit={submit} id="positionCreateForm">
                        <div className={styles.gridFormDiv}>
                            <div>
                                <label id="name">
                                    Name: *
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Department: *
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="department"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Employment Type: *
                                    <select
                                        className={styles.activeInput}
                                        name="employmentType"
                                        required
                                    >
                                        <option value="FULL_TIME">
                                            FULL-TIME
                                        </option>
                                        <option value="PART_TIME">
                                            PART-TIME
                                        </option>
                                        <option value="TEMPORARY">
                                            TEMPORARY
                                        </option>
                                        <option value="CONTRACTOR">
                                            CONTRACTOR
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <label>
                                        Min salary (EUR): *
                                        <input
                                            className={styles.activeInput}
                                            type="number"
                                            name="salaryRangeMin"
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="px-2">-</div>
                                <div>
                                    <label>
                                        Max Salary (EUR): *
                                        <input
                                            className={styles.activeInput}
                                            type="number"
                                            name="salaryRangeMax"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label>
                                    Job Level:
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="jobLevel"
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Years of Experience required: *
                                    <input
                                        className={styles.activeInput}
                                        type="number"
                                        name="yearsExperience"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Location: *
                                    <select
                                        className={styles.activeInput}
                                        name="location"
                                        defaultValue={'REMOTE'}
                                        required
                                    >
                                        <option value="BARCELONA">
                                            BARCELONA
                                        </option>
                                        <option value="CANTABRIA">
                                            CANTABRIA
                                        </option>
                                        <option value="MADRID">MADRID</option>
                                        <option value="SALAMANCA">
                                            SALAMANCA
                                        </option>
                                        <option value="REMOTE">REMOTE</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Status: *
                                    <select
                                        className={styles.activeInput}
                                        name="positionStatus"
                                        required
                                    >
                                        <option value="OPEN">OPEN</option>
                                        <option value="CLOSED">CLOSED</option>
                                    </select>
                                </label>
                            </div>
                            <div className="lg:col-span-3 md:col-span-2">
                                <label>
                                    Description:
                                    <Textarea
                                        className={styles.activeInput}
                                        name="description"
                                    />
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        className={`mr-2 ${styles.delButton}`}
                        onClick={() => router.push('/positions')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={styles.button}
                        form="positionCreateForm"
                    >
                        Submit
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
