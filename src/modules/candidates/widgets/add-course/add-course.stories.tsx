import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { AddCourseWidget } from './add-course.widget'

const meta: Meta<typeof AddCourseWidget> = {
    title: 'AddCourseWidget',
    component: AddCourseWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof AddCourseWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('add-course-widget')

        expect(container).toBeTruthy()
    },
}
