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
import { Loader2, Trash2, Pencil } from "lucide-react";
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
  const [editMode, setEditMode] = useState(false);
  const [editEmail, setEditEmail] = useState("");
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
      const tenantId = session?.user?.tenantId;
      const response = await axiosInstance.get(`tenant/users?tenantId=${tenantId}`);
      const users = response.data.users || [];

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

  const handleSubmit = async () => {
    const { fullname, sex, email, password, role } = form;
    const roleMap = {
      admin: "ADMIN",
      gestor: "MANAGER",
      outro: "ANALIST",
    };
    const apiRole = roleMap[role.toLowerCase()];

    if (
      !fullname.trim() ||
      !email.trim() ||
      (!editMode && !password.trim()) ||
      !["M", "F"].includes(sex.toUpperCase()) ||
      !apiRole
    ) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    try {
      const tenantId = session?.user?.tenantId;
      if (!tenantId) {
        toast.error(t("missingTenant"));
        return;
      }

      if (editMode) {
        await axiosInstance.put(`/tenant/users?email=${editEmail}`, {
          fullname,
          sex,
          role: apiRole,
          tenantId,
        });
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await axiosInstance.post("/tenant/auth/register", {
          ...form,
          role: apiRole,
          tenantId,
        });
        toast.success(t("userCreated"));
      }

      setForm({ fullname: "", sex: "", email: "", password: "", role: "" });
      setDialogOpen(false);
      setEditMode(false);
      setEditEmail("");
      await fetchUsers();
    } catch (error) {
    
         const status = error?.response?.status;
  const serverMessage = error?.response?.data?.message || error?.message || "Erro desconhecido";

  console.error("❌ Erro ao registrar/atualizar:", {
    status,
    data: error?.response?.data,
    message: serverMessage,
  });

  if (status === 204) {
    toast.success("Usuário atualizado com sucesso!");
  } else {
    toast.error(editMode ? `Erro ao atualizar usuário: ${serverMessage}` : t("errorCreatingUser"));
  }
}
  };

  const handleEdit = (user) => {
    setForm({
      fullname: user.fullname,
      sex: user.sex,
      email: user.email,
      password: "",
      role: user.role.toLowerCase(),
    });
    setEditMode(true);
    setEditEmail(user.email);
    setDialogOpen(true);
  };

  const deleteUser = async (email) => {
    try {
      await axiosInstance.delete(`/tenant/users?email=${email}`);
      toast.success(t("userDeleted"));
      await fetchUsers();
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
            <Button
              onClick={() => {
                setDialogOpen(true);
                setEditMode(false);
                setForm({ fullname: "", sex: "", email: "", password: "", role: "" });
              }}
            >
              {t("addUser")}
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {editMode ? t("updateUser") : t("registerUser")}
              </DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Fullname"
              value={form.fullname}
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            />
            <Input
              placeholder="Email"
              disabled={editMode}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {!editMode && (
              <Input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            )}
            <select
              value={form.sex}
              onChange={(e) => setForm({ ...form, sex: e.target.value })}
              className="border rounded p-2 w-full"
            >
              <option value="">Selecionar Gênero</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="border rounded p-2 w-full"
            >
              <option value="">Selecionar Função</option>
              <option value="admin">Administrador</option>
              <option value="gestor">Gestor</option>
              <option value="outro">Analista</option>
            </select>
            <Button onClick={handleSubmit}>{t("save")}</Button>
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
    </div>
  );
}
