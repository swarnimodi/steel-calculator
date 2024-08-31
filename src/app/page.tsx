import { SteelWeightCalculator } from "@/components/steel-weight-calculator";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Steel Weight Calculator
      </h1>
      <SteelWeightCalculator />
    </main>
  );
}
