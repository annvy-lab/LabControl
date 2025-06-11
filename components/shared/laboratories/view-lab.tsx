"use client";
import * as React from "react";
import {
  DialogContent, // Keep these in case it's rendered standalone, though DialogContent will be provided by parent
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, TriangleAlert } from "lucide-react"; // Import necessary icons for actions in the dialog
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define the props for the ViewLab component
type ViewLabProps = {
  id: number;
  nome: string;
  local: string; // Renamed from labLocal for consistency with ViewReservation's 'labLocal' in its props
  capacidade: number;
  descricao: string;
};

export default function ViewLab({ id, nome, local, capacidade, descricao }: ViewLabProps) {
  return (
    // Note: DialogContent, DialogHeader, DialogTitle are commented out here
    // because they are now provided by the parent Dialog in page.tsx
    // <DialogContent className="md:w-170 gap-4">
    //   <DialogHeader>
    //     <DialogTitle className="text-2xl flex text-[var(--header)] items-center gap-3">ID #{id}</DialogTitle>
    //   </DialogHeader>
    <div className="flex flex-col">
      <div className="flex flex-col gap-5 w-full">
        <div className="grid grid-cols-4 md:gap-6 gap-6 w-full">
          {/* Lab Name */}
          <div className="flex flex-col col-span-4 gap-2">
            <Label className="text-secondary-foreground font-medium">Nome do Laboratório:</Label>
            <p className="text-base text-gray-800">{nome}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 md:gap-6 gap-6 w-full">
          {/* Local */}
          <div className="flex flex-col col-span-2 md:col-span-2 gap-2">
            <Label className="text-secondary-foreground font-medium">Local:</Label>
            <p className="text-base text-gray-800">{local}</p>
          </div>
          {/* Capacidade */}
          <div className="flex flex-col col-span-2 md:col-span-2 gap-2">
            <Label className="text-secondary-foreground font-medium">Capacidade:</Label>
            <p className="text-base text-gray-800">{capacidade}</p>
          </div>
        </div>

        {/* Descrição */}
        <div className="flex flex-col gap-2 w-full mt-2"> {/* Adjusted margin-top */}
          <Label className="text-secondary-foreground font-medium">Descrição:</Label>
          <p className="w-full break-words text-base text-gray-800">
            {descricao || "Nenhuma descrição fornecida."} {/* Fallback if no description */}
          </p>
        </div>
      </div>

      {/* Action Buttons in the Dialog */}
      <div className="flex flex-row w-full justify-end items-center gap-3 mt-6"> {/* Adjusted margin-top */}
        <Button variant="secondary" className="px-4 py-2 flex items-center gap-2"> {/* Added padding for better button look */}
          <Pencil size={18} strokeWidth={2.4} className="text-secondary-foreground" />
          Editar
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="px-4 py-2 flex items-center gap-2"> {/* Used destructive variant for delete */}
              <Trash2 size={18} strokeWidth={2.4} /> {/* Changed to Trash2 for delete action, consistent with list */}
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="items-center flex gap-2">Você tem certeza disso? <TriangleAlert className="text-red-700" /></AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação é irreversível! O laboratório será removido permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Excluir Laboratório</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
    // </DialogContent>
  );
}