import { Payment, columns, newColumns } from "./columns"
import { DataTable, NewDataTable } from "./data-table"
import { InventoryResponse, baseUrl } from "../inventory/[store]/page"
import { reverse } from "dns"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "webmail@email.com",
    }
    // ...
  ]
}
//fxr-racing-ca-inventory-update-29-01-2024T21-32-11.json
export default async function DemoPage() {
  const data = await getData()
  const todaysDate = new Date().toISOString().split('T')[0]
const reversedDate = todaysDate.split('-').reverse().join('-')
const dayandMonth = reversedDate.split('-').slice(0,2).join('-')

  const newData = await getMostRecentFiles('fxr-racing-ca', dayandMonth)

   
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <NewDataTable columns={newColumns} data={newData} />
    </div>
  )
}

async function getMostRecentFiles(store:string, dayAndMonth: string) {
    const url = `${baseUrl}/${store}-inventory-update-${dayAndMonth}`;
    try {
        const response = await fetch(url, {
            cache: "no-store",
            headers: {
                "Authorization": process.env.INVENTORY_API_TOKEN || "",
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(`Failed request with status: ${response.status}`);
        return data.objects || []; // look, no unnecessary nesting!
    } catch (e) {
        console.error("Error:", e);
        throw new Error('Failed to fetch or parse data'); // concise and to the point, unlike your original code
    }
}
