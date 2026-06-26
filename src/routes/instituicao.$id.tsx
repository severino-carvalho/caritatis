import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AtoCard } from "@/components/AtoCard";
import { Avatar } from "@/components/ui/ReuniAvatar";
import { Button } from "@/components/ui/ReuniButton";
import { VerifiedBadge } from "@/components/ui/ReuniVerifiedBadge";
import { atos, instituicoes } from "@/data/mocks";

export const Route = createFileRoute("/instituicao/$id")({
  head: ({ params }) => {
    const inst = instituicoes.find((i) => i.id === params.id);
    return {
      meta: [
        { title: inst ? `${inst.razao_social} — reuni` : "Instituição — reuni" },
        { name: "description", content: inst?.descricao ?? "Perfil de instituição na reuni." },
      ],
    };
  },
  component: PerfilInstituicao,
  notFoundComponent: () => (
    <AppShell rightRail={false}>
      <p className="text-sm text-muted-foreground">Instituição não encontrada.</p>
    </AppShell>
  ),
  loader: ({ params }) => {
    const inst = instituicoes.find((i) => i.id === params.id);
    if (!inst) throw notFound();
    return inst;
  },
});

function PerfilInstituicao() {
  const inst = Route.useLoaderData();
  const [tab, setTab] = useState<"atos" | "colab">("atos");
  const [seguindo, setSeguindo] = useState(false);

  const meus = atos.filter((a) => a.autor.id === inst.id);

  return (
    <AppShell rightRail={false}>
      <div className="space-y-6">
        {/* Header */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative h-44 sm:h-56 bg-muted">
            <img src={inst.capa_url} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="px-5 sm:px-8 pb-6">
            <div className="-mt-12 sm:-mt-14 flex flex-col sm:flex-row sm:items-end sm:gap-5">
              <Avatar
                src={inst.avatar_url}
                alt={inst.razao_social}
                size={104}
                shape="rounded"
                ring
              />
              <div className="mt-4 sm:mt-0 sm:pb-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    {inst.razao_social}
                  </h1>
                  {inst.status_verificacao === "verificada" && <VerifiedBadge />}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{inst.area_atuacao}</p>
              </div>
              <div className="mt-4 flex gap-2 sm:mt-0 sm:pb-2">
                <Button
                  variant={seguindo ? "outline" : "primary"}
                  onClick={() => setSeguindo((s) => !s)}
                >
                  {seguindo ? "Seguindo" : "Seguir"}
                </Button>
                <Button variant="outline">
                  <MessageSquare size={14} aria-hidden /> Mensagem
                </Button>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm text-foreground/90">{inst.descricao}</p>

            <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-border pt-4">
              <Stat label="Atos publicados" value={inst.atos_count} />
              <Stat label="Seguidores" value={inst.seguidores_count} />
              <Stat label="Colaborações" value={inst.colaboracoes_count} />
            </dl>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          <TabBtn active={tab === "atos"} onClick={() => setTab("atos")}>
            Atos Publicados
          </TabBtn>
          <TabBtn active={tab === "colab"} onClick={() => setTab("colab")}>
            Colaborações
          </TabBtn>
        </div>

        {tab === "atos" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {meus.map((a) => (
              <AtoCard key={a.id} ato={a} compact />
            ))}
            {meus.length === 0 && (
              <div className="md:col-span-2 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
                Nenhum ato publicado ainda.
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
            Em breve: colaborações com outras instituições aparecerão aqui.
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="font-display text-xl font-bold text-foreground tabular-nums">
        {value.toLocaleString("pt-BR")}
      </dd>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-3 text-sm font-medium transition-colors ${
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      {active && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />}
    </button>
  );
}
