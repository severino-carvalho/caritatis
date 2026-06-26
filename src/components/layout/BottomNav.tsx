import { Link } from "@tanstack/react-router";
import { Home, PlusCircle, MessageSquare, Bookmark, User } from "lucide-react";

const items = [
  { to: "/", label: "Feed", icon: Home, exact: true },
  { to: "/publicar", label: "Publicar", icon: PlusCircle, exact: false },
  { to: "/mensagens", label: "Mensagens", icon: MessageSquare, exact: false },
  { to: "/instituicao/i-1", label: "Meus", icon: Bookmark, exact: false },
  { to: "/instituicao/i-1", label: "Perfil", icon: User, exact: false },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-border bg-background/95 backdrop-blur lg:hidden"
    >
      {items.map((i) => {
        const Icon = i.icon;
        return (
          <Link
            key={i.label}
            to={i.to}
            activeOptions={{ exact: i.exact }}
            className="flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium text-muted-foreground data-[status=active]:text-primary"
          >
            <Icon size={20} aria-hidden />
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
