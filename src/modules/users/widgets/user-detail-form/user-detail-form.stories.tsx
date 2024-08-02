import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { UserDetailFormWidget } from './user-detail-form.widget'

const meta: Meta<typeof UserDetailFormWidget> = {
    title: 'UserDetailFormWidget',
    component: UserDetailFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof UserDetailFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('user-detail-form-widget')

        expect(container).toBeTruthy()
    },
}
