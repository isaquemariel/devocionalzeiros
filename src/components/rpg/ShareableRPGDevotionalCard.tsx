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
    const baseFontSize = totalText.length > 1200 ? 22 : totalText.length > 800 ? 24 : 26;

    const cream = "#fbf6e9";
    const ink = "#1e293b";
    const blue = "#1d4ed8";
    const gold = "#b8860b";
    const ruleColor = "rgba(29, 78, 216, 0.18)";

    const Section = ({ label, text, accent }: { label: string; text: string; accent: string }) => (
      <div style={{ marginBottom: "26px" }}>
        <p
          style={{
            fontSize: "18px",
            color: accent,
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: `${baseFontSize}px`,
            color: "#334155",
            lineHeight: 1.65,
            margin: 0,
            textAlign: "justify",
            whiteSpace: "pre-line",
          }}
        >
          {text}
        </p>
      </div>
    );

    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1920px",
          background: cream,
          position: "relative",
          fontFamily: "'DM Sans', 'Karla', system-ui, sans-serif",
          overflow: "hidden",
          color: ink,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 63px, ${ruleColor} 63px, ${ruleColor} 64px)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "90px",
            width: "2px",
            background: "rgba(184, 134, 11, 0.45)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            paddingLeft: "120px",
            paddingRight: "80px",
            paddingTop: "100px",
            paddingBottom: "80px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "26px",
          }}
        >
          {/* Header centralized */}
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "68px",
                fontWeight: 700,
                color: blue,
                lineHeight: 1.05,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "1px",
                margin: 0,
              }}
            >
              Devocionalzeiros RPG
            </h1>
            <div style={{ margin: "18px auto 0", width: "120px", height: "2px", background: gold }} />
            <p
              style={{
                marginTop: "16px",
                fontSize: "22px",
                color: gold,
                letterSpacing: "5px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {bookName} • Capítulo {chapter}
            </p>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: "48px",
              fontWeight: 600,
              color: ink,
              lineHeight: 1.15,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              margin: "10px 0 0 0",
              textAlign: "center",
            }}
          >
            {title}
          </h2>

          {/* Reference - lateralizado, sem quebrar linha */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ width: "60px", height: "2px", background: gold, flexShrink: 0 }} />
            <span
              style={{
                fontSize: "32px",
                color: blue,
                fontWeight: 600,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                whiteSpace: "nowrap",
              }}
            >
              {bookName} {chapter}
            </span>
          </div>

          {/* Sections */}
          <div style={{ flex: 1, marginTop: "8px" }}>
            {reflection && <Section label="Reflexão" text={reflection} accent={blue} />}
            {application && <Section label="Aplicação" text={application} accent={gold} />}
            {prayer && <Section label="Oração" text={prayer} accent={blue} />}
          </div>

          {/* CTA Footer */}
          <div
            style={{
              borderTop: `2px solid ${gold}`,
              paddingTop: "26px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                color: ink,
                fontWeight: 500,
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Acesse a plataforma completa
            </p>
            <p
              style={{
                marginTop: "10px",
                fontSize: "32px",
                color: blue,
                fontWeight: 700,
                letterSpacing: "2px",
              }}
            >
              devocionalzeiros.com.br
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ShareableRPGDevotionalCard.displayName = "ShareableRPGDevotionalCard";
