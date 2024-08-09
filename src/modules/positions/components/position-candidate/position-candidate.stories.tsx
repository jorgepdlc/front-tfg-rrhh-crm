import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionCandidate } from './position-candidate.component'

const meta: Meta<typeof PositionCandidate> = {
    title: 'PositionCandidate',
    component: PositionCandidate,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionCandidate>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('position-candidate')

        expect(container).toBeTruthy()
    },
}
