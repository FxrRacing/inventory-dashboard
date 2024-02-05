
import { Skeleton } from "@/components/ui/skeleton"

export default async function Loading() {

return(
    <div className="m-4">
    <h1 className="text-xl font-bold mb-4">
      Loading...
    </h1>
    
      <div className="flex justify-center mt-5">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        {/* This centers the SkeletonCard horizontally */}
      </div>
      
    </div>
)
}

export function SkeletonCard() {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[850px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }