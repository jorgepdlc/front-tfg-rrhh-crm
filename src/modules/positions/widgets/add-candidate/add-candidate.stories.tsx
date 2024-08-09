import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { AddCandidateWidget } from './add-candidate.widget'

const meta: Meta<typeof AddCandidateWidget> = {
    title: 'AddCandidateWidget',
    component: AddCandidateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof AddCandidateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('add-candidate-widget')

        expect(container).toBeTruthy()
    },
}
