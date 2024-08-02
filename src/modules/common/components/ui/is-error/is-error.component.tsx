import React from 'react'
import styles from './is-error.module.css'

export type IsErrorProps = {}

export function IsError(props: IsErrorProps) {
    return (
        <div data-testid="is-error" className={styles.container}>
            <div className="text-center p-10">
                <div role="alert" className="flex justify-center">
                    <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"
                            fill="currentColor"
                        />
                    </svg>
                    <div className="text-red-500 font-semibold ml-2">
                        An error connecting to the application has occurred
                    </div>
                </div>
            </div>
        </div>
    )
}
