import { Card } from "@/components/ui/card";

type CardLaboratoryProps = {
  id?: number;
  nome?: string;
  tipo?: string;
  capacidade?: number;
  localizacao?: string;
  areaNome?: string;
  showHeader?: boolean;
};

export default function CardLaboratory({
  id,
  nome,
  tipo,
  capacidade,
  localizacao,
  areaNome,
}: CardLaboratoryProps) {

  return (
    <Card className="w-full px-4 py-3 shadow hover:shadow-md transition-all duration-200">
      <div className="grid grid-cols-12 items-center w-full">
        <span className="col-span-1 text-sm text-foreground truncate">{id}</span>
        <span className="col-span-3 text-sm text-foreground ml-2 truncate flex items-center gap-2">
          {nome}
        </span>
        <span className="col-span-2 flex items-center gap-1 text-sm text-foreground truncate">
          {tipo}
        </span>
        <span className="col-span-2 flex items-center pl-9 gap-1 text-sm text-foreground truncate">
          {capacidade}
        </span>
        <span className="col-span-2 flex items-center gap-1 text-sm text-foreground truncate">
          {areaNome}
        </span>
        <span className="col-span-2 flex items-center gap-1 text-sm text-foreground justify-end pr-4 truncate">
          {localizacao}
        </span>
      </div>
    </Card>
  );
}
