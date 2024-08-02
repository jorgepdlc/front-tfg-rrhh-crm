import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ExperienceFormWidget } from './experience-form.widget'

const meta: Meta<typeof ExperienceFormWidget> = {
    title: 'ExperienceFormWidget',
    component: ExperienceFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ExperienceFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('experience-form-widget')

        expect(container).toBeTruthy()
    },
}
