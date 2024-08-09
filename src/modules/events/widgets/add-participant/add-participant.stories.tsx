import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { AddParticipantWidget } from './add-participant.widget'

const meta: Meta<typeof AddParticipantWidget> = {
    title: 'AddParticipantWidget',
    component: AddParticipantWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof AddParticipantWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('add-participant-widget')

        expect(container).toBeTruthy()
    },
}
