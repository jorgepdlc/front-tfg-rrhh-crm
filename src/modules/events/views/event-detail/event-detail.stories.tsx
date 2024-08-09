import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EventDetailView } from './event-detail.view'

const meta: Meta<typeof EventDetailView> = {
    title: 'EventDetailView',
    component: EventDetailView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EventDetailView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('event-detail-view')

        expect(container).toBeTruthy()
    },
}
