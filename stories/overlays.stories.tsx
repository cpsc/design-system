import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import DotsThreeIcon from "~icons/ph/dots-three"
import GearIcon from "~icons/ph/gear"
import SignOutIcon from "~icons/ph/sign-out"
import TranslateIcon from "~icons/ph/translate"

import { Button } from "../src/components/button"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../src/components/dialog"
import { Drawer } from "../src/components/drawer"
import { Input } from "../src/components/input"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from "../src/components/menu"
import { Popover, PopoverContent, PopoverTrigger } from "../src/components/popover"
import { Tooltip } from "../src/components/tooltip"

const meta = {
  title: "Components/Overlays",
  parameters: { controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const DialogStory: Story = {
  name: "Dialog",
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete service
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent variant="compact">
            <DialogHeader>
              <DialogTitle>Delete this service?</DialogTitle>
              <DialogDescription>Its deployments and volumes go with it.</DialogDescription>
            </DialogHeader>
            <DialogBody>Type the service's name to confirm.</DialogBody>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary" size="sm" />}>Cancel</DialogClose>
              <Button variant="destructive" size="sm" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
}

export const TopDialogStory: Story = {
  name: "Dialog at the top",
  render: () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const items = ["Deployments", "Domains", "Environment variables", "Logs", "Settings", "Volumes"]
    const matches = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Search
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent position="top" variant="compact">
            <DialogTitle className="sr-only">Search</DialogTitle>
            <div className="p-3">
              <Input
                aria-label="Search"
                placeholder="Type to filter"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <ul className="px-3 pb-3">
              {matches.map((item) => (
                <li key={item} className="flex h-8 items-center px-2 text-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      </>
    )
  },
}

export const DrawerStory: Story = {
  name: "Drawer",
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Show logs
        </Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          title="Build logs"
          description="Deployment 42"
          footer={
            <div className="flex justify-end">
              <Button size="sm" onClick={() => setOpen(false)}>
                Done
              </Button>
            </div>
          }
        >
          <pre className="type-mono whitespace-pre-wrap text-secondary">
            {Array.from({ length: 60 }, (_, i) => `step ${i + 1}: ok`).join("\n")}
          </pre>
        </Drawer>
      </>
    )
  },
}

export const MenuStory: Story = {
  name: "Menu",
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" size="icon" aria-label="More" />}>
        <DotsThreeIcon aria-hidden="true" />
      </MenuTrigger>
      <MenuContent align="start">
        <MenuLabel>Account</MenuLabel>
        <MenuItem>
          <GearIcon aria-hidden="true" />
          Settings
        </MenuItem>
        <MenuItem disabled>Billing</MenuItem>
        <MenuSeparator />
        <MenuItem>
          <SignOutIcon aria-hidden="true" />
          Sign out
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
}

export const PopoverStory: Story = {
  name: "Popover",
  render: () => (
    <Popover>
      <PopoverTrigger
        variant="ghost"
        aria-label="Language"
        className="flex size-8 items-center justify-center"
      >
        <TranslateIcon aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent className="w-48">
        {["English", "繁體中文", "简体中文", "日本語"].map((language) => (
          <button
            key={language}
            type="button"
            className="flex h-8 w-full items-center rounded-md px-2 text-left text-secondary hover:bg-v2-surface-hover hover:text-main"
          >
            {language}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  ),
}

export const TooltipStory: Story = {
  name: "Tooltip",
  render: () => (
    <div className="flex gap-3 p-8">
      <Tooltip content="Redeploy the latest commit">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
      <Tooltip
        content="A longer tooltip wraps at twenty rem, so it never runs off as one long line across the page."
        side="bottom"
      >
        <Button variant="ghost">And me</Button>
      </Tooltip>
    </div>
  ),
}
