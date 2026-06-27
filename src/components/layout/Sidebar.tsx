import { Link } from "@tanstack/react-router";
import { Home, Compass, Bookmark, User } from "lucide-react";
import { Avatar } from "@/components/ui/ReuniAvatar";
import { usuarioLogado, usuarioStats } from "@/data/mocks";
import { usePerfil } from "@/hooks/usePerfil";
import { ApenasInstituicao } from "@/components/guards/ApenasInstituicao";

type NavItem = {
  to: "/" | "/publicar" | "/instituicao/$id";
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
          {navComum.slice(1).map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
