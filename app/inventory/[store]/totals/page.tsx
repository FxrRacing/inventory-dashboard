import { AltTable } from "@/app/payments/data-table";
import { InventoryResponse, baseUrl, groupFilesByHour } from "../page";
import Link from "next/link";
import { newColumns } from "@/app/payments/columns";
import { Button } from "@/components/ui/button";

interface Props {
  params: { store: string };
}

type File = {
  uploaded: string;
  key: string;
};

export default async function Totals({ params: { store } }: Props) {


  const files = await getMatchingFiles(store);
  
  const groupedData = groupFilesByHour(files.data.objects);
  
  return (
    <>
      <div className="m-4">
        <h1 className="text-xl font-bold mb-4">
          All Inventory Mutations at {store}
        </h1>
        {groupedData.map((group, index) => (
          
  <div key={`${group.timeRange}-${index}`} className="mb-5"> 
    <h2 className="text-lg font-bold mb-2">
      {group.timeRange.replace('-', ' to ')} batch  - {group.count} mutation(s)
    </h2>
    {
      group.files.length > 0 ? <AltTable columns={newColumns} data={group.files} /> : <p>No mutations in this batch</p>
    }
    
  </div>
))}

      </div>
    </>
  );
}


export async function getMatchingFiles(store: string, cursor:string="") {
  try {
   
    const request = await fetch(`${baseUrl}/records/${store}`, {
      cache: "no-store",
      headers: {
        Authorization: process.env.INVENTORY_API_TOKEN ?? "",
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      throw new Error(
        `request to internal api failed check logs! status: ${request.status}`
      );
    }
    try {
      const data = await request.json();
     //console.log(data.objects.length);
      return {data, cursor};
    } catch (e) {
      console.error("Parsing error:", e);

      throw new Error("Failed to parse JSON");
    }
  } catch (e) {
    console.error("Fetch error:", e);
    throw e;
  }
}
