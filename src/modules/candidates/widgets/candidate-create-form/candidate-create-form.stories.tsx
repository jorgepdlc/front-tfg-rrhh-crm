import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { CandidateCreateFormWidget } from './candidate-create-form.widget'

const meta: Meta<typeof CandidateCreateFormWidget> = {
    title: 'CandidateCreateFormWidget',
    component: CandidateCreateFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof CandidateCreateFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('candidate-create-form-widget')

        expect(container).toBeTruthy()
    },
}
