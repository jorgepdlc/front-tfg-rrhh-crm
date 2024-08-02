import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { PositionsMainView } from './positions-main.view'

const meta: Meta<typeof PositionsMainView> = {
    title: 'PositionsMainView',
    component: PositionsMainView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof PositionsMainView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('positions-main-view')

        expect(container).toBeTruthy()
    },
}
