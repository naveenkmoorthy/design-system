import type { Preview } from "@storybook/react";
import "@basis/ui/styles";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    docs: {
      theme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#fafafa" },
        { name: "dark",  value: "#0a0a0a" },
      ],
    },
  },
};

export default preview;
