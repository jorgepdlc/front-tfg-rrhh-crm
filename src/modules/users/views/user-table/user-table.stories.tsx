import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { UserTableView } from './user-table.view'

const meta: Meta<typeof UserTableView> = {
    title: 'UserTableView',
    component: UserTableView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof UserTableView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('user-table-view')

        expect(container).toBeTruthy()
    },
}
