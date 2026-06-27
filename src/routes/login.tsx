import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Entrar — reuni" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (usuario === "admin" && senha === "admin") {
      sessionStorage.setItem("reuni_auth", "true");
      navigate({ to: "/" });
    } else {
      setErro("Usuário ou senha incorretos.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-[12px] bg-primary text-primary-foreground font-display text-lg font-bold"
          >
            r
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            reuni
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login-usuario"
              className="mb-1.5 block text-sm font-semibold text-foreground"
            >
              Usuário
            </label>
            <input
              id="login-usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="username"
              className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div>
            <label
              htmlFor="login-senha"
              className="mb-1.5 block text-sm font-semibold text-foreground"
            >
              Senha
            </label>
            <input
              id="login-senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {erro && <p className="text-sm text-destructive">{erro}</p>}

          <button
            type="submit"
            className="mt-2 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
