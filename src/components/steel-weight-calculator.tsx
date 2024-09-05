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
  const [calculationType, setCalculationType] = useState<"weight" | "length">(
    "weight"
  );
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
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

    if (calculationType === "weight") {
      const calculatedWeight = volume * steelDensity;
      setResult(calculatedWeight);
    } else {
      const calculatedLength =
        (parseFloat(weight) / (steelDensity * volume)) * 1000;
      setResult(calculatedLength);
    }
  };

  return (
    <div className="w-full p-3 space-y-3 bg-card rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center">Steel Calculator</h2>

      <div className="space-y-2">
        <Label htmlFor="section-type">Section Type</Label>
        <Select
          onValueChange={(value: "flat" | "round") => setSectionType(value)}
          defaultValue="flat"
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
        <div className="grid grid-cols-2 gap-4">
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
        <Label htmlFor="calculation-type">What do you want to calculate?</Label>
        <Select
          onValueChange={(value: "weight" | "length") =>
            setCalculationType(value)
          }
          defaultValue="weight"
        >
          <SelectTrigger id="calculation-type" className="w-full">
            <SelectValue placeholder="Select calculation type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weight">Weight</SelectItem>
            <SelectItem value="length">Length</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {calculationType === "weight" ? (
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
      ) : (
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      )}

      <Button onClick={calculate} className="w-full">
        Calculate {calculationType === "weight" ? "Weight" : "Length"}
      </Button>

      {result !== null && (
        <div className="text-center p-4 bg-secondary rounded-lg">
          <p className="text-lg font-semibold">
            {calculationType === "weight" ? "Weight" : "Length"}:{" "}
            {result.toFixed(2)} {calculationType === "weight" ? "kg" : "mm"}
          </p>
        </div>
      )}
    </div>
  );
}
