
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: number[];
  onChange: (value: number[]) => void;
}

const PriceRangeFilter = ({ priceRange, onChange }: PriceRangeFilterProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Price Range</h3>
      <div className="space-y-4">
        <Slider
          value={priceRange}
          min={0}
          max={100}
          step={5}
          onValueChange={onChange}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0]}/hr</span>
          <span>${priceRange[1]}/hr</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
