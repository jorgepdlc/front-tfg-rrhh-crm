import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionRequirement } from './position-requirement.component'

const meta: Meta<typeof PositionRequirement> = {
    title: 'PositionRequirement',
    component: PositionRequirement,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionRequirement>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('position-requirement')

        expect(container).toBeTruthy()
    },
}
