import { createContext, useContext, useState, type ReactNode } from "react";
import type { Usuario, Instituicao } from "@/data/types";
import { usuarioLogado, instituicoes } from "@/data/mocks";

const PERFIL_KEY = "reuni_perfil";

interface UserContextValue {
  perfil: "pessoa_fisica" | "instituicao";
  setPerfil: (p: "pessoa_fisica" | "instituicao") => void;
  usuarioAtual: Usuario | Instituicao;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfilState] = useState<"pessoa_fisica" | "instituicao">(() => {
    const stored =
      typeof window !== "undefined" ? sessionStorage.getItem(PERFIL_KEY) : null;
    return stored === "instituicao" ? "instituicao" : "pessoa_fisica";
  });

  const setPerfil = (p: "pessoa_fisica" | "instituicao") => {
    sessionStorage.setItem(PERFIL_KEY, p);
    setPerfilState(p);
  };

  const usuarioAtual: Usuario | Instituicao =
    perfil === "pessoa_fisica" ? usuarioLogado : instituicoes[0];

  return (
    <UserContext.Provider value={{ perfil, setPerfil, usuarioAtual }}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser deve ser usado dentro de <UserProvider>");
  return ctx;
}
