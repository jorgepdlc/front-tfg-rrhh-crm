import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { LoadingSpinner } from './loading-spinner.component'

const meta: Meta<typeof LoadingSpinner> = {
    title: 'LoadingSpinner',
    component: LoadingSpinner,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof LoadingSpinner>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('loading-spinner')

        expect(container).toBeTruthy()
    },
}
