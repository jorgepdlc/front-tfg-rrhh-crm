import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionCreateView } from './position-create.view'

const meta: Meta<typeof PositionCreateView> = {
    title: 'PositionCreateView',
    component: PositionCreateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionCreateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('position-create-view')

        expect(container).toBeTruthy()
    },
}
