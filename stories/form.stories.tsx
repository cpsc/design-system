import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { Checkbox } from "../src/components/checkbox"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../src/components/combobox"
import { CopyInput } from "../src/components/copy-input"
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field"
import { Input } from "../src/components/input"
import { Label } from "../src/components/label"
import { RadioGroup, Radio, RadioOption } from "../src/components/radio"
import { Select } from "../src/components/select"
import { Switch } from "../src/components/switch"
import { Textarea } from "../src/components/textarea"

const meta = {
  title: "Components/Form",
  parameters: { controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const regions = [
  { value: "tokyo", label: "Tokyo" },
  { value: "taipei", label: "Taipei" },
  { value: "frankfurt", label: "Frankfurt" },
  { value: "virginia", label: "Virginia" },
]

export const Fields: Story = {
  render: () => {
    const [region, setRegion] = useState("tokyo")
    return (
      <div className="flex max-w-md flex-col gap-5">
        <Field>
          <FieldLabel>Service name</FieldLabel>
          <Input placeholder="my-service" />
          <FieldDescription>Lowercase letters, digits and dashes.</FieldDescription>
        </Field>
        <Field invalid>
          <FieldLabel>Port</FieldLabel>
          <Input mono defaultValue="99999" aria-invalid />
          <FieldError match>Ports go up to 65535.</FieldError>
        </Field>
        <Field>
          <FieldLabel>Start command</FieldLabel>
          <Textarea mono placeholder="npm start" />
        </Field>
        <div className="flex flex-col gap-2">
          <Input size="sm" placeholder="Small" />
          <Input size="lg" placeholder="Large" />
          <Input readOnly value="Read only" />
          <Input disabled value="Disabled" />
          <Input tone="success" readOnly value="example.com · ready" />
          <Input tone="warn" readOnly value="example.com · pending" />
          <Input tone="error" readOnly value="example.com · failed" />
          <Input tone="info" readOnly value="example.com · verifying" />
        </div>
        <Field>
          <FieldLabel>Region</FieldLabel>
          <Select items={regions} value={region} onValueChange={setRegion} />
        </Field>
        <Select
          size="sm"
          items={regions}
          value={region}
          onValueChange={setRegion}
          aria-label="Region"
        />
        <CopyInput value="zeabur deploy --project my-project" />
      </div>
    )
  },
}

export const ComboboxStory: Story = {
  name: "Combobox",
  render: () => (
    <div className="max-w-xs">
      <Combobox items={regions}>
        <ComboboxInput placeholder="Search a region" aria-label="Region" />
        <ComboboxContent>
          <ComboboxEmpty>No region matches.</ComboboxEmpty>
          <ComboboxList>
            {(item: (typeof regions)[number]) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

export const Choices: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-5">
      <div className="flex items-center gap-6">
        <Label>
          <Checkbox defaultChecked /> Checked
        </Label>
        <Label>
          <Checkbox /> Unchecked
        </Label>
        <Label>
          <Checkbox indeterminate /> Some
        </Label>
        <Label>
          <Checkbox disabled /> Disabled
        </Label>
      </div>
      <div className="flex items-center gap-6">
        <Label>
          <Switch defaultChecked /> On
        </Label>
        <Label>
          <Switch /> Off
        </Label>
        <Label>
          <Switch size="sm" defaultChecked /> Small
        </Label>
        <Label>
          <Switch disabled /> Disabled
        </Label>
      </div>
      <RadioGroup defaultValue="a" className="flex-row gap-6">
        <Label>
          <Radio value="a" /> Git
        </Label>
        <Label>
          <Radio value="b" /> Image
        </Label>
      </RadioGroup>
      <RadioGroup defaultValue="dedicated">
        <RadioOption
          value="shared"
          label="Shared cluster"
          description="Start in seconds, pay for what you use."
        />
        <RadioOption
          value="dedicated"
          label="Dedicated server"
          description="Your own machine, in the region you choose."
        />
      </RadioGroup>
    </div>
  ),
}
