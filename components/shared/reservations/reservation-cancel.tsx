"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { CircleX } from "lucide-react";
import { axiosClient } from "@/services/axiosClient";
import { toast } from "react-hot-toast";
import { getUserFromToken } from "@/services/auth";

type ReservationCancelDialogProps = {
  reservationId: number | string;
  onSuccess?: () => void;
  disabled?: boolean;
};

export default function ReservationCancelDialog({
  reservationId,
  onSuccess,
  disabled,
}: ReservationCancelDialogProps) {
  const [loading, setLoading] = useState(false);
  const user = getUserFromToken();

  const handleCancelReservation = async () => {
    setLoading(true);
    try {
      await axiosClient.patch(`/reservations/${reservationId}/cancel`, {
        canceladorId: user?.id,
      });
      toast.success("Reserva cancelada com sucesso!");
      if (typeof onSuccess === "function") onSuccess(); // recarrega a lista ao cancelar!
    } catch (err: any) {
      toast.error("Não foi possível cancelar a reserva.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="cursor-pointer flex items-center p-2 rounded-lg disabled:opacity-60"
          disabled={disabled}
          title="Cancelar reserva"
          type="button"
        >
          <CircleX size={18} strokeWidth={2.4} className="text-red-800" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="items-center flex">
            Você tem certeza disso?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação irá cancelar a reserva e não poderá ser desfeita.<br />
            Se necessário, será preciso criar a reserva novamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
            onClick={handleCancelReservation}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Cancelar Reserva"}
          </AlertDialogAction>
          <AlertDialogCancel className="border bg-background shadow-xs text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
            Fechar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
