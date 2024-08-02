import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EventsMainView } from './events-main.view'

const meta: Meta<typeof EventsMainView> = {
    title: 'EventsMainView',
    component: EventsMainView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EventsMainView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('events-main-view')

        expect(container).toBeTruthy()
    },
}
