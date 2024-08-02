import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { UserDetailView } from './user-detail.view'

const meta: Meta<typeof UserDetailView> = {
    title: 'UserDetailView',
    component: UserDetailView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof UserDetailView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('user-detail-view')

        expect(container).toBeTruthy()
    },
}
