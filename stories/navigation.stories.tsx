import type { Meta, StoryObj } from "@storybook/react-vite"
import { flushSync } from "react-dom"
import { useState } from "react"
import BellIcon from "~icons/ph/bell"
import CubeIcon from "~icons/ph/cube"
import GearIcon from "~icons/ph/gear"
import GlobeIcon from "~icons/ph/globe"
import GlobeHemisphereWestIcon from "~icons/ph/globe-hemisphere-west"
import HardDrivesIcon from "~icons/ph/hard-drives"
import HouseIcon from "~icons/ph/house"
import KeyIcon from "~icons/ph/key"
import PlusIcon from "~icons/ph/plus"
import ShoppingCartIcon from "~icons/ph/shopping-cart"
import SparkleIcon from "~icons/ph/sparkle"
import UserIcon from "~icons/ph/user"
import SquaresFourIcon from "~icons/ph/squares-four"
import CaretDownIcon from "~icons/ph/caret-down"
import CaretUpIcon from "~icons/ph/caret-up"
import TerminalWindowIcon from "~icons/ph/terminal-window"

import { Avatar } from "../src/components/avatar"
import { Badge } from "../src/components/badge"
import {
  Dock,
  DockBar,
  DockHeader,
  DockPanel,
  DockResizer,
  DockTab,
  DockTabList,
  DockTabs,
} from "../src/components/dock"
import { Logo } from "../src/components/brand"
import { Button } from "../src/components/button"
import { AppFrame, FramePanel, FrameSidebar, PanelHeader } from "../src/components/frame"
import { IconBox } from "../src/components/icon-box"
import { PageColumn } from "../src/components/page-column"
import { PageHeader } from "../src/components/page-header"
import { usePageTransition, viewTransitionTypes } from "../src/components/page-transition"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarCopyPill,
  SidebarMenu,
  SidebarPicker,
  SidebarSearch,
  SidebarSection,
  SidebarSeparator,
  SidebarToggleIcon,
} from "../src/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/components/tabs"
import { Toggle } from "../src/components/toggle"
import { ToggleGroup, ToggleGroupItem } from "../src/components/toggle-group"

const meta = {
  title: "Components/Navigation",
  parameters: { controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Nav() {
  return (
    <Sidebar aria-label="Main">
      <SidebarHeader>
        <Logo className="h-5" />
      </SidebarHeader>
      <SidebarPicker avatar={<Avatar size="xs" name="Acme" />} label="Acme" />
      <SidebarSearch label="Search" shortcut="⌘K" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarItem icon={<SparkleIcon className="text-brand" />}>Agent</SidebarItem>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarItem icon={<HouseIcon />}>Home</SidebarItem>
          <SidebarItem icon={<CubeIcon />} current>
            Projects
          </SidebarItem>
          <SidebarItem icon={<HardDrivesIcon />} trailing="3">
            Servers
          </SidebarItem>
          <SidebarMenu
            icon={<GlobeIcon />}
            label="Domains"
            active
            defaultOpen
            badge={<Badge>New</Badge>}
          >
            <SidebarItem tone="child" icon={<GlobeHemisphereWestIcon />} current>
              Management
            </SidebarItem>
            <SidebarItem tone="child" icon={<ShoppingCartIcon />}>
              Register
            </SidebarItem>
            <SidebarItem tone="child" icon={<UserIcon />}>
              Profiles
            </SidebarItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSection
          title="Workspace"
          action={
            <Button variant="muted" size="icon-xs" aria-label="Add">
              <PlusIcon aria-hidden="true" />
            </Button>
          }
        >
          <SidebarItem icon={<GearIcon />}>Settings</SidebarItem>
          <SidebarItem icon={<BellIcon />} tone="quiet">
            Notifications
          </SidebarItem>
        </SidebarSection>
      </SidebarContent>
      <SidebarCopyPill label="Project ID" value="project-6644a1b2c3d4e5f6" />
      <SidebarFooter>
        <SidebarPicker
          avatar={<Avatar size="xs" shape="circle" name="Ada" />}
          label="Ada Lovelace"
        />
      </SidebarFooter>
    </Sidebar>
  )
}

export const Frame: Story = {
  parameters: { layout: "fullscreen" },
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <AppFrame className="h-160">
        <FrameSidebar collapsed={collapsed}>
          <Nav />
        </FrameSidebar>
        <FramePanel>
          <PanelHeader>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Toggle the sidebar"
              onClick={() => setCollapsed(!collapsed)}
            >
              <SidebarToggleIcon collapsed={collapsed} />
            </Button>
            <span className="text-secondary">Projects</span>
          </PanelHeader>
          <div className="flex flex-col gap-6 overflow-y-auto p-8">
            <PageHeader title="Projects" actions={<Button>New project</Button>} />
            <div className="flex items-center gap-3">
              <IconBox>
                <CubeIcon />
              </IconBox>
              <IconBox size="sm" tone="orangered">
                <SparkleIcon />
              </IconBox>
              <IconBox size="lg" tone="green">
                <GlobeIcon />
              </IconBox>
            </div>
          </div>
        </FramePanel>
      </AppFrame>
    )
  },
}

