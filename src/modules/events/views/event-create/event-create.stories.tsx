import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EventCreateView } from './event-create.view'

const meta: Meta<typeof EventCreateView> = {
    title: 'EventCreateView',
    component: EventCreateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EventCreateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('event-create-view')

        expect(container).toBeTruthy()
    },
}
