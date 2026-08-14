// Página de DEV para visualizar a capa do card do RPG (fora do app/login).
import { createRoot } from "react-dom/client";
import RPGGameCard from "@/components/home/RPGGameCard";

createRoot(document.getElementById("root")!).render(
  <div style={{ padding: 32, background: "#151321", minHeight: "100vh", display: "flex", gap: 32 }}>
    <div style={{ position: "relative", width: 246, height: 332, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.14)" }}>
      <RPGGameCard />
    </div>
    <div style={{ position: "relative", width: 360, height: 480, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.14)" }}>
      <RPGGameCard />
    </div>
  </div>,
);
