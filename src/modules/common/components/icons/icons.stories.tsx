import type { StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { Icons } from './icons.component'

const meta = {
    title: 'Icons',
    component: Icons,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof Icons>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('icons')

        expect(container).toBeTruthy()
    },
}
