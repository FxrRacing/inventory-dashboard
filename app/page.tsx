import Image from "next/image";

import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
  Cross2Icon
} from "@radix-ui/react-icons"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"


import Link from "next/link";
import { formatDate, getMostRecentFiles } from "./inventory/[store]/page";




export default function Home() {
  const stores = [
    { title: "FXR Canada", description: " View and manage inventory adjustments made via the Inventory Management Service, including recent mutations, any errors and historical data.", content: "Card Content", footer: "Card Footer" , href: '/inventory/fxr-racing-ca',store: 'fxr-racing-ca' },
    { title: "WPG Outlet Store", description: "View and manage inventory adjustments made via the Inventory Management Service, including recent mutations, any errors and historical data.", content: "Card Content", footer: "Card Footer" , href: '/inventory/adrenalinewpg',store: 'adrenalinewpg' },
    { title: "SASK Outlet Store", description: "View and manage inventory adjustments made via the Inventory Management Service, including recent mutations, any errors and historical data.", content: "Card Content", footer: "Card Footer", href: '/inventory/adrenalinesask' ,store: 'adrenalinesask'},
    { title: "EDM Outlet store", description: "View and manage inventory adjustments made via the Inventory Management Service, including recent mutations, any errors and historical data.", content: "Card Content", footer: "Card Footer", href: '/inventory/adrenalineedm' ,store: 'adrenalineedm'},
  ];
  return (
   
  <main className="flex min-h-screen flex-col items-center p-4 sm:p-10">
    <div className=" flex ">
      <h1 className="text-xl font-bold mb-4">Inventory Dashboard</h1>
    </div>

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {stores.map((store, index) => (
        <Link key={index} href={store.href}>
          <CardwithData title={`${store.title}`} description={store.description} content="content" footer="footer" store="fxr-racing-ca"/>
        </Link>
      ))}
    </div>
  </main>
);

  
}



async function CardwithData( {title, description, content, footer, store}: {title: string, description: string, content: string, footer: string, store: string}) {
 
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const todayDayandMonth = formatDate(today);
 let storeOnline = false;
  const yesterdayDayandMonth = formatDate(yesterday);
  const newData = await getMostRecentFiles(
    store,
    todayDayandMonth,
    yesterdayDayandMonth
  );
  if (newData && newData.length > 0) {
    storeOnline = true; 
  }
  const storeCountToday = newData.length;
  return (
    <>
     <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </div>
        
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          
            {storeOnline ? <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-green-400 text-green-400" /> Online</div> : <div className="flex items-center">
            <Cross2Icon className="mr-1 h-3 w-3 fill-red-500 text-red-500" />Offline</div>}
          
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            {storeCountToday }
          </div>
         
        </div>
      </CardContent>
    </Card>
    </>
  )
}