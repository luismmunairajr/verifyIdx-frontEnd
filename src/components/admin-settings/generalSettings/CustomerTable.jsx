"use client";

import { useCallback, useEffect, useState } from "react";
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
import { Trash2, Pencil } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import axiosInstance from "@/app/api/axios/axiosInstance";
import { toast } from "sonner";
import { TableRowSkeleton } from "./TableRowSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomerTable() {
  const { t } = useLanguage();

  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    sex: "M",
    role: "ADMIN",
    password: "",
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/axios/admin-settings/generalsettings");
      const users = response.data || [];

      const formatted = users.map((user, idx) => ({
        id: user.id || `${idx + 1}`,
        fullname: user.fullname || "--",
        role: user.role || "--",
        email: user.email || "--",
        sex: user.sex || "--",
        status: "active",
      }));

      setCustomerList(formatted);
    } catch {
      toast.error(t("errorLoadingUsers"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  const handleEdit = (user) => {
    setEditName(user.fullname);
    setEditRole(user.role);
    setEditEmail(user.email);
    setDialogOpen(true);
  };

  const updateUser = async () => {
    try {
      await axiosInstance.put(`/api/axios/admin-settings/generalsettings?email=${editEmail}`, {
        fullname: editName,
      });

      toast.success(t("userUpdated"));
      setDialogOpen(false);
      fetchUsers();
    } catch {
      toast.error(t("errorUpdatingUser"));
    }
  };

  const deleteUser = async (email) => {
    try {
      await axiosInstance.delete(`/api/axios/admin-settings/generalsettings?email=${email}`);
      toast.success(t("userDeleted"));
      fetchUsers();
    } catch {
      toast.error(t("errorDeletingUser"));
    }
  };

  const createUser = async () => {
    const validGenders = ["M", "F"];
    const validRoles = ["ADMIN", "ANALIST", "MANAGER"];

    if (!newUser.fullname || !newUser.email || !newUser.password) {
      toast.error(t("pleaseFillRequiredFields"));
      return;
    }

    if (!validGenders.includes(newUser.sex)) {
      toast.error(t("invalidGender"));
      return;
    }

    if (!validRoles.includes(newUser.role)) {
      toast.error(t("invalidRole"));
      return;
    }

    try {
      await axiosInstance.post("/api/axios/admin-settings/generalsettings", newUser);
      toast.success(t("userCreated"));
      setCreateDialogOpen(false);
      setNewUser({ fullname: "", email: "", sex: "M", role: "ADMIN", password: "" });
      fetchUsers();
    } catch {
      toast.error(t("errorCreatingUser"));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return (
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
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{t("userList")}</h2>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>{t("addUser")}</Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>{t("createUser")}</DialogTitle>
            </DialogHeader>
            <Input
              placeholder={t("name")}
              value={newUser.fullname}
              onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })}
            />
            <Input
              placeholder={t("email")}
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Input
              placeholder={t("password")}
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <Select
              value={newUser.sex}
              onValueChange={(value) => setNewUser({ ...newUser, sex: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("gender")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="F">F</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={newUser.role}
              onValueChange={(value) => setNewUser({ ...newUser, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("role")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="ANALIST">ANALIST</SelectItem>
                <SelectItem value="MANAGER">MANAGER</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={createUser}>{t("save")}</Button>
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
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(user)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>{t("updateUser")}</DialogTitle>
          </DialogHeader>
          <Input placeholder={t("fullname")} value={editName} onChange={(e) => setEditName(e.target.value)} />
          <Input placeholder={t("role")} value={editRole} disabled />
          <Button onClick={updateUser}>{t("save")}</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
