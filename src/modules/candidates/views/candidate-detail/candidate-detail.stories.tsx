import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { CandidateDetailView } from './candidate-detail.view'

const meta: Meta<typeof CandidateDetailView> = {
    title: 'CandidateDetailView',
    component: CandidateDetailView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof CandidateDetailView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('candidate-detail-view')

        expect(container).toBeTruthy()
    },
}
