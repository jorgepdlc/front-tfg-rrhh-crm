import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { IsError } from './is-error.component'

const meta: Meta<typeof IsError> = {
    title: 'IsError',
    component: IsError,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof IsError>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('is-error')

        expect(container).toBeTruthy()
    },
}
