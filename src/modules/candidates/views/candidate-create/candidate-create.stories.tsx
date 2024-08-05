import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { CandidateCreateView } from './candidate-create.view'

const meta: Meta<typeof CandidateCreateView> = {
    title: 'CandidateCreateView',
    component: CandidateCreateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof CandidateCreateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('candidate-create-view')

        expect(container).toBeTruthy()
    },
}
