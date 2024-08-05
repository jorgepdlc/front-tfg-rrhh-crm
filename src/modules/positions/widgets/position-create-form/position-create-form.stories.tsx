import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionCreateFormWidget } from './position-create-form.widget'

const meta: Meta<typeof PositionCreateFormWidget> = {
    title: 'PositionCreateFormWidget',
    component: PositionCreateFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionCreateFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('position-create-form-widget')

        expect(container).toBeTruthy()
    },
}
