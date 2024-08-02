import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionTableView } from './position-table.view'

const meta: Meta<typeof PositionTableView> = {
    title: 'PositionTableView',
    component: PositionTableView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionTableView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('position-table-view')

        expect(container).toBeTruthy()
    },
}
