"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function SteelWeightCalculator() {
  const [sectionType, setSectionType] = useState<"flat" | "round">("flat");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState<number | null>(null);

  const calculateWeight = () => {
    const steelDensity = 7850; // kg/m^3
    let volume: number;

    if (sectionType === "flat") {
      volume =
        (parseFloat(width) / 1000) *
        (parseFloat(height) / 1000) *
        (parseFloat(length) / 1000);
    } else {
      volume =
        Math.PI *
        Math.pow(parseFloat(diameter) / 2000, 2) *
        (parseFloat(length) / 1000);
    }

    const calculatedWeight = volume * steelDensity;
    setWeight(calculatedWeight);
  };

  return (
    <div className="w-full p-3 space-y-3 bg-card rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center">Steel Weight Calculator</h2>

      <div className="space-y-2">
        <Label htmlFor="section-type">Section Type</Label>
        <Select
          onValueChange={(value: "flat" | "round") => setSectionType(value)}
        >
          <SelectTrigger id="section-type" className="w-full">
            <SelectValue placeholder="Select section type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flat">Flat</SelectItem>
            <SelectItem value="round">Round</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {sectionType === "flat" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width (mm)</Label>
            <Input
              id="width"
              type="number"
              placeholder="Enter width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (mm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="diameter">Diameter (mm)</Label>
          <Input
            id="diameter"
            type="number"
            placeholder="Enter diameter"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="length">Length (mm)</Label>
        <Input
          id="length"
          type="number"
          placeholder="Enter length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      <Button onClick={calculateWeight} className="w-full">
        Calculate Weight
      </Button>

      {weight !== null && (
        <div className="text-center p-4 bg-secondary rounded-lg">
          <p className="text-lg font-semibold">
            Weight: {weight.toFixed(2)} kg
          </p>
        </div>
      )}
    </div>
  );
}
