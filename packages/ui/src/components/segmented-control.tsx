"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

interface Item {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  items: Array<string | Item>;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

function normalize(items: Array<string | Item>): Item[] {
  return items.map((item) => {
    if (typeof item === "string") return { value: item, label: item };
    return item;
  });
}

export const SegmentedControl = React.forwardRef<
  React.ElementRef<typeof ToggleGroup>,
  SegmentedControlProps
>(function SegmentedControl(props, ref) {
  const { items, className, ...rest } = props;
  const data = React.useMemo(() => normalize(items), [items]);

  return (
    <ToggleGroup
      ref={ref}
      type="single"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...rest}
    >
      {data.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm"
        >
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
});