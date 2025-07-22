export default function PersonVerificationsSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-950 flex items-start justify-start rounded-lg space-x-2 w-full p-1 overflow-hidden">
      {/* Foto (círculo) - skeleton-lg para borda totalmente redonda e animação visível */}
      <div className="w-16 h-16 skeleton skeleton-lg" />

      <div className="flex flex-col space-y-2 w-full mt-1">
        {/* Linha maior */}
        <div className="h-4 w-32 skeleton skeleton-md" />
        {/* Linha menor */}
        <div className="h-3 w-20 skeleton skeleton-sm" />
      </div>
    </div>
  );
}
