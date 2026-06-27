import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/ReuniAvatar";
import { Button } from "@/components/ui/ReuniButton";
import { VerifiedBadge } from "@/components/ui/ReuniVerifiedBadge";
import { atos, instituicoes } from "@/data/mocks";
import { usePerfil } from "@/hooks/usePerfil";

export function RightRail() {
  const { isInstituicao } = usePerfil();
  const sugestoes = instituicoes.slice(0, 3);
  const proximos = atos.slice(0, 2);

  return (
    <aside className="hidden xl:block w-72 shrink-0">
      <div className="sticky top-20 space-y-4">
        {!isInstituicao && (
          <>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-bold text-foreground">
                Instituições para seguir
              </h3>
              <ul className="mt-4 space-y-4">
                {sugestoes.map((i) => (
                  <li key={i.id} className="flex items-center gap-3">
                    <Link to="/instituicao/$id" params={{ id: i.id }}>
                      <Avatar src={i.avatar_url} alt={i.razao_social} size={40} shape="rounded" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/instituicao/$id"
                        params={{ id: i.id }}
                        className="flex items-center gap-1 truncate text-sm font-semibold text-foreground hover:text-primary"
                      >
                        <span className="truncate">{i.nome}</span>
                        {i.status_verificacao === "verificada" && (
                          <span className="shrink-0">
                            <VerifiedBadge />
                          </span>
                        )}
                      </Link>
                      <div className="truncate text-xs text-muted-foreground">{i.area_atuacao}</div>
                    </div>
                    <Button size="sm" variant="outline">
                      Seguir
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-bold text-foreground">
                Atos próximos a você
              </h3>
              <ul className="mt-4 space-y-4">
                {proximos.map((a) => (
                  <li key={a.id} className="space-y-1.5">
                    <div className="text-sm font-semibold text-foreground line-clamp-2">
                      {a.titulo}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={12} aria-hidden /> {a.localizacao}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <p className="px-4 text-[11px] text-muted-foreground">
          © Caritatis · Comunidade brasileira de impacto social
        </p>
      </div>
    </aside>
  );
}
