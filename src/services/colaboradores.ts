import type { ColaboradorPerfilResponse } from "@/data/types";
import { apiFetch } from "./api";

export function fetchColaborador(id: number): Promise<ColaboradorPerfilResponse> {
  return apiFetch<ColaboradorPerfilResponse>(`/colaboradores/${id}`);
}
