"use client";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Pencil } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import axiosInstance from "@/app/api/axios/axiosInstance_midleware";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { TableRowSkeleton } from "./TableRowSkeleton";

export function CustomerTable() {
  const { t } = useLanguage();
  const { data: session } = useSession();

  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const tenantId = session?.user?.tenantId;
      const response = await axiosInstance.get(`tenant/users?tenantId=${tenantId}`);
      const users = response.data.users || [];
      setCustomerList(users.map((u, idx) => ({
        id: u.id ?? `${idx+1}`,
        fullname: u.fullname ?? "--",
        role: u.role ?? "--",
        email: u.email ?? "--",
        sex: u.sex ?? "--",
        status: "active"
      })));
    } catch {
      toast.error(t("errorLoadingUsers"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [session]);

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>{/* ... cabeçalho ... */}</TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t("userList")}</h2>
      {/* Diálogo editar */}
      <div className="rounded-md border">
        <Table>
          {/* Cabeçalho */}
          <TableBody>
            {customerList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.sex}</TableCell>
                <TableCell>
                  <span className="text-green-700 bg-green-200 px-2 py-1 rounded-full text-xs">
                    {t(user.status)}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(user)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => deleteUser(user.email)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
