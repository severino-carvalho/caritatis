import { Link } from "@tanstack/react-router";
import { Bookmark, Compass, Home, MapPin, User } from "lucide-react";
import { Avatar } from "@/components/ui/ReuniAvatar";
import { atos, instituicoes, usuarioLogado, usuarioStats } from "@/data/mocks";
import { usePerfil } from "@/hooks/usePerfil";
import { ApenasInstituicao } from "@/components/guards/ApenasInstituicao";
import { ApenasColaborador } from "@/components/guards/ApenasColaborador";
import { VerifiedBadge } from "@/components/ui/ReuniVerifiedBadge.tsx";
import { Button } from "@/components/ui/button.tsx";

type NavItem = {
  to: string;
  params?: { id: string };
  label: string;
  icon: typeof Home;
};

const navComum: NavItem[] = [
  { to: "/", label: "Feed", icon: Home },
  { to: "/instituicao/$id", params: { id: "i-1" }, label: "Meus Atos", icon: Bookmark },
  { to: "/instituicao/$id", params: { id: "i-1" }, label: "Perfil", icon: User },
];

const navPublicar: NavItem = { to: "/publicar", label: "Publicar", icon: Compass };

function NavLink({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      params={item.params}
      activeOptions={{ exact: item.to === "/" }}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
    >
      <Icon size={18} aria-hidden />
      {item.label}
    </Link>
  );
}

export function Sidebar() {
  const { isInstituicao } = usePerfil();

  const sugestoes = instituicoes.slice(0, 3);
  const proximos = atos.slice(0, 2);

  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-20 space-y-4">
        {/* Profile card */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-col items-center text-center">
            <Avatar src={usuarioLogado.avatar_url} alt={usuarioLogado.nome} size={72} ring />
            <h2 className="mt-3 font-display text-base font-bold text-foreground">
              {usuarioLogado.nome}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{usuarioLogado.papel}</p>
            <span className="mt-2 inline-flex items-center rounded-full bg-secondary-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary">
              {isInstituicao ? "Instituição" : "Pessoa Física"}
            </span>
          </div>
          <div className="mt-5 grid grid-cols-2 divide-x divide-border border-t border-border pt-4 text-center">
            <div>
              <div className="font-display text-lg font-bold text-foreground tabular-nums">
                {usuarioStats.atos_publicados}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Atos</div>
            </div>
            <div>
              <div className="font-display text-lg font-bold text-foreground tabular-nums">
                {usuarioStats.seguindo}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Seguindo
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="rounded-2xl border border-border bg-card p-2">
          <NavLink item={navComum[0]} />
          <ApenasInstituicao>
            <NavLink item={navPublicar} />
          </ApenasInstituicao>
          <ApenasColaborador>
            <NavLink item={navComum[1]} />
          </ApenasColaborador>
          <NavLink item={navComum[2]} />
        </nav>

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
      </div>
    </aside>
  );
}
