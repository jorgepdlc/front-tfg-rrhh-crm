import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ParticipantWidget } from './participant.widget'

const meta: Meta<typeof ParticipantWidget> = {
    title: 'ParticipantWidget',
    component: ParticipantWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ParticipantWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('participant-widget')

        expect(container).toBeTruthy()
    },
}
