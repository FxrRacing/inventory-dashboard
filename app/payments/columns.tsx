"use client"

import { ColumnDef } from "@tanstack/react-table"
import { InventoryItem, InventoryResponse } from "../inventory/[store]/page"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { inventoryFile } from "../inventory/[store]/batches/[name]/page"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
   
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    

  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
type customMetadata={
    region:string,
    productCount:string,
    errors:string
}
export  type File ={
    customMetadata:{
            region:string,
            productCount:string,
            errors:string
    },
    httpMetadata:{
        contentType:string
    },
    uploaded:string,
    checksums:{
        md5:string
    },
    httpEtag:string,
    etag:string,
    size:number,
    version:string,
    key:string
}

// export interface inventoryFile {
//   transaction: {
//     displayName: string;
//     productId: string;
//     variantId: string;
//     urlReference: string;
//   }[];
//   errors: {
//     field?: string;
//     message?: string;
//   }[];
// }
export interface Transaction{
    index: number;
    inventoryItemId: string[];
    displayName: string;
    productID: string;
    variantID: string;
    variantUrl: string;
    urlReferences: string;
}
export interface Error{
    field?: string[];
    message?: string;
}







// Let's assume you have a magical function that merges transactions and errors


export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "index",
    header: "Index",
    cell: ({ row }) => {
      const index: number = row.getValue("index");
      if (!index && typeof index !== "number") {
        return "N/A";
      }
      return index;
    }

  },
  {
    accessorKey: "displayName",
    header: "Item Sku",
    
  },
  {
    accessorKey: "productID",
    header: "Product ID",
    cell: ({ row }) => {
      const displayName: string = row.getValue("productID");
      return displayName;
    },
  },
  {
    accessorKey: "variantID",
    header: "Variant ID",
    cell: ({ row }) => {
      const variantUrl: string = row.getValue("variantUrl")
      const variantID: string = row.getValue("variantID");
     
        return (
          variantID
        );
      }
      
     
    
  },
  {
    accessorKey: "variantUrl",
    header: "Variant URL",
    cell: ({ row }) => {
      const variantUrl: string = row.getValue("variantUrl");
      return (
        <a target="_blank" rel="noopener noreferrer" href={`${variantUrl}`} className=" flex items-center text-blue-600 hover:underline text-base">View Variant <ArrowUpRightIcon className="h-4 w-4" /></a>
      )
  }
},

  {
    accessorKey: "urlReferences",
    header: "URL Reference",
    cell: ({ row }) => {
      const url: string = row.getValue("urlReferences");
      return (
        <a target="_blank" rel="noopener noreferrer" href={`${url}`} className=" flex items-center text-blue-600 hover:underline text-base">View in shopify <ArrowUpRightIcon className="h-4 w-4" /></a>)
    },

  }

]


export const newColumns: ColumnDef<File>[] = [
    {
        accessorKey: "key",
        header: "Batch Name",
        cell: ({row}) => {
            const name: string = row.getValue("key");
            return name.split('T')[0];

        }
        },
       
        {
            accessorKey: "uploaded",
            header: ({ column }) => {
                return (
                    <Button
                      variant="ghost"
                      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Uploaded
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("uploaded"));
                // use the same format as the client
                const formattedDate = date.toLocaleString('en-US', {
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit', 
                    hour12: true 
                });
               
                return formattedDate;
            },
        },
        //use clsx next time
        {
          accessorKey: "customMetadata",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Status
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            const customMetadata: any = row.getValue("customMetadata");
            const errors = customMetadata?.errors;
        
            if (errors > 1) {
              return (
                <div className="flex justify-center">
                  <Badge variant="destructive">{errors} Errors</Badge>
                </div>
              );
            }
        
            return (
              <div className="flex justify-center">
                <Badge variant="success">No errors</Badge>
              </div>
            );
          },
          sortingFn: (rowA, rowB, columnId) => {
            const a = rowA.getValue(columnId)?.errors || 0;
            const b = rowB.getValue(columnId)?.errors || 0;
            return a - b;
          }
        }
        ,
        {
            accessorKey: "customMetadata,name",
            header: "",
            cell: ({row}) => {
              const region: any = row.getValue("customMetadata");
             
             
              const name: string = row.getValue("key");
              if (!region) {
                  <Link href={`inventory/${name}`} className=" flex items-center text-blue-600 hover:underline text-base">View <ArrowUpRightIcon className="h-4 w-4" /></Link>
              }
             
               const regionMap = {
                "ca" : "fxr-racing-ca",
                "us" : "fxr-racing-com",
                "wpg" : "adrenalinewpg",
                'edm' : 'adrenalineedm',
                'sask' : 'adrenalinesask',

               }
               for (const [key, value] of Object.entries(regionMap)) {
                   if (region.region === key) {
                    return (
                        <Link href={`${value}/batches/${name}`} className=" flex items-center text-blue-600 hover:underline text-base">View <ArrowUpRightIcon className="h-4 w-4" /></Link>
                    );
                   }
                  }
                
    
            }
            },

    ]

    ///inventory/${store}/batches/${item.key}