import type { Preview } from '@storybook/vue3-vite';

const preview: Preview = {
  decorators: [
    (story, context) => {
      const description = context.parameters.docs?.description?.story as string | undefined;
      const showDescription = !!description && context.viewMode === 'story';
      return {
        components: { story },
        setup() {
          return { description, showDescription };
        },
        template: `
          <div>
            <p
              v-if="showDescription"
              style="margin: 0 0 1rem; color: #555; font-size: 0.875rem; line-height: 1.6;"
            >{{ description }}</p>
            <story />
          </div>
        `,
      };
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
