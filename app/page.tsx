import Image from "next/image";
import Card from "../components/card";
const stores = [
  {
    name: 'CA',
    href: '/inventory/fxr-racing-ca',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg',
    imageAlt: 'Canada',
  },
    { name: 'WPG', 
    href: '/inventory/adrenalinewpg', 
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Manitoba.svg',
   },
    {
      name: 'EDM',
      href: '/inventory/adrenalineedm',
     
    },
    {
      name: 'SASK',
      href: '/inventory/adrenalinesask',
      
    }

]


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Inventory Dashboard</h1>
      </div>
   
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
    <Card />
    <Card />
    <Card />
    <Card />
    </div>
      
    </main>
  );
}
