import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { UserTableWidget } from './user-table.widget'

const meta: Meta<typeof UserTableWidget> = {
    title: 'UserTableWidget',
    component: UserTableWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof UserTableWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('user-table-widget')

        expect(container).toBeTruthy()
    },
}
