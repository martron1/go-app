"use client";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export default function VariableToggle({
  onActiveItemsChange,
}: {
  onActiveItemsChange: (activeItems: string[]) => void;
}) {
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    const newItems = activeItems.includes(value)
      ? activeItems.filter((item) => item !== value)
      : [...activeItems, value];
    setActiveItems(newItems);
    onActiveItemsChange(newItems);
  };

  return (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem
        className="w-[200px] data-[state=on]:bg-white bg-gray-100"
        value="configuration"
        onClick={() => handleToggle("configuration")}
      >
        Configuration
      </ToggleGroupItem>
      <ToggleGroupItem
        className="data-[state=on]:bg-white bg-gray-100"
        value="flags"
        onClick={() => handleToggle("flags")}
      >
        Feature flags
      </ToggleGroupItem>
      <ToggleGroupItem
        disabled
        className="data-[state=on]:bg-white bg-gray-100"
        value="secrets"
        onClick={() => handleToggle("secrets")}
      >
        Secrets
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
