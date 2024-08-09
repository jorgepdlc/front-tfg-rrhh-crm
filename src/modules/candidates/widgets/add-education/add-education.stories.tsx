import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { AddEducationWidget } from './add-education.widget'

const meta: Meta<typeof AddEducationWidget> = {
    title: 'AddEducationWidget',
    component: AddEducationWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof AddEducationWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('add-education-widget')

        expect(container).toBeTruthy()
    },
}
