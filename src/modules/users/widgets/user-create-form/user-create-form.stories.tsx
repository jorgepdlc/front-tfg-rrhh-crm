import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { UserCreateFormWidget } from './user-create-form.widget'

const meta: Meta<typeof UserCreateFormWidget> = {
    title: 'UserCreateFormWidget',
    component: UserCreateFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof UserCreateFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('user-create-form-widget')

        expect(container).toBeTruthy()
    },
}
