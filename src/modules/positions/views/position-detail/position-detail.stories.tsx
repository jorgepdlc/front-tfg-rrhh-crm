import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionDetailView } from './position-detail.view'

const meta: Meta<typeof PositionDetailView> = {
    title: 'PositionDetailView',
    component: PositionDetailView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionDetailView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('position-detail-view')

        expect(container).toBeTruthy()
    },
}
