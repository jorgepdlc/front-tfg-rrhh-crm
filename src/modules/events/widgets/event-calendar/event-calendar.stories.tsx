import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EventCalendarWidget } from './event-calendar.widget'

const meta: Meta<typeof EventCalendarWidget> = {
    title: 'EventCalendarWidget',
    component: EventCalendarWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EventCalendarWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('event-calendar-widget')

        expect(container).toBeTruthy()
    },
}
