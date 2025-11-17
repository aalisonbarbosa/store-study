import { Bell, Store } from "lucide-react";
import Title from "./title";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white h-20 px-4 border-b border-stone-200">
      <Title />

      <div className="flex items-center gap-4">
        <button className="cursor-pointer">
          <Bell />
        </button>
        <button className="bg-blue-200 text-blue-700 rounded-full p-2 cursor-pointer">
          <Store />
        </button>
      </div>
    </header>
  );
}
