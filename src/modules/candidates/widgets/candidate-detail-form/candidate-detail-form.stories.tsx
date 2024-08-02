import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { CandidateDetailFormWidget } from './candidate-detail-form.widget'

const meta: Meta<typeof CandidateDetailFormWidget> = {
    title: 'CandidateDetailFormWidget',
    component: CandidateDetailFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof CandidateDetailFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('candidate-detail-form-widget')

        expect(container).toBeTruthy()
    },
}
