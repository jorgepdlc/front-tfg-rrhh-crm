import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EventDetailFormWidget } from './event-detail-form.widget'

const meta: Meta<typeof EventDetailFormWidget> = {
    title: 'EventDetailFormWidget',
    component: EventDetailFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EventDetailFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('event-detail-form-widget')

        expect(container).toBeTruthy()
    },
}
