import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { CandidatesMainView } from './candidates-main.view'

const meta: Meta<typeof CandidatesMainView> = {
    title: 'CandidatesMainView',
    component: CandidatesMainView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof CandidatesMainView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('candidates-main-view')

        expect(container).toBeTruthy()
    },
}
