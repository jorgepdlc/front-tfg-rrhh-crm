import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { AddExperienceWidget } from './add-experience.widget'

const meta: Meta<typeof AddExperienceWidget> = {
    title: 'AddExperienceWidget',
    component: AddExperienceWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof AddExperienceWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('add-experience-widget')

        expect(container).toBeTruthy()
    },
}
