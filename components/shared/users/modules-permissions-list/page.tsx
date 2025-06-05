"use client";

import { useState, ReactNode } from "react";
import { Switch } from "@/components/ui/switch";

type Permission = {
  module: string;
  icon: ReactNode;
  actions: {
    title: string;
    description: string;
  }[];
};

type PermissionsModulesListProps = {
  permissions: Permission[];
  onChange: () => void;
};

export function PermissionsModulesList({ permissions, onChange }: PermissionsModulesListProps) {
  const [enabledPermissions, setEnabledPermissions] = useState<boolean[][]>(
    permissions.map(module => module.actions.map(() => false))
  );

  const togglePermission = (moduleIndex: number, actionIndex: number) => {
    const updated = [...enabledPermissions];
    updated[moduleIndex][actionIndex] = !updated[moduleIndex][actionIndex];
    setEnabledPermissions(updated);
    onChange();
  };

  return (
    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-semibold mt-8 mb-6">Módulos de Permissões</h2>
      {permissions.map((permission, moduleIndex) => (
        <div key={moduleIndex} className="w-full mb-8">
          <div className="flex items-center gap-3 mb-2">
            {permission.icon}
            <h3 className="text-lg font-medium">{permission.module}</h3>
          </div>
          <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-6">
            {permission.actions.map((action, actionIndex) => (
              <div
                key={actionIndex}
                className="w-full flex flex-row justify-between col-span-1 p-4 gap-3 bg-card/70 rounded-md shadow-sm"
              >
                <div className="flex flex-col">
                  <h4 className="w-full text-start break-words text-base font-medium">
                    {action.title}
                  </h4>
                  <p className="w-full text-secondary-foreground/75 text-xs break-words">
                    {action.description}
                  </p>
                </div>
                <Switch
                  checked={enabledPermissions[moduleIndex][actionIndex]}
                  onCheckedChange={() => togglePermission(moduleIndex, actionIndex)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
