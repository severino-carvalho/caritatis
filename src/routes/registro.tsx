import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Building2, Camera, Eye, EyeOff, User, X } from "lucide-react";
import { registrarColaborador, registrarInstituicao } from "@/services/auth";
import { perfilDeUsuario } from "@/contexts/UserContext";
import { useUser } from "@/contexts/UserContext";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [{ title: "Cadastro — Caritatis" }],
  }),
  component: RegistroPage,
});

type TipoConta = "colaborador" | "instituicao" | null;

const BULLETS = [
  "Descubra ações perto de você",
  "Apoie ONGs e instituições",
  "Publique e divulgue seus atos sociais",
];

function mascararCpf(valor: string): string {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function mascararCnpj(valor: string): string {
  return valor
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";

const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";

interface SeletorFotoProps {
  arquivo: File | null;
  onChange: (file: File | null) => void;
  label: string;
  disabled?: boolean;
}

function SeletorFoto({ arquivo, onChange, label, disabled }: SeletorFotoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!arquivo) { setPreview(null); return; }
    const url = URL.createObjectURL(arquivo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [arquivo]);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-semibold text-foreground self-start">{label}</p>
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="h-20 w-20 rounded-full border-2 border-dashed border-border bg-surface flex items-center justify-center overflow-hidden transition-colors hover:border-primary/60 disabled:opacity-50"
        >
          {preview ? (
            <img src={preview} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <Camera size={24} className="text-muted-foreground" />
          )}
        </button>
        {arquivo && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange(null)}
            aria-label="Remover foto"
            className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-destructive text-white shadow disabled:opacity-50"
          >
            <X size={11} />
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        {arquivo ? arquivo.name : "Clique para adicionar (opcional)"}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

function PainelEsquerdo() {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-primary to-amber-600 p-12 text-white">
      <div className="font-display text-2xl font-bold">Caritatis</div>
      <div>
        <h1 className="font-display text-4xl font-bold leading-tight">
          Conecte-se a ações que transformam vidas
        </h1>
        <ul className="mt-8 space-y-4">
          {BULLETS.map((item) => (
            <li key={item} className="flex items-center gap-3 text-white/90">
              <span className="h-2 w-2 shrink-0 rounded-full bg-white/70" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-sm text-white/60">© {new Date().getFullYear()} Caritatis</p>
    </div>
  );
}

function LogoMobile() {
  return (
    <div className="mb-8 flex items-center gap-2 lg:hidden">
      <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-primary font-display text-lg font-bold text-primary-foreground">
        C
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">Caritatis</span>
    </div>
  );
}

function RegistroPage() {
  const navigate = useNavigate();
  const { setPerfil } = useUser();
  const [passo, setPasso] = useState<1 | 2>(1);
  const [tipo, setTipo] = useState<TipoConta>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [emailCol, setEmailCol] = useState("");
  const [senhaCol, setSenhaCol] = useState("");
  const [fotoCol, setFotoCol] = useState<File | null>(null);

  const [razaoSocial, setRazaoSocial] = useState("");
  const [documento, setDocumento] = useState("");
  const [areaAtuacao, setAreaAtuacao] = useState("");
  const [emailInst, setEmailInst] = useState("");
  const [senhaInst, setSenhaInst] = useState("");
  const [logoInst, setLogoInst] = useState<File | null>(null);

  function voltarPasso1() {
    setPasso(1);
    setErro("");
    setMostrarSenha(false);
  }

  async function handleSubmitColaborador(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const response = await registrarColaborador({ nomeCompleto, cpf, email: emailCol, senha: senhaCol }, fotoCol);
      setPerfil(perfilDeUsuario(response.usuario));
      navigate({ to: "/" });
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao cadastrar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleSubmitInstituicao(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const response = await registrarInstituicao(
        {
          razaoSocial,
          documento,
          areaAtuacao: areaAtuacao || undefined,
          email: emailInst,
          senha: senhaInst,
        },
        logoInst,
      );
      setPerfil(perfilDeUsuario(response.usuario));
      navigate({ to: "/" });
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao cadastrar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  function cardClass(selecionado: boolean) {
    return `flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-colors ${
      selecionado
        ? "border-primary bg-primary/5 text-primary"
        : "border-border bg-surface text-foreground hover:border-primary/50"
    }`;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PainelEsquerdo />

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <LogoMobile />

          {passo === 1 && (
            <>
              <h2 className="font-display text-2xl font-bold text-foreground">Criar conta</h2>
              <p className="mt-1 text-sm text-muted-foreground">Escolha o tipo de conta</p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button onClick={() => setTipo("colaborador")} className={cardClass(tipo === "colaborador")}>
                  <User size={28} />
                  <span className="text-sm font-semibold">Pessoa Física</span>
                </button>
                <button onClick={() => setTipo("instituicao")} className={cardClass(tipo === "instituicao")}>
                  <Building2 size={28} />
                  <span className="text-sm font-semibold">Instituição / ONG</span>
                </button>
              </div>

              <button
                disabled={tipo === null}
                onClick={() => setPasso(2)}
                className="mt-6 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-40"
              >
                Continuar
              </button>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Entrar
                </Link>
              </p>
            </>
          )}

          {passo === 2 && tipo === "colaborador" && (
            <>
              <button
                onClick={voltarPasso1}
                className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft size={14} /> Voltar
              </button>
              <h2 className="font-display text-2xl font-bold text-foreground">Pessoa Física</h2>
              <p className="mt-1 text-sm text-muted-foreground">Preencha seus dados</p>

              <form onSubmit={handleSubmitColaborador} className="mt-8 space-y-4">
                <SeletorFoto
                  arquivo={fotoCol}
                  onChange={setFotoCol}
                  label="Foto de perfil"
                  disabled={carregando}
                />
                <div>
                  <label htmlFor="nome" className={labelClass}>Nome completo</label>
                  <input
                    id="nome"
                    type="text"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    required
                    disabled={carregando}
                    placeholder="Seu nome completo"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="cpf" className={labelClass}>CPF</label>
                  <input
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(mascararCpf(e.target.value))}
                    required
                    disabled={carregando}
                    placeholder="000.000.000-00"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email-col" className={labelClass}>E-mail</label>
                  <input
                    id="email-col"
                    type="email"
                    value={emailCol}
                    onChange={(e) => setEmailCol(e.target.value)}
                    autoComplete="email"
                    required
                    disabled={carregando}
                    placeholder="seu@email.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="senha-col" className={labelClass}>Senha</label>
                  <div className="relative">
                    <input
                      id="senha-col"
                      type={mostrarSenha ? "text" : "password"}
                      value={senhaCol}
                      onChange={(e) => setSenhaCol(e.target.value)}
                      autoComplete="new-password"
                      required
                      disabled={carregando}
                      placeholder="••••••••"
                      className={`${inputClass} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {erro && <p className="text-sm text-destructive">{erro}</p>}

                <button
                  type="submit"
                  disabled={carregando}
                  className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-60"
                >
                  {carregando ? "Criando conta…" : "Criar conta"}
                </button>
              </form>
            </>
          )}

          {passo === 2 && tipo === "instituicao" && (
            <>
              <button
                onClick={voltarPasso1}
                className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft size={14} /> Voltar
              </button>
              <h2 className="font-display text-2xl font-bold text-foreground">Instituição / ONG</h2>
              <p className="mt-1 text-sm text-muted-foreground">Preencha os dados da instituição</p>

              <form onSubmit={handleSubmitInstituicao} className="mt-8 space-y-4">
                <SeletorFoto
                  arquivo={logoInst}
                  onChange={setLogoInst}
                  label="Logo da instituição"
                  disabled={carregando}
                />
                <div>
                  <label htmlFor="razao" className={labelClass}>Razão social</label>
                  <input
                    id="razao"
                    type="text"
                    value={razaoSocial}
                    onChange={(e) => setRazaoSocial(e.target.value)}
                    required
                    disabled={carregando}
                    placeholder="Nome da instituição"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="cnpj" className={labelClass}>CNPJ / Documento</label>
                  <input
                    id="cnpj"
                    type="text"
                    value={documento}
                    onChange={(e) => setDocumento(mascararCnpj(e.target.value))}
                    required
                    disabled={carregando}
                    placeholder="00.000.000/0000-00"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="area" className={labelClass}>
                    Área de atuação{" "}
                    <span className="font-normal text-muted-foreground">(opcional)</span>
                  </label>
                  <input
                    id="area"
                    type="text"
                    value={areaAtuacao}
                    onChange={(e) => setAreaAtuacao(e.target.value)}
                    disabled={carregando}
                    placeholder="Ex.: saúde, educação..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email-inst" className={labelClass}>E-mail</label>
                  <input
                    id="email-inst"
                    type="email"
                    value={emailInst}
                    onChange={(e) => setEmailInst(e.target.value)}
                    autoComplete="email"
                    required
                    disabled={carregando}
                    placeholder="contato@ong.org"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="senha-inst" className={labelClass}>Senha</label>
                  <div className="relative">
                    <input
                      id="senha-inst"
                      type={mostrarSenha ? "text" : "password"}
                      value={senhaInst}
                      onChange={(e) => setSenhaInst(e.target.value)}
                      autoComplete="new-password"
                      required
                      disabled={carregando}
                      placeholder="••••••••"
                      className={`${inputClass} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {erro && <p className="text-sm text-destructive">{erro}</p>}

                <button
                  type="submit"
                  disabled={carregando}
                  className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-60"
                >
                  {carregando ? "Criando conta…" : "Criar conta"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