function DockFrame() {
  const [open, setOpen] = useState(true)
  const [height, setHeight] = useState(280)
  const [tabs, setTabs] = useState(["kubectl", "api", "worker"])
  const [active, setActive] = useState("api")
  return (
    <AppFrame className="h-160">
      <FrameSidebar>
        <Nav />
      </FrameSidebar>
      <FramePanel>
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto p-8">
          <PageHeader title="api" />
        </main>
        {open ? (
          <Dock
            aria-label="Terminals"
            style={{ "--dock-height": `${height}px` } as React.CSSProperties}
          >
            <DockResizer
              aria-label="Terminal height"
              value={height}
              min={160}
              max={480}
              onValueChange={setHeight}
            />
            <DockTabs value={active} onValueChange={(value) => setActive(String(value))}>
              <DockHeader>
                <DockTabList aria-label="Terminals">
                  {tabs.map((tab) => (
                    <DockTab
                      key={tab}
                      value={tab}
                      closeLabel={`Close ${tab}`}
                      onClose={() => setTabs(tabs.filter((t) => t !== tab))}
                    >
                      <TerminalWindowIcon aria-hidden="true" />
                      <span className="truncate">{tab}</span>
                    </DockTab>
                  ))}
                </DockTabList>
                <Button
                  variant="muted"
                  size="icon-xs"
                  aria-label="Hide terminals"
                  onClick={() => setOpen(false)}
                >
                  <CaretDownIcon />
                </Button>
              </DockHeader>
              {tabs.map((tab) => (
                <DockPanel key={tab} value={tab}>
                  <div className="p-3 font-mono text-xs">{tab}</div>
                </DockPanel>
              ))}
            </DockTabs>
          </Dock>
        ) : (
          <DockBar onClick={() => setOpen(true)}>
            <TerminalWindowIcon aria-hidden="true" />
            <span className="flex-1">{tabs.length} terminals</span>
            <CaretUpIcon aria-hidden="true" />
          </DockBar>
        )}
      </FramePanel>
    </AppFrame>
  )
}

/** Terminals docked under the page: drag the top edge, or focus it and press the arrow keys. */
export const DockStory: Story = {
  name: "Dock",
  parameters: { layout: "fullscreen" },
  render: () => <DockFrame />,
}

/** On a narrow screen the actions take their own line and wrap inside the column. */
export const HeaderActionsWrap: Story = {
  render: () => (
    <div className="w-89.5 rounded-xl border border-main bg-card p-4">
      <PageHeader
        title="shop"
        actions={
          <>
            <span className="type-meta text-muted-foreground">Updated 3 min ago</span>
            <Button variant="outline">3 suggestions</Button>
            <Button variant="outline">Map</Button>
            <Button variant="outline">List</Button>
          </>
        }
      />
    </div>
  ),
}

