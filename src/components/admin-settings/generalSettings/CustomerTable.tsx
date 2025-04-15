"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, MoreHorizontal, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language/language-provider"


// Sample data
const customers = [
  {
    id: "1",
    name: "John Smith",
    branch: "Microsoft",
    roll: "Manager",
    email: "john.smith@example.com",
    country: "United States",
    status: "active",
  },
  {
    id: "2",
    name: "Maria Garcia",
    branch: "Google",
    roll: "Supervisor",
    email: "maria.garcia@example.com",
    country: "Spain",
    status: "inactive",
  },
  {
    id: "3",
    name: "Hiroshi Tanaka",
    branch: "Amazon",
    roll: "Sales Representative",
    email: "h.tanaka@example.com",
    country: "Japan",
    status: "pending",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    branch: "Netflix",
    roll: "Director",
    email: "s.johnson@example.com",
    country: "United Kingdom",
    status: "active",
  },
  {
    id: "5",
    name: "Carlos Mendoza",
    branch: "BCX",
    roll: "Analyst",
    email: "c.mendoza@example.com",
    country: "Mexico",
    status: "active",
  },
]

export function CustomerTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customerList, setCustomerList] = useState(customers)
  const [newCustomer, setNewCustomer] = useState({
    id: "",
    name: "",
    branch: "",
    roll: "",
    email: "",
    country: "",
    status: "active",
  })
  const itemsPerPage = 5

  // Handle adding a new customer
  const handleAddCustomer = () => {
    const customer = {
      ...newCustomer,
      id: (customerList.length + 1).toString(),
    }
    setCustomerList([...customerList, customer])
    setNewCustomer({
      id: "",
      name: "",
      branch: "",
      roll: "",
      email: "",
      country: "",
      status: "active",
    })
    setIsModalOpen(false)
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCustomer({ ...newCustomer, [name]: value })
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewCustomer({ ...newCustomer, [name]: value })
  }

  // Filter customers based on search term
  const filteredCustomers = customerList.filter((customer) =>
    Object.values(customer).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage)

  // Status badge renderer
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">{t("active")}</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchUsers")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>{t("addUser")}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("addUser")}</DialogTitle>
              <DialogDescription>{t("addUserSubtitle")}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="branch" className="text-right">
                  {t("branch")}
                </Label>
                <Input
                  id="branch"
                  name="branch"
                  value={newCustomer.branch}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roll" className="text-right">
                  {t("branch")}
                </Label>
                <Input
                  id="roll"
                  name="roll"
                  value={newCustomer.roll}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right">
                  {t("country")}
                </Label>
                <Input
                  id="country"
                  name="country"
                  value={newCustomer.country}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  {t("status")}
                </Label>
                <Select value={newCustomer.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t("active")}</SelectItem>
                    <SelectItem value="inactive">{t("inactive")}</SelectItem>
                    <SelectItem value="pending">{t("pending")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCustomer}>
                {t("addUser")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("userName")}</TableHead>
              <TableHead>{t("branch")}</TableHead>
              <TableHead>{t("roll")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("country")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.branch}</TableCell>
                  <TableCell>{customer.roll}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.country}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>{t("viewDetails")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("editUser")}</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">{t("delete")}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  {t("noResultsFound")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {t("showing")} {startIndex + 1} {t("to")} {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} {t("of")} {" "}
          {filteredCustomers.length} {t("entries")}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            {t("page")} {currentPage} {t("of")} {totalPages || 1}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

