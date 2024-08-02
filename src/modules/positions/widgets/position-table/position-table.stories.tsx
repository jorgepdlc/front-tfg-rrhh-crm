import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionTableWidget } from './position-table.widget'

const meta: Meta<typeof PositionTableWidget> = {
    title: 'PositionTableWidget',
    component: PositionTableWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionTableWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('position-table-widget')

        expect(container).toBeTruthy()
    },
}
