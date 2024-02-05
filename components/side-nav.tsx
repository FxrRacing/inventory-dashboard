import Link from "next/link";
import NavLinks from "./nav-links";
import PowerIcon from "@heroicons/react/24/outline/PowerIcon";

export default function SideNav() {
    return (
      <div className="flex h-full flex-col px-3 py-4 md:px-2  border-r bg-white border-gray-200 shadow-xl rounded-2xl">
        <Link
          className="mb-2 flex h-20 items-end justify-start rounded-md bg-orange-500 p-4 md:h-40"
          href="/"
        >
          <div className=" w-32 text-slate-100 md:w-40">
            <h1 className="mt-7 text-xl font-bold">FXR Racing </h1>
            <p className="text-sm">Inventory Management</p>
          </div>
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-white md:block"></div>
         
        </div>
      </div>
    );
  }