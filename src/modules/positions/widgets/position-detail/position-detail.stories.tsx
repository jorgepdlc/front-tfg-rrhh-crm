import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionDetailWidget } from './position-detail.widget'

const meta: Meta<typeof PositionDetailWidget> = {
    title: 'PositionDetailWidget',
    component: PositionDetailWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionDetailWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('position-detail-widget')

        expect(container).toBeTruthy()
    },
}
