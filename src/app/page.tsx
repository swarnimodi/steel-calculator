import { SteelWeightCalculator } from "@/components/steel-weight-calculator";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 sm:p-2">
      <div className="w-full max-w-md">
        <SteelWeightCalculator />
      </div>
    </main>
  );
}
