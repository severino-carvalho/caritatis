import { categoriaColor } from "@/data/mocks";
import type { Categoria } from "@/data/types";
import { cn } from "@/lib/utils";

interface Props {
  categoria: Categoria;
  active?: boolean;
  onClick?: () => void;
  as?: "button" | "span";
}

export function CategoryPill({ categoria, active, onClick, as = "button" }: Props) {
  const token = categoriaColor[categoria];
  const Tag = as;
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
        active ? "text-foreground" : "text-foreground/80 hover:text-foreground",
      )}
      style={{
        backgroundColor: active
          ? `color-mix(in oklab, var(--color-${token}) 22%, transparent)`
          : `color-mix(in oklab, var(--color-${token}) 12%, transparent)`,
        boxShadow: active ? `inset 0 0 0 1px var(--color-${token})` : "none",
      }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: `var(--color-${token})` }}
      />
      {categoria}
    </Tag>
  );
}
