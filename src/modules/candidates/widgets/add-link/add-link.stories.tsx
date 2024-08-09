import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { AddLinkWidget } from './add-link.widget'

const meta: Meta<typeof AddLinkWidget> = {
    title: 'AddLinkWidget',
    component: AddLinkWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof AddLinkWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('add-link-widget')

        expect(container).toBeTruthy()
    },
}
