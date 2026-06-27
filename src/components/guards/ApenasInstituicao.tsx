import type { ReactNode } from "react";
import { usePerfil } from "@/hooks/usePerfil";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ApenasInstituicao({ children, fallback = null }: Props) {
  const { isInstituicao } = usePerfil();
  return isInstituicao ? <>{children}</> : <>{fallback}</>;
}
