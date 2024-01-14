import { Button } from '../components';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    iconPosition: {
      after: 'after',
      before: 'before'
    }
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Primary',
    iconPosition: "after"
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'Secondary',
  },
};

export const Ghost: Story = {
  args: {
    type: 'ghost',
    children: 'Ghost',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'loading',
  },
};
