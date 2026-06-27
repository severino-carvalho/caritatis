import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, HandHeart, ImagePlus, MapPin, Search, Sprout } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AtoCard } from "@/components/AtoCard";
import { Button } from "@/components/ui/ReuniButton";
import { atos, CATEGORIAS } from "@/data/mocks";
import type { Categoria, TipoAto } from "@/data/types";

export const Route = createFileRoute("/publicar")({
  beforeLoad: () => {
    const perfil = typeof window !== "undefined" ? sessionStorage.getItem("reuni_perfil") : null;
    if (perfil !== "instituicao") throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Publicar um ato — reuni" },
      { name: "description", content: "Crie e publique um novo ato social na reuni." },
    ],
  }),
  component: PublicarPage,
});

const STEPS = ["Básico", "Detalhes", "Revisão"] as const;

function PublicarPage() {
  const [step, setStep] = useState(0);
  const [tipo, setTipo] = useState<TipoAto | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "">("");

  const exemplo = atos[0];

  return (
    <AppShell rightRail={false}>
      <div className="mx-auto max-w-2xl">
        <header className="mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">Publicar um ato</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Compartilhe uma ação que sua comunidade está realizando ou precisa apoiar.
          </p>
        </header>

        {/* Stepper */}
        <ol className="mb-8 flex items-center gap-2">
          {STEPS.map((label, idx) => {
            const active = idx === step;
            const done = idx < step;
            return (
              <li key={label} className="flex flex-1 items-center gap-2">
                <button
                  onClick={() => setStep(idx)}
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                    done
                      ? "bg-secondary text-secondary-foreground"
                      : active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                  aria-label={`Passo ${idx + 1}: ${label}`}
                >
                  {idx + 1}
                </button>
                <span
                  className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {label}
                </span>
                {idx < STEPS.length - 1 && <div className="h-px flex-1 bg-border" />}
              </li>
            );
          })}
        </ol>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground">Tipo do ato</label>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <TipoCard
                    active={tipo === "presencial"}
                    onClick={() => setTipo("presencial")}
                    icon={<HandHeart size={22} aria-hidden />}
                    title="Ação Presencial"
                    desc="Mutirões, voluntariado e atendimentos no local."
                    tone="secondary"
                  />
                  <TipoCard
                    active={tipo === "arrecadacao"}
                    onClick={() => setTipo("arrecadacao")}
                    icon={<Sprout size={22} aria-hidden />}
                    title="Arrecadação"
                    desc="Captação de alimentos, roupas ou recursos financeiros."
                    tone="primary"
                  />
                </div>
              </div>

              <Field label="Título">
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Mutirão de doação de cestas básicas"
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </Field>

              <Field label="Descrição" hint={`${descricao.length}/500`}>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value.slice(0, 500))}
                  rows={5}
                  placeholder="Conte o que vai acontecer, quem pode participar e o que esperar..."
                  className="w-full resize-none rounded-xl border border-border bg-surface p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </Field>

              <Field label="Categoria">
                <div className="relative">
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as Categoria)}
                    className="h-11 w-full appearance-none rounded-xl border border-border bg-surface px-4 pr-10 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Selecione uma categoria</option>
                    {CATEGORIAS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    ▾
                  </span>
                </div>
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <Field label="Foto do ato">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-10 text-center text-sm text-muted-foreground hover:bg-accent">
                  <ImagePlus size={28} aria-hidden />
                  <span className="font-medium text-foreground">
                    Arraste uma foto ou clique para enviar
                  </span>
                  <span className="text-xs">JPG ou PNG até 8MB</span>
                  <input type="file" accept="image/*" className="sr-only" />
                </label>
              </Field>

              <Field label="Localização">
                <div className="relative">
                  <MapPin
                    size={16}
                    aria-hidden
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    placeholder="Endereço ou ponto de referência"
                    className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </Field>

              <Field label="Data do ato">
                <div className="relative">
                  <Calendar
                    size={16}
                    aria-hidden
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="date"
                    className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-4 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </Field>

              <Field label="Instituições colaboradoras">
                <div className="relative">
                  <Search
                    size={16}
                    aria-hidden
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    placeholder="Buscar instituições para convidar..."
                    className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">
                Confira como seu ato aparecerá no feed antes de publicar.
              </p>
              <AtoCard ato={exemplo} />
              <div className="flex flex-col-reverse items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
                <Button variant="ghost">Salvar rascunho</Button>
                <Button size="lg">Publicar Ato</Button>
              </div>
            </div>
          )}

          {step < 2 && (
            <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                Voltar
              </Button>
              <Button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>
                Próximo
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        {hint && <span className="text-xs text-muted-foreground tabular-nums">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function TipoCard({
  active,
  onClick,
  icon,
  title,
  desc,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: "primary" | "secondary";
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-start gap-3 rounded-2xl border bg-surface p-5 text-left transition-all ${
        active
          ? tone === "primary"
            ? "border-primary bg-primary-soft"
            : "border-secondary bg-secondary-soft"
          : "border-border hover:border-border-strong"
      }`}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ${
          tone === "primary"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {icon}
      </span>
      <div>
        <div className="font-display text-base font-bold text-foreground">{title}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
      </div>
    </button>
  );
}
