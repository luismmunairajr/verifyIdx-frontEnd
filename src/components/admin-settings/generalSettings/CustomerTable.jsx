"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import axiosInstance from "@/app/api/axios/axiosInstance_midleware";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export function CustomerTable() {
  const { t } = useLanguage();
  const { data: session } = useSession();

  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    sex: "",
    email: "",
    password: "",
    role: "",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/tenants/users");
      const users = response.data;

      const formatted = users.map((user, idx) => ({
        id: user.id || `${idx + 1}`,
        fullname: user.fullname || "--",
        role: user.role || "--",
        email: user.email || "--",
        sex: user.sex || "--",
        status: "active",
      }));

      setCustomerList(formatted);
    } catch (error) {
      toast.error(t("errorLoadingUsers"));
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    try {
      const tenantId = session?.user?.tenantId;
      if (!tenantId) {
        toast.error(t("missingTenant"));
        return;
      }

      await axiosInstance.post("/tenant/auth/register", {
        ...form,
        tenantId,
      });

      toast.success(t("userCreated"));
      setForm({
        fullname: "",
        sex: "",
        email: "",
        password: "",
        role: "",
      });
      setDialogOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error(t("errorCreatingUser"));
    }
  };

  const deleteUser = async (email) => {
    try {
      await axiosInstance.delete(`/tenants/users/${email}`);
      toast.success(t("userDeleted"));
      fetchUsers();
    } catch (error) {
      toast.error(t("errorDeletingUser"));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-gray-400 w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{t("userList")}</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>{t("addUser")}</Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>{t("registerUser")}</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Fullname"
              value={form.fullname}
              onChange={(e) =>
                setForm({ ...form, fullname: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <Input
              placeholder="Gender (M/F)"
              value={form.sex}
              onChange={(e) =>
                setForm({ ...form, sex: e.target.value })
              }
            />
            <Input
              placeholder="Role"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            />
            <Button onClick={registerUser}>{t("save")}</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("role")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("gender")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
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
                <TableCell>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteUser(user.email)}
                  >
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
