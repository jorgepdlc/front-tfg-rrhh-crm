import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { CandidateTableWidget } from './candidate-table.widget'

const meta: Meta<typeof CandidateTableWidget> = {
    title: 'CandidateTableWidget',
    component: CandidateTableWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof CandidateTableWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('candidate-table-widget')

        expect(container).toBeTruthy()
    },
}
