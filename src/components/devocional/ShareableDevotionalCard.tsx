import React, { forwardRef } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ShareableDevotionalCardProps {
  title: string;
  verse: {
    text: string;
    reference: string;
  };
  meditation: string;
  date: Date;
}

export const ShareableDevotionalCard = forwardRef<HTMLDivElement, ShareableDevotionalCardProps>(
  ({ title, verse, meditation, date }, ref) => {
    const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    const totalText = verse.text + meditation;
    const baseFontSize = totalText.length > 1200 ? 28 : totalText.length > 800 ? 30 : totalText.length > 500 ? 32 : 36;

    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1920px",
          background: "linear-gradient(160deg, #0f0f23 0%, #1a1a3e 30%, #0d1117 70%, #0a0a1a 100%)",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          overflow: "hidden",
        }}
      >
        {/* Glow effects */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Content container */}
        <div style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}>
          {/* Top badge */}
          <div style={{ textAlign: "center" }}>
            <span style={{
              fontSize: "24px",
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "6px",
              fontWeight: "700",
              background: "linear-gradient(180deg, #f59e0b 0%, #d97706 60%, #b45309 100%)",
              padding: "16px 40px",
              borderRadius: "16px",
              display: "inline-block",
              boxShadow: "0 6px 0 #92400e, 0 8px 20px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3)",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              📖 Devocional do Dia
            </span>
          </div>

          {/* Date */}
          <div style={{ textAlign: "center" }}>
            <span style={{
              fontSize: "28px",
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}>
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "56px",
            fontWeight: "bold",
            color: "#f59e0b",
            textAlign: "center",
            lineHeight: "1.3",
            textShadow: "0 0 40px rgba(245, 158, 11, 0.3)",
          }}>
            ✦ {title}
          </h1>

          {/* Divider */}
          <div style={{
            width: "50%",
            height: "2px",
            background: "linear-gradient(to right, transparent, rgba(245, 158, 11, 0.5), transparent)",
            margin: "0 auto",
          }} />

          {/* Verse */}
          <div style={{
            background: "rgba(255, 255, 255, 0.04)",
            borderRadius: "16px",
            padding: "30px",
            border: "1px solid rgba(245, 158, 11, 0.15)",
            width: "100%",
          }}>
            <p style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#f59e0b",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "12px",
            }}>📜 Versículo</p>
            <p style={{
              fontSize: `${baseFontSize + 2}px`,
              fontStyle: "italic",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: "1.7",
              textAlign: "center",
              marginBottom: "12px",
            }}>
              "{verse.text}"
            </p>
            <p style={{
              fontSize: "26px",
              color: "#f59e0b",
              fontWeight: "600",
              textAlign: "center",
            }}>
              — {verse.reference}
            </p>
          </div>

          {/* Meditation */}
          <div style={{
            background: "rgba(255, 255, 255, 0.04)",
            borderRadius: "16px",
            padding: "30px",
            border: "1px solid rgba(59, 130, 246, 0.15)",
            width: "100%",
          }}>
            <p style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#3b82f6",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "12px",
            }}>💭 Meditação</p>
            <p style={{
              fontSize: `${baseFontSize}px`,
              color: "rgba(255, 255, 255, 0.75)",
              lineHeight: "1.7",
              textAlign: "justify",
            }}>{meditation}</p>
          </div>

          {/* Footer */}
          <div style={{
            paddingTop: "30px",
            borderTop: "1px solid rgba(245, 158, 11, 0.15)",
            textAlign: "center",
            width: "100%",
          }}>
            <p style={{
              fontSize: "28px",
              fontWeight: "600",
              letterSpacing: "2px",
            }}>
              <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>Acesse: </span>
              <span style={{ color: "#f59e0b" }}>devocionalzeiros.com.br</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ShareableDevotionalCard.displayName = "ShareableDevotionalCard";
