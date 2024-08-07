import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionRequirementWidget } from './position-requirement.widget'

const meta: Meta<typeof PositionRequirementWidget> = {
    title: 'PositionRequirementWidget',
    component: PositionRequirementWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionRequirementWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('position-requirement-widget')

        expect(container).toBeTruthy()
    },
}
