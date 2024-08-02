import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EducationFormWidget } from './education-form.widget'

const meta: Meta<typeof EducationFormWidget> = {
    title: 'EducationFormWidget',
    component: EducationFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EducationFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('education-form-widget')

        expect(container).toBeTruthy()
    },
}
