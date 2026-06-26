import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar } from "@/components/ui/ReuniAvatar";
import { Button } from "@/components/ui/ReuniButton";
import { CategoryPill } from "@/components/ui/ReuniCategoryPill";
import { VerifiedBadge } from "@/components/ui/ReuniVerifiedBadge";
import { conversas, usuarioLogado } from "@/data/mocks";

export const Route = createFileRoute("/mensagens")({
  head: () => ({
    meta: [
      { title: "Mensagens — reuni" },
      { name: "description", content: "Conversas com instituições e voluntários." },
    ],
  }),
  component: MensagensPage,
});

function MensagensPage() {
  const [activeId, setActiveId] = useState<string | null>(conversas[0]?.id ?? null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = conversas.find((c) => c.id === activeId);

  return (
    <AppShell rightRail={false}>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid h-[calc(100vh-180px)] min-h-[520px] grid-cols-1 md:grid-cols-[320px_1fr]">
          {/* Inbox list */}
          <div
            className={`flex flex-col border-r border-border bg-surface md:flex ${
              mobileOpen ? "hidden" : "flex"
            }`}
          >
            <div className="border-b border-border p-4">
              <h1 className="font-display text-base font-bold text-foreground">Mensagens</h1>
            </div>
            <ul className="flex-1 overflow-y-auto">
              {conversas.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => {
                        setActiveId(c.id);
                        setMobileOpen(true);
                      }}
                      className={`flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-accent ${
                        isActive ? "bg-primary-soft" : ""
                      }`}
                    >
                      <Avatar
                        src={c.participante.avatar_url}
                        alt={c.participante.razao_social}
                        size={42}
                        shape="rounded"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="truncate text-sm font-semibold text-foreground">
                            {c.participante.nome}
                          </span>
                          <span className="shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground">
                            {c.timestamp}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {c.ultima_mensagem}
                        </p>
                      </div>
                      {c.nao_lidas > 0 && (
                        <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground tabular-nums">
                          {c.nao_lidas}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Conversation */}
          <div className={`flex flex-col ${mobileOpen ? "flex" : "hidden md:flex"}`}>
            {active ? (
              <>
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Voltar para conversas"
                    className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <ArrowLeft size={18} aria-hidden />
                  </button>
                  <Avatar
                    src={active.participante.avatar_url}
                    alt={active.participante.razao_social}
                    size={36}
                    shape="rounded"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-semibold text-foreground">
                        {active.participante.razao_social}
                      </span>
                      {active.participante.status_verificacao === "verificada" && <VerifiedBadge />}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {active.participante.area_atuacao}
                    </p>
                  </div>
                </div>

                {active.ato_referencia && (
                  <div className="border-b border-border bg-surface-2 px-4 py-3">
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                      <img
                        src={active.ato_referencia.foto_url}
                        alt=""
                        className="h-12 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                          Conversando sobre
                        </div>
                        <div className="truncate text-sm font-semibold text-foreground">
                          {active.ato_referencia.titulo}
                        </div>
                      </div>
                      <CategoryPill categoria={active.ato_referencia.categoria} as="span" />
                    </div>
                  </div>
                )}

                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
                  {active.mensagens.map((m) => {
                    const mine = m.autor_id === usuarioLogado.id;
                    return (
                      <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${
                            mine
                              ? "bg-primary text-primary-foreground rounded-br-sm"
                              : "bg-surface-2 text-foreground rounded-bl-sm"
                          }`}
                        >
                          <p>{m.texto}</p>
                          <div
                            className={`mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                          >
                            {m.timestamp}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex items-center gap-2 border-t border-border bg-surface px-3 py-3"
                >
                  <input
                    placeholder="Escreva uma mensagem..."
                    aria-label="Nova mensagem"
                    className="h-11 flex-1 rounded-full border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <Button aria-label="Enviar mensagem">
                    <Send size={14} aria-hidden /> Enviar
                  </Button>
                </form>
              </>
            ) : (
              <div className="grid flex-1 place-items-center p-10 text-sm text-muted-foreground">
                Selecione uma conversa
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
