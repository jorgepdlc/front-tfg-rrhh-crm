import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { UserCreateView } from './user-create.view'

const meta: Meta<typeof UserCreateView> = {
    title: 'UserCreateView',
    component: UserCreateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof UserCreateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('user-create-view')

        expect(container).toBeTruthy()
    },
}