const pages = [
  { name: "api", text: "Three replicas serve api.shop.example.com." },
  { name: "worker", text: "One replica takes jobs from the queue." },
  { name: "db", text: "PostgreSQL 18 on a 20 GiB volume." },
]

/** Every block in one PageColumn; moving to another page fades the main panel only. */
export const Pages: Story = {
  parameters: { layout: "fullscreen" },
  render: () => {
    const [current, setCurrent] = useState(pages[0])
    const ref = usePageTransition<HTMLDivElement>(current.name)
    const open = (page: (typeof pages)[number]) => {
      if (!viewTransitionTypes()) return setCurrent(page)
      document.startViewTransition({
        update: () => flushSync(() => setCurrent(page)),
        types: ["page"],
      })
    }
    return (
      <AppFrame className="h-160">
        <FrameSidebar>
          <Sidebar aria-label="Services">
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu label="shop" defaultOpen>
                  {pages.map((page) => (
                    <SidebarItem
                      key={page.name}
                      current={page.name === current.name}
                      onClick={() => open(page)}
                    >
                      {page.name}
                    </SidebarItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </FrameSidebar>
        <FramePanel>
          <div ref={ref} className="overflow-y-auto py-8 page-transition">
            <PageColumn width="content" gap="md">
              <PageHeader
                title={current.name}
                actions={<Button variant="outline">Restart</Button>}
              />
              <p className="rounded-xl border border-main bg-card p-4 type-body">{current.text}</p>
            </PageColumn>
          </div>
        </FramePanel>
      </AppFrame>
    )
  },
}

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="text-secondary">
            The segmented switcher: the pill slides to the chosen tab.
          </p>
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="variables" className="w-full max-w-240">
        <TabsList className="w-full">
          <TabsTrigger value="overview" className="flex-1">
            <SquaresFourIcon aria-hidden="true" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="variables" className="flex-1">
            <KeyIcon aria-hidden="true" />
            Variables
          </TabsTrigger>
          <TabsTrigger value="networking" className="flex-1">
            <GlobeIcon aria-hidden="true" />
            Networking
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            <GearIcon aria-hidden="true" />
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="variables">
          <p className="text-secondary">
            A service's tabs fill the row; on a phone they tighten, and what still does not fit
            scrolls inside the track with its far edge faded.
          </p>
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="general" orientation="vertical" className="w-56">
        <TabsList>
          <TabsTrigger value="general">
            <GearIcon aria-hidden="true" />
            General
          </TabsTrigger>
          <TabsTrigger value="members">
            <HouseIcon aria-hidden="true" />
            Members
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CubeIcon aria-hidden="true" />
            Billing
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  ),
}

export const Toggles: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup variant="segmented" defaultValue={["1h"]}>
        <ToggleGroupItem value="1h">1h</ToggleGroupItem>
        <ToggleGroupItem value="24h">24h</ToggleGroupItem>
        <ToggleGroupItem value="7d">7d</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup variant="outline" defaultValue={["git"]}>
        <ToggleGroupItem value="git">Git</ToggleGroupItem>
        <ToggleGroupItem value="image">Image</ToggleGroupItem>
        <ToggleGroupItem value="template">Template</ToggleGroupItem>
      </ToggleGroup>
      <div className="flex gap-2">
        <Toggle aria-label="Wrap lines">Wrap</Toggle>
        <Toggle defaultPressed size="sm">
          Follow
        </Toggle>
      </div>
      <div className="flex items-center gap-2">
        <Avatar name="Zeabur" />
        <Avatar size="sm" name="ab" shape="circle" />
        <Avatar size="lg" src="/missing.png" name="Broken" />
      </div>
    </div>
  ),
}
