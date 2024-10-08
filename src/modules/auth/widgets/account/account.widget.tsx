import React from 'react'
import styles from './account.module.css'
import classNames from 'classnames'
import { useSession, signIn, signOut } from 'next-auth/react'
import * as Avatar from '@/common/components/ui/avatar'
import * as Popover from '@/common/components/ui/popover'
import { Button } from '@/common/components/ui/button'

export type AccountWidgetProps = {
    className: string
}

export function AccountWidget(props: AccountWidgetProps) {
    const { status } = useSession()

    return (
        <div
            data-testid="account-widget"
            className={classNames(styles.container, props.className)}
        >
            {selectComponent(status)}
        </div>
    )
}

function selectComponent(authStatus: ReturnType<typeof useSession>['status']) {
    return authStatus === 'authenticated' ? (
        <LoggedInUser />
    ) : (
        <Button
            className="bg-indigo-600 p-3 font-medium text-white hover:bg-indigo-500"
            onClick={() => signIn()}
        >
            Sign In
        </Button>
    )
}

function LoggedInUser() {
    const { data: session } = useSession()
    return (
        <Popover.Root>
            <Popover.Trigger asChild className="cursor-pointer">
                <Avatar.Root>
                    <Avatar.Image src={session?.user?.image ?? undefined} />
                    <Avatar.Fallback
                        className={
                            session?.user?.role === 'ADMIN'
                                ? 'bg-red-700 text-white font-bold'
                                : 'bg-indigo-500 text-white font-bold'
                        }
                    >
                        {(session?.user?.name ?? '')
                            .split(/\s+/)
                            .map((v) => v[0].toUpperCase())
                            .join('') || 'Unknown user'}
                    </Avatar.Fallback>
                </Avatar.Root>
            </Popover.Trigger>
            <Popover.Content>
                <LoggedInMenu />
            </Popover.Content>
        </Popover.Root>
    )
}

function LoggedInMenu() {
    return (
        <Button
            className="bg-slate-800 hover:bg-slate-600 text-white p-2"
            onClick={() =>
                signOut({
                    redirect: true,
                })
            }
        >
            Sign Out
        </Button>
    )
}
