import { MapPin } from "lucide-react";

type CardLaboratoryProps = {
  id?: number;
  nome?: string;
  localizacao?: string;
  showHeader?: boolean;
};

export default function CardLaboratory({ id, nome, localizacao, showHeader = false }: CardLaboratoryProps) {
  if (showHeader) {
    return (
      <div className="w-full px-4 py-2 border border-muted rounded-lg">
        <div className="grid grid-cols-12 items-center">
          <span className="col-span-1 text-sm font-semibold text-muted-foreground truncate">ID</span>
          <span className="col-span-5 text-sm font-semibold text-muted-foreground ml-2 truncate">Nome</span>
          <span className="col-span-6 text-sm font-semibold text-muted-foreground text-right pr-2 truncate">Localização</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-3 mb-1 bg-white/90 border border-muted rounded-lg shadow hover:shadow-md transition-all duration-200">
      <div className="grid grid-cols-12 items-center w-full">
        <span className="col-span-1 text-sm text-muted-foreground truncate">{id}</span>
        <span className="col-span-5 text-base font-normal text-foreground ml-2 truncate">{nome}</span>
        <span className="col-span-6 flex items-center gap-1 text-sm text-muted-foreground justify-end pr-4 truncate">
          <MapPin size={14} className="text-muted-foreground inline-block" />
          {localizacao}
        </span>
      </div>
    </div>
  );
}
