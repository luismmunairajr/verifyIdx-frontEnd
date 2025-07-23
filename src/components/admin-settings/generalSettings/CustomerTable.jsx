
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
import { Trash2, Pencil } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import axiosInstance from "@/app/api/axios/axiosInstance";
import { toast } from "sonner";
import { TableRowSkeleton } from "./TableRowSkeleton";

export function CustomerTable() {
  const { t } = useLanguage();

  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit user modal states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Create user modal states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    sex: "",
    role: "",
    password: "",
  });

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/axios/admin-settings/generalsettings`);
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
    } catch (error) {
      toast.error(t("errorLoadingUsers"));
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setEditName(user.fullname);
    setEditRole(user.role);
    setEditEmail(user.email);
    setDialogOpen(true);
  };

  // Update user (only fullname editable)
  const updateUser = async () => {
    try {
      await axiosInstance.put(
        `/api/axios/admin-settings/generalsettings?email=${editEmail}`,
        {
          fullname: editName,
        }
      );

      toast.success(t("userUpdated"));
      setDialogOpen(false);
      await fetchUsers();
    } catch (error) {
      toast.error(t("errorUpdatingUser"));
    }
  };

  // Delete user
  const deleteUser = async (email) => {
    try {
      await axiosInstance.delete(`/api/axios/admin-settings/generalsettings?email=${email}`);
      toast.success(t("userDeleted"));
      await fetchUsers();
    } catch (error) {
      toast.error(t("errorDeletingUser"));
    }
  };

  // Create new user
  const createUser = async () => {
    try {
      // Validações básicas
      if (!newUser.fullname || !newUser.email || !newUser.password) {
        toast.error(t("pleaseFillRequiredFields"));
        return;
      }

      await axiosInstance.post(`/api/axios/admin-settings/generalsettings`, newUser);

      toast.success(t("userCreated"));
      setCreateDialogOpen(false);
      setNewUser({
        fullname: "",
        email: "",
        sex: "",
        role: "",
        password: "",
      });
      await fetchUsers();
    } catch (error) {
      toast.error(t("errorCreatingUser"));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      {/* Título e botão criar usuário */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{t("userList")}</h2>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>{t("addUser")}</Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>{t("registerUser")}</DialogTitle>
            </DialogHeader>

            <Input
              placeholder={t("fullname")}
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
            <Input
              placeholder={t("gender")}
              value={newUser.sex}
              onChange={(e) => setNewUser({ ...newUser, sex: e.target.value })}
            />
            <Input
              placeholder={t("role")}
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />

            <Button onClick={createUser}>{t("save")}</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabela */}
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
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(user)}
                  >
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

      {/* Edit user modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>{t("updateUser")}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder={t("fullname")}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Input
            placeholder={t("role")}
            value={editRole}
            disabled
          />
          <Button onClick={updateUser}>{t("save")}</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
