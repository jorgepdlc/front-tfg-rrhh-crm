import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { AddRequirementWidget } from './add-requirement.widget'

const meta: Meta<typeof AddRequirementWidget> = {
    title: 'AddRequirementWidget',
    component: AddRequirementWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof AddRequirementWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('add-requirement-widget')

        expect(container).toBeTruthy()
    },
}
