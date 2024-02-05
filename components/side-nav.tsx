import Link from "next/link";
import NavLinks from "./nav-links";
import PowerIcon from "@heroicons/react/24/outline/PowerIcon";

export default function SideNav() {
    return (
      <div className="flex h-full flex-col px-3 py-4 border-r bg-white border-gray-200 shadow-xl rounded-2xl">
      <Link
        className="mb-2 flex items-end justify-start rounded-md bg-orange-500 p-2 h-16 md:h-40"
        href="/"
      >
        <div className="w-24 md:w-40 text-slate-100">
          <h1 className="text-lg md:text-xl font-bold">FXR Racing</h1>
          <p className="text-xs md:text-sm">Inventory Management</p>
        </div>
      </Link>
      <div className="flex grow flex-col justify-between md:space-y-2">
        <NavLinks />
        <div className="h-auto w-full grow rounded-md bg-white"></div>
      </div>
    </div>
    );
  }