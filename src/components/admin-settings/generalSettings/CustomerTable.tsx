"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchKeycloakUsers } from "@/lib/services/fetchKeycloakUsers"

export function CustomerTable() {
  const [customerList, setCustomerList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchKeycloakUsers()
      .then((users) => {
        const formatted = users.map((user: any, idx: number) => ({
          id: user.id || `${idx + 1}`,
          name: user.firstName || user.username || "N/A",
          branch: "N/A",
          roll: "N/A",
          email: user.email || "N/A",
          country: "N/A",
          status: "active",
        }))
        setCustomerList(formatted)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Carregando usuários...</p>

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>País</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customerList.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.branch}</TableCell>
              <TableCell>{customer.roll}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.country}</TableCell>
              <TableCell>{customer.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
