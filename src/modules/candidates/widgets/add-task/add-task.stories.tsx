import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { AddTaskWidget } from './add-task.widget'

const meta: Meta<typeof AddTaskWidget> = {
    title: 'AddTaskWidget',
    component: AddTaskWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof AddTaskWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('add-task-widget')

        expect(container).toBeTruthy()
    },
}
