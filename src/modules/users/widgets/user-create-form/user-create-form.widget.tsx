import styles from './user-create-form.module.css'
import { registerApi } from '@/users/api/register'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type UserCreateFormWidgetProps = {}

export function UserCreateFormWidget(props: UserCreateFormWidgetProps) {
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
            event.currentTarget.elements.namedItem('name') as HTMLInputElement
        ).value
        const lastname = (
            event.currentTarget.elements.namedItem(
                'lastname'
            ) as HTMLInputElement
        ).value
        const phone = (
            event.currentTarget.elements.namedItem('phone') as HTMLInputElement
        ).value
        const role = (
            event.currentTarget.elements.namedItem('role') as HTMLInputElement
        ).value as 'ADMIN' | 'USER'
        const email = (
            event.currentTarget.elements.namedItem('email') as HTMLInputElement
        ).value
        const username = (
            event.currentTarget.elements.namedItem(
                'username'
            ) as HTMLInputElement
        ).value
        const password = (
            event.currentTarget.elements.namedItem(
                'password'
            ) as HTMLInputElement
        ).value
        const repeatPassword = (
            event.currentTarget.elements.namedItem(
                'repeatPassword'
            ) as HTMLInputElement
        ).value
        const position = (
            event.currentTarget.elements.namedItem(
                'position'
            ) as HTMLInputElement
        ).value

        const toastPosition = 'bottom-right'

        if (password !== repeatPassword) {
            toast.error('Passwords do not match', {
                position: toastPosition,
            })
            return
        }

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

        try {
            const success = await registerApi.create({
                newResource: {
                    name: name,
                    lastname: lastname,
                    email: email,
                    phone: phone,
                    position: position,
                    username: username,
                    password: password,
                    role: role,
                },
            })

            if (success) {
                router.push('/users')
            }
        } catch (error) {
            toast.error('Username or email already in use', {
                position: toastPosition,
            })
        }
    }

    return (
        <div data-testid="user-create-form-widget" className={styles.container}>
            <div className={styles.formInfo}>
                <div className={styles.field}>
                    <h1>New user information</h1>
                    <form onSubmit={submit} id="userCreateForm">
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
                                <label id="lastname">
                                    Lastname: *
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="position">
                                    Position:
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="position"
                                        id="position"
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="username">
                                    Username: *
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="username"
                                        id="username"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="password">
                                    Password: *
                                    <input
                                        className={styles.activeInput}
                                        type="password"
                                        name="password"
                                        id="password"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="repeatPassword">
                                    Repeat Password: *
                                    <input
                                        className={styles.activeInput}
                                        type="password"
                                        name="repeatPassword"
                                        id="repeatPassword"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="email">
                                    Email: *
                                    <input
                                        className={styles.activeInput}
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="phone">
                                    Phone:
                                    <input
                                        className={styles.activeInput}
                                        type="text"
                                        name="phone"
                                        id="phone"
                                    />
                                </label>
                            </div>
                            <div>
                                <label id="role">
                                    User Role: *
                                    <select
                                        className={styles.activeInput}
                                        name="role"
                                        id="role"
                                        required
                                    >
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="USER">USER</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        className={`mr-2 ${styles.deleteButton}`}
                        onClick={() => router.push('/users')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={styles.button}
                        form="userCreateForm"
                    >
                        Submit
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
