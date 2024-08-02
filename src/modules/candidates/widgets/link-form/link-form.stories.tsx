import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { LinkFormWidget } from './link-form.widget'

const meta: Meta<typeof LinkFormWidget> = {
    title: 'LinkFormWidget',
    component: LinkFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof LinkFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('link-form-widget')

        expect(container).toBeTruthy()
    },
}
