import { InventoryResponse, baseUrl } from "../page";
import Link from "next/link";
interface Props {
    params: { store: string };
  }

  type File = {
    uploaded: string;
    key: string;
    // Add other necessary properties here
  };
  
export default async function Totals( { params: { store } }: Props){
    const files = await getMatchingFiles(store);
    const groupedFiles = files.objects.reduce((acc: { [key: string]: File[] }, file: File) => {
        // Welcome to one-liners, they save you from writing novels
        const hourKey = new Date(file.uploaded).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          hour12: false,
        });
    
        // Initialize groups like a pro, not like someone just discovered arrays
        (acc[hourKey] = acc[hourKey] || []).push(file);
        return acc;
      }, {});
    
      // Sort like you mean it, outside the loop
      Object.values(groupedFiles).forEach((group: File[]) =>
  group.sort((a, b) => new Date(a.uploaded).getTime() - new Date(b.uploaded).getTime())
);
    return(
        <>
        <div className="m-4">
        <h1 className="text-xl font-bold mb-4">
          All Inventory Mutations at {store}
        </h1>
        
        {
  Object.entries(groupedFiles).map(([hour, items]) => (
    <div key={hour} className="border border-gray-200 shadow-lg rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">
        Uploaded at: {hour}, batch size: {items.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                batch name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Uploaded
              </th>
              {/* Add more headers based on your File interface */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, index) => (
               
              <tr key={index} className="odd:bg-gray-50">
                 <Link href={`/inventory/${store}/batches/${item.key}`} key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item.key}
                </td>
                </Link>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.uploaded}
                </td>
                {/* Add more cells based on your File interface */}
              </tr>
             
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ))
}
      </div>
        </>
    )
}


// Implement getServerSideProps for server-side data fetching
async function getSortedFiles(store: string) {
  // Extract store from the URL parameters
  

  // Perform your data fetching logic here
  const files = await getMatchingFiles(store);

  // Process files to group them by hour, similar to your original logic
  const groupedFiles = files.objects.reduce((acc: { [key: string]: File[] }, file: File) => {
    const hourKey = new Date(file.uploaded).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
    });

    (acc[hourKey] = acc[hourKey] || []).push(file);
    return acc;
  }, {});

  // Sort the groups if needed

  // Return the groupedFiles object as a prop to the component
  return {
    props: {
      groupedFiles,
      store,
    },
  };
};



async function getMatchingFiles(store: string): Promise<InventoryResponse> {
    try {
      //console.log(`${baseUrl}/${store}`)
      const request = await fetch(`${baseUrl}/${store}?limit=1000`, {
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
        return data as InventoryResponse;
      } catch (e) {
        
        console.error("Parsing error:", e);
       
        throw new Error("Failed to parse JSON");
      }
    } catch (e) {
     
      console.error("Fetch error:", e);
      throw e; 
    }
  }
  