import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { CandidateTableView } from './candidate-table.view'

const meta: Meta<typeof CandidateTableView> = {
    title: 'CandidateTableView',
    component: CandidateTableView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof CandidateTableView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('candidate-table-view')

        expect(container).toBeTruthy()
    },
}
