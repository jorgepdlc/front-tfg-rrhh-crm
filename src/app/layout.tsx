import '../styles/main.css'
import { RootLayout } from '@/common/layouts/root'
import { ApplicationLayout } from '@/common/layouts/application'
import { PropsWithChildren } from 'react'

export const metadata = {
    title: 'AXPE - RRHH crm',
    description: 'RRHH application to manage candidates and job positions',
}

export default function Layout(props: PropsWithChildren) {
    return (
        <RootLayout>
            <ApplicationLayout>{props.children}</ApplicationLayout>
        </RootLayout>
    )
}
