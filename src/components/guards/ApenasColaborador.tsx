import type { ReactNode } from "react";
import { usePerfil } from "@/hooks/usePerfil";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ApenasColaborador({ children, fallback = null }: Props) {
  const { isColaborador } = usePerfil();
  return isColaborador ? <>{children}</> : <>{fallback}</>;
}
