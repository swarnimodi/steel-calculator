"use client";

import { Calculator } from "@/components/calculator";
import { Toaster } from "@/components/ui/toaster";
import useToast from "@/hooks/useToast"; // Changed from import { useToast } to import useToast

export default function Home() {
  const { toast } = useToast();

  const showToast = (
    title: string,
    description: string,
    variant: "default" | "destructive"
  ) => {
    toast({
      title,
      description,
      variant,
    });
  };

  return (
    <>
      <main className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 sm:p-2">
        <div className="w-full max-w-md">
          <Calculator showToast={showToast} />
        </div>
      </main>
      <Toaster />
    </>
  );
}
