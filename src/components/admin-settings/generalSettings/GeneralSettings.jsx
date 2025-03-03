import { CustomerTable } from "./CustomerTable"

export default function GeneralSettings() {
  return (
    <div className="container mx-auto py-10 2xl:w-[1000px]">
      <h1 className="text-3xl font-bold mb-6">All users</h1>
      <CustomerTable />
    </div>
  )
}

