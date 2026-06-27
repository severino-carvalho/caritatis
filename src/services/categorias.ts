import type { CategoriaAPI } from "@/data/types";
import { apiFetch } from "./api";

export function fetchCategorias(): Promise<CategoriaAPI[]> {
  return apiFetch<CategoriaAPI[]>("/api/categorias");
}
