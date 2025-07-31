
import { Skeleton } from "@/components/ui/skeleton";

export default function TemplatePageSkeleton() {
  return (
    <div className="flex items-center justify-center gap-2 w-full" style={{ height: "85vh" }}>
      <div className="border-2 h-full w-1/4 rounded-xl shadow-xl p-4 flex flex-col gap-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div>
          <Skeleton className="h-5 w-24 mb-2" />
          <div className="flex gap-2 flex-wrap">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-md" />
            ))}
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="h-full overflow-hidden w-2/3 bg-zinc-100 dark:bg-zinc-950 border-2 rounded-xl flex items-center justify-center">
        <Skeleton className="w-[95%] h-[90%] rounded-md" />
      </div>
    </div>
  );
}
