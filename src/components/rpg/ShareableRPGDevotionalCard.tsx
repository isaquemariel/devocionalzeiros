import React, { forwardRef } from "react";

interface ShareableRPGDevotionalCardProps {
  title: string;
  reflection: string;
  application: string;
  prayer: string;
  bookName: string;
  chapter: number;
}

export const ShareableRPGDevotionalCard = forwardRef<HTMLDivElement, ShareableRPGDevotionalCardProps>(
  ({ title, reflection, application, prayer, bookName, chapter }, ref) => {
    const totalText = reflection + application + prayer;
    const baseFontSize = totalText.length > 1200 ? 26 : totalText.length > 800 ? 28 : totalText.length > 500 ? 30 : 34;

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
              fontSize: "22px",
              color: "rgba(245, 158, 11, 0.6)",
              textTransform: "uppercase",
              letterSpacing: "6px",
              fontWeight: "600",
            }}>
              🎮 Devocionalzeiros RPG
            </span>
          </div>

          {/* Book & Chapter */}
          <div style={{ textAlign: "center" }}>
            <span style={{
              fontSize: "26px",
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}>
              {bookName} — Capítulo {chapter}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "54px",
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

          {/* Reflection */}
          {reflection && (
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              borderRadius: "16px",
              padding: "30px",
              border: "1px solid rgba(245, 158, 11, 0.15)",
            }}>
              <p style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#f59e0b",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "12px",
              }}>💡 Reflexão</p>
              <p style={{
                fontSize: `${baseFontSize}px`,
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: "1.7",
                textAlign: "justify",
              }}>{reflection}</p>
            </div>
          )}

          {/* Application */}
          {application && (
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              borderRadius: "16px",
              padding: "30px",
              border: "1px solid rgba(34, 197, 94, 0.15)",
            }}>
              <p style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#22c55e",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "12px",
              }}>🎯 Aplicação</p>
              <p style={{
                fontSize: `${baseFontSize}px`,
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: "1.7",
                textAlign: "justify",
              }}>{application}</p>
            </div>
          )}

          {/* Prayer */}
          {prayer && (
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              borderRadius: "16px",
              padding: "30px",
              border: "1px solid rgba(59, 130, 246, 0.15)",
            }}>
              <p style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#3b82f6",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "12px",
              }}>🙏 Oração</p>
              <p style={{
                fontSize: `${baseFontSize}px`,
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: "1.7",
                fontStyle: "italic",
                textAlign: "justify",
              }}>{prayer}</p>
            </div>
          )}

          {/* Footer */}
          <div style={{
            paddingTop: "30px",
            borderTop: "1px solid rgba(245, 158, 11, 0.15)",
            textAlign: "center",
          }}>
            <p style={{
              fontSize: "26px",
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

ShareableRPGDevotionalCard.displayName = "ShareableRPGDevotionalCard";
