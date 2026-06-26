import { Heart, MessageCircle, Share2, MapPin, Calendar } from "lucide-react";
import type { Ato, Instituicao } from "@/data/types";
import { Avatar } from "./ui/ReuniAvatar";
import { CategoryPill } from "./ui/ReuniCategoryPill";
import { VerifiedBadge } from "./ui/ReuniVerifiedBadge";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

const statusStyles: Record<string, string> = {
  Ativo: "bg-secondary-soft text-secondary",
  "Em andamento": "bg-primary-soft text-primary",
  Encerrado: "bg-muted text-muted-foreground",
};

interface Props {
  ato: Ato;
  compact?: boolean;
}

export function AtoCard({ ato, compact }: Props) {
  const isPresencial = ato.tipo_ato === "presencial";
  const inst = ato.autor as Instituicao;
  const verificada = (ato.autor as Instituicao).status_verificacao === "verificada";

  return (
    <article className="overflow-hidden rounded-2xl bg-card text-card-foreground border border-border">
      {/* Tipo + Status row */}
      <div className="flex items-center justify-between gap-2 px-5 pt-5">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
            isPresencial ? "bg-secondary-soft text-secondary" : "bg-primary-soft text-primary",
          )}
        >
          <span
            aria-hidden
            className={cn("h-1.5 w-1.5 rounded-full", isPresencial ? "bg-secondary" : "bg-primary")}
          />
          {isPresencial ? "Presencial" : "Arrecadação"}
        </span>

        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-medium",
            statusStyles[ato.status],
          )}
        >
          {ato.status}
        </span>
      </div>

      {/* Image */}
      <div className="px-5 pt-4">
        <div className="overflow-hidden rounded-xl aspect-[16/9] bg-muted">
          <img src={ato.foto_url} alt={ato.titulo} className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="px-5 pt-4 pb-5">
        <div className="mb-3">
          <CategoryPill categoria={ato.categoria} as="span" />
        </div>

        <h3
          className={cn(
            "font-display font-bold text-foreground leading-snug",
            compact ? "text-base" : "text-lg",
          )}
        >
          {ato.titulo}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{ato.descricao}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} aria-hidden /> {ato.localizacao}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} aria-hidden /> {formatDate(ato.data_ato)}
          </span>
        </div>

        {/* Author */}
        <div className="mt-4 flex items-center gap-3 pt-4 border-t border-border">
          <Avatar
            src={ato.autor.avatar_url}
            alt={ato.autor.nome}
            size={36}
            shape={ato.autor.tipo === "instituicao" ? "rounded" : "circle"}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-semibold text-foreground">
                {inst.razao_social ?? ato.autor.nome}
              </span>
              {verificada && <VerifiedBadge />}
            </div>
            <div className="truncate text-xs text-muted-foreground">{ato.autor.papel}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-1 border-t border-border pt-3 -mb-1">
          <ActionBtn
            icon={<Heart size={16} aria-hidden />}
            label="Curtir"
            count={ato.curtidas_count}
          />
          <ActionBtn
            icon={<MessageCircle size={16} aria-hidden />}
            label="Comentar"
            count={ato.comentarios_count}
          />
          <ActionBtn
            icon={<Share2 size={16} aria-hidden />}
            label="Compartilhar"
            count={ato.compartilhamentos_count}
          />
        </div>
      </div>
    </article>
  );
}

function ActionBtn({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      aria-label={label}
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {icon}
      <span>{label}</span>
      <span className="text-foreground/70 tabular-nums">{count}</span>
    </button>
  );
}
