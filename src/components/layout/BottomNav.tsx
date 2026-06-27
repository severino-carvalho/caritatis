import { Link } from "@tanstack/react-router";
import { Bookmark, Home, PlusCircle, User } from "lucide-react";
import { ApenasInstituicao } from "@/components/guards/ApenasInstituicao";

type BottomItem = {
  to: "/" | "/publicar" | "/instituicao/$id";
  params?: { id: string };
  label: string;
  icon: typeof Home;
  exact: boolean;
};

function NavItem({ item }: { item: BottomItem }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      params={item.params}
      activeOptions={{ exact: item.exact }}
      className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium text-muted-foreground data-[status=active]:text-primary"
    >
      <Icon size={20} aria-hidden />
      {item.label}
    </Link>
  );
}

const feed: BottomItem = { to: "/", label: "Feed", icon: Home, exact: true };
const publicar: BottomItem = { to: "/publicar", label: "Publicar", icon: PlusCircle, exact: false };
const meus: BottomItem = {
  to: "/instituicao/$id",
  params: { id: "i-1" },
  label: "Meus",
  icon: Bookmark,
  exact: false,
};
const perfil: BottomItem = {
  to: "/instituicao/$id",
  params: { id: "i-1" },
  label: "Perfil",
  icon: User,
  exact: false,
};

export function BottomNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-border bg-background/95 backdrop-blur lg:hidden"
    >
      <NavItem item={feed} />
      <ApenasInstituicao>
        <NavItem item={publicar} />
      </ApenasInstituicao>
      <NavItem item={meus} />
      <NavItem item={perfil} />
    </nav>
  );
}
