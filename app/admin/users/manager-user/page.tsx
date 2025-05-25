"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Fingerprint, UserRound, Mail, KeyRound } from "lucide-react";
import { PermissionsModulesList } from "@/components/shared/users/modules--permissions-list/page";
import { BookCheck, UsersRound, School, GraduationCap, FlaskConical } from "lucide-react";
import { toast } from "react-hot-toast";

const userData = {
  userName: "Lilinha da Silva",
  userType: "Coordenador",
};


const permissions = [
  {
    module: "Gerenciar Reservas",
    icon: <BookCheck size={22} strokeWidth={2} className="text-foreground/70"/>,
    actions: [
      {
        title: "Ver solicitações",
        description: "Visualizar as solicitações e histórico de reservas de laboratório."
      },
      {
        title: "Editar reservas",
        description: "Aprovar, reprovar ou cancelar solicitações de reserva de laboratório."
      }
    ]
  },
  {
    module: "Laboratórios",
    icon: <FlaskConical size={20} strokeWidth={2} className="text-foreground/70" />,
    actions: [
      {
        title: "Ver laboratórios",
        description: "Visualizar a lista de laboratórios disponíveis na instituição."
      },
      {
        title: "Editar laboratórios",
        description: "Adicionar, editar ou remover laboratórios."
      }
    ]
  },
  {
    module: "Cursos e Disciplinas",
    icon: <GraduationCap size={23} strokeWidth={2} className="text-foreground/70" />,
    actions: [
      {
        title: "Ver cursos e disciplinas",
        description: "Visualizar os cursos, disciplinas e suas respectivas turmas."
      },
      {
        title: "Editar cursos",
        description: "Criar, editar ou desativar cursos oferecidos pela instituição."
      },
      {
        title: "Editar disciplinas",
        description: "Adicionar, editar ou remover disciplinas vinculadas aos cursos."
      },
      {
        title: "Vincular disciplinas a professores",
        description: "Associar disciplinas aos professores responsáveis."
      },
      {
        title: "Gerenciar turmas",
        description: "Criar e ajustar turmas associadas aos cursos e disciplinas."
      }
    ]
  },
  {
    module: "Usuários",
    icon: <UsersRound size={20} strokeWidth={2} className="text-foreground/70" />,
    actions: [
      {
        title: "Ver usuários",
        description: "Visualizar a lista de usuários cadastrados no sistema."
      },
      {
        title: "Editar usuários",
        description: "Adicionar, editar ou remover usuários do sistema."
      },
      {
        title: "Alterar permissões de usuários",
        description: "Conceder ou revogar permissões de acesso aos usuários."
      }
    ]
  },
  {
    module: "Configurações da Instituição",
    icon: <School size={22} strokeWidth={2} className="text-foreground/70"/>,
    actions: [
      {
        title: "Ver configurações institucionais",
        description: "Visualizar as configurações gerais da instituição."
      },
      {
        title: "Editar dados institucionais",
        description: "Modificar informações como nome, endereço e logotipo da instituição."
      },
      {
        title: "Gerenciar calendário acadêmico",
        description: "Definir datas importantes como início e término de semestres."
      }
    ]
  }
];


export default function ManagerUser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const role = searchParams.get("role") || "";

  const userName = name || "Usuário não identificado";

  const [formState, setFormState] = useState({
    id,
    name,
    email,
    role,
    password: "",
  });

  const [permissionsChanged, setPermissionsChanged] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handlePermissionsChange = () => {
    setPermissionsChanged(true);
  };

  const handleCancel = () => {
    router.push("/admin/users");
  };

  const handleSave = () => {
    toast.success("Alterações salvas com sucesso!");
    setIsDirty(false);
    setPermissionsChanged(false);
    router.push("/admin/users");
  };

  return (
    <div className="w-screen h-screen flex">
      <Sidebar userName={userData.userName} userType={userData.userType} />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
        <HeaderPage title={`Gerenciar ${userName}`} />
        <div className="w-full min-w-0 grid md:grid-cols-11 grid-cols-3 items-start gap-4">
          <div className="col-span-1 flex flex-col gap-2">
            <div className="flex gap-2 items-center text-secondary-foreground/80">
              <Fingerprint size={18} strokeWidth={2} className="text-red-700" />
              R.A
            </div>
            <Input
              value={formState.id}
              onChange={(e) => handleInputChange("id", e.target.value)}
              className="bg-card"
            />
          </div>

          <div className="md:col-span-3 col-span-2 flex flex-col gap-2">
            <div className="flex gap-2 items-center text-secondary-foreground/80">
              <UserRound size={18} strokeWidth={2} className="text-foreground/80" />
              Nome
            </div>
            <Input
              value={formState.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-card"
            />
          </div>

          <div className="md:col-span-2 col-span-3 flex flex-col gap-2">
            <div className="flex gap-2 items-center text-secondary-foreground/80">
              <Shield size={18} strokeWidth={2} className="text-primary/90" />
              Cargo
            </div>
            <Input
              value={formState.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className="bg-card"
            />
          </div>

          <div className="md:col-span-3 col-span-3 flex flex-col gap-2">
            <div className="flex gap-2 items-center text-secondary-foreground/80">
              <Mail size={17} strokeWidth={2} className="text-neutral-600" />
              Email
            </div>
            <Input
              value={formState.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-card"
            />
          </div>

          <div className="md:col-span-2 col-span-3 flex flex-col gap-2">
            <div className="flex gap-2 items-center text-secondary-foreground/80">
              <KeyRound size={18} strokeWidth={2} className="text-neutral-600" />
              Senha
            </div>
            <Input
              value={formState.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Redefinir senha"
              className="bg-card"
            />
          </div>
        </div>

        <PermissionsModulesList
          permissions={permissions}
          onChange={handlePermissionsChange}
        />

        {(isDirty || permissionsChanged) && (
          <div className="fixed bottom-0 right-0 m-4">
            <div className="flex gap-3">
              <Button variant="secondary" onClick={handleSave} className="cursor-pointer">
                Salvar Alterações
              </Button>
              <Button onClick={handleCancel} className="cursor-pointer">Cancelar</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
