import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex items-center animate-pulse space-x-2">
      <ArrowLeftCircle className="h-12 w-12" />
      <h1 className="font-bold"> Get started with creating a New document </h1>
    </main>
  );
}
