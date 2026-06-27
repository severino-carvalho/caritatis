import { MapPin } from "lucide-react";
import { usePerfil } from "@/hooks/usePerfil";
import { LeaderboardCard } from "@/components/leaderboard/LeaderboardCard";
import { atos } from "@/data/mocks.ts";

export function RightRail() {
  const { isInstituicao, isColaborador } = usePerfil();

  const proximos = atos.slice(0, 2);

  return (
    <aside className="hidden xl:block w-72 shrink-0">
      <div className="sticky top-20 space-y-4">
        {isColaborador && <LeaderboardCard />}

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display text-sm font-bold text-foreground">Atos próximos a você</h3>
          <ul className="mt-4 space-y-4">
            {proximos.map((a) => (
              <li key={a.id} className="space-y-1.5">
                <div className="text-sm font-semibold text-foreground line-clamp-2">{a.titulo}</div>
                <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={12} aria-hidden /> {a.localizacao}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="px-4 text-[11px] text-muted-foreground">
          © Caritatis · Comunidade brasileira de impacto social
        </p>
      </div>
    </aside>
  );
}
