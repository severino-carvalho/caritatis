import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  size?: number;
  shape?: "circle" | "rounded";
  ring?: boolean;
  className?: string;
}

export function Avatar({ src, alt, size = 40, shape = "circle", ring, className }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn(
        "object-cover shrink-0",
        shape === "circle" ? "rounded-full" : "rounded-[12px]",
        ring && "ring-2 ring-surface shadow-[0_0_0_1px_var(--color-border)]",
        className,
      )}
      style={{ width: size, height: size }}
    />
  );
}
