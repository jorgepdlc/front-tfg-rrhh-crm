import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionCandidateWidget } from './position-candidate.widget'

const meta: Meta<typeof PositionCandidateWidget> = {
    title: 'PositionCandidateWidget',
    component: PositionCandidateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionCandidateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('position-candidate-widget')

        expect(container).toBeTruthy()
    },
}
