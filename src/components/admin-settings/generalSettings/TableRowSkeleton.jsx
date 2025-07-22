import { TableRow, TableCell } from "@/components/ui/table";

export function TableRowSkeleton() {
  return (
    <TableRow className="animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <TableCell key={index}>
          <div
            className="h-4 bg-muted rounded-md w-full"
            style={{
              width: `${80 + Math.random() * 20}%`, // Varia o tamanho das células
              height: "1rem",
              backgroundColor: "#e5e7eb", // Tailwind: bg-gray-200
            }}
          />
        </TableCell>
      ))}
    </TableRow>
  );
}
