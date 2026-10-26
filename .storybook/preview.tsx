import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react-vite"

import { TooltipProvider } from "../src/components/tooltip"
import "./preview.css"

const preview: Preview = {
  decorators: [
    withThemeByClassName({ themes: { light: "light", dark: "dark" }, defaultTheme: "dark" }),
    (Story) => (
      <TooltipProvider>
        <div className="type-body text-foreground">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: "padded",
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i } },
  },
}

export default preview
