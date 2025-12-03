import { ThemeToggle } from "@/components/ui/themeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        Home Page
      </div>
      <ThemeToggle />
    </div>
  );
}
