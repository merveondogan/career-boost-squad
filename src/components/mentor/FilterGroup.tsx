
import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterGroupProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggleItem: (item: string) => void;
}

const FilterGroup = memo(({ title, items, selectedItems, onToggleItem }: FilterGroupProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center">
            <Checkbox
              id={`${title.toLowerCase()}-${item}`}
              checked={selectedItems.includes(item)}
              onCheckedChange={() => onToggleItem(item)}
            />
            <Label
              htmlFor={`${title.toLowerCase()}-${item}`}
              className="ml-2 text-sm cursor-pointer"
            >
              {item}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
});

FilterGroup.displayName = "FilterGroup";

export default FilterGroup;
