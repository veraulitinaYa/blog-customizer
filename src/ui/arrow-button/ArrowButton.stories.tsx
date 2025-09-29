import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';
import { createElement, useState } from 'react';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: () =>
		createElement(() => {
			const [isMenuOpen, setIsMenuOpen] = useState(false);

			return (
				<ArrowButton
					isMenuOpen={isMenuOpen}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				/>
			);
		}),
};
