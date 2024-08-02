import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { TaskFormWidget } from './task-form.widget'

const meta: Meta<typeof TaskFormWidget> = {
    title: 'TaskFormWidget',
    component: TaskFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof TaskFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('task-form-widget')

        expect(container).toBeTruthy()
    },
}
