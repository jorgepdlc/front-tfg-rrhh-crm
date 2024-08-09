import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { CurriculumVitaeWidget } from './curriculum-vitae.widget'

const meta: Meta<typeof CurriculumVitaeWidget> = {
    title: 'CurriculumVitaeWidget',
    component: CurriculumVitaeWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof CurriculumVitaeWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('curriculum-vitae-widget')

        expect(container).toBeTruthy()
    },
}
