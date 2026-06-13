import { Lock } from "lucide-react";

export const SecureCheckoutNote = ({ size = "sm" }: { size?: "sm" | "md" }) => {
  const fs = size === "sm" ? "clamp(9px, 2.3vw, 11px)" : "clamp(11px, 2.7vw, 13px)";
  return (
    <p className="flex items-start gap-1.5 text-muted-foreground leading-snug mt-1.5" style={{ fontSize: fs }}>
      <Lock className="w-3 h-3 shrink-0 mt-[2px] text-green-500" />
      <span>Pagamento em ambiente seguro. Você recebe a confirmação por e-mail.</span>
    </p>
  );
};
