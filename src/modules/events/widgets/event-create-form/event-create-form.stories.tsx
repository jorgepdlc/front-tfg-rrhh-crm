import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EventCreateFormWidget } from './event-create-form.widget'

const meta: Meta<typeof EventCreateFormWidget> = {
    title: 'EventCreateFormWidget',
    component: EventCreateFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EventCreateFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('event-create-form-widget')

        expect(container).toBeTruthy()
    },
}
