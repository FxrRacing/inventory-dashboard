interface Props {
  params: {
    store: string;
    name: string;
  };
}
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

import { CalendarIcon } from "lucide-react";
import { baseUrl } from "../../page";
import { NewDataTable } from "@/app/payments/data-table";
import { transactionColumns } from "@/app/payments/columns";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"




export interface inventoryFile {
  transaction: {
    index: number;
    inventoryItemId: string[];
    displayName: string;
    productID: string;
    variantID: string;
    variantUrl: string;
    urlReferences: string;
  }[];
  errors: {
    field?: string;
    message?: string;
  }[];
}

function fileNameToTitle(fileName: string) {
  let title = fileName.split("-");
  let formattedTitle = [];

  for (let part of title) {
    if (!/^\d/.test(part)) {
      part = part.charAt(0).toUpperCase() + part.slice(1);
      formattedTitle.push(part);
    }
  }
  return formattedTitle.join(" ");
}

export default async function batches({ params: { store, name } }: Props) {
  const { data, headers } = await getMatchingFile(store, name);
  const titleString = fileNameToTitle(name);

  const errorMessages = data.errors.map((error) => error.message).join(", ");
  const firstError = errorMessages.split(",")[0];
  const errorFields = data.errors.map((error) => error.field).join(", ");
  const errorCount = data.errors.length;

  const date = headers?.uploadDate;
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  
  
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        {titleString+'d'} at {formattedDate}{" "}
      </h1>
      <div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Count</CardTitle>
              <CardDescription>
                {" "}
                Total number of variants in this batch{" "}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className=" text-xl font-bold mb-4">
                {headers?.customMetadata.productCount}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mutation Errors</CardTitle>
              <CardDescription>
                {errorCount > 1 ? (
                  "Errors in the mutation file"
                ) : (
                  <span className="flex ">
                    {" "}
                    No errors in this mutation{" "}
                    <CheckBadgeIcon className=" ms-3 h-5 w-5 text-green-500" />
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{firstError}</p>
            </CardContent>
            <CardFooter>
              <ErrorHoverCard
                errorMessages={errorMessages}
                errorFields={errorFields}
                errorCount={errorCount}
              /> 
            </CardFooter>
          </Card>
        </div>
        <section className="mt-4">
         
           
          <NewDataTable columns={transactionColumns} data={data.transaction} />
        </section>
      </div>
    </div>
  );
}

function ErrorHoverCard({
  errorMessages,
  errorFields,
  errorCount,
}: {
  errorMessages: string;
  errorFields: string;
  errorCount: number;
}) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@View Errors</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@errors</h4>
              <p className="text-sm">
                {errorMessages}
                --
                {errorFields}
              </p>
              <div className="flex items-center pt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  {errorCount} errors
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

interface customMetadata {
  region: string;
  productCount: string;
}

async function getMatchingFile(store: string, fileName: string) {
  //url pattern to get file  inventory/{store}/{fileName}
  const response = await getFileFromBucket(store, fileName); // fetchFile from earlier, remember?
  const data = (await parseResponse(response)) as inventoryFile; // parseJsonResponse too. keep up.

  const Metadata = response.headers.get("customMetadata");
  const uploadDate = response.headers.get("uploaded") ?? new Date();

  const customMetadata = JSON.parse(Metadata ?? "{}") as customMetadata;
  return {
    data, // here's your precious data
    headers: { customMetadata, uploadDate }, // and the headers, happy now?
  };
}
async function parseResponse(response: Response) {
  try {
    return await response.json();
  } catch (error) {
    console.error("Parsing error:", error);
    throw new Error("Failed to parse JSON"); // still generic, but it'll do
  }
}

async function getFileFromBucket(store: string, fileName: string) {
  try {
    const response = await fetch(`${baseUrl}/${store}/${fileName}`, {
      cache: "force-cache",
      headers: {
        Authorization: process.env.INVENTORY_API_TOKEN ?? "",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // rethrow because we're not animals
  }
}
