import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

interface Props {
  src?: string | null;
  alt: string;
  size?: number;
  shape?: "circle" | "rounded";
  ring?: boolean;
  className?: string;
}

function initials(alt: string): string {
  return alt
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function Avatar({ src, alt, size = 40, shape = "circle", ring, className }: Props) {
  const radius = shape === "circle" ? "rounded-full" : "rounded-[12px]";

  return (
    <AvatarPrimitive.Root
      style={{ width: size, height: size }}
      className={cn(
        "relative flex shrink-0 overflow-hidden",
        radius,
        ring && "ring-2 ring-surface shadow-[0_0_0_1px_var(--color-border)]",
        className,
      )}
    >
      <AvatarPrimitive.Image
        src={src ?? undefined}
        alt={alt}
        className="aspect-square h-full w-full object-cover"
      />
      <AvatarPrimitive.Fallback
        className={cn(
          "flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-semibold select-none",
          radius,
        )}
        style={{ fontSize: size * 0.36 }}
      >
        {initials(alt) || "?"}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
