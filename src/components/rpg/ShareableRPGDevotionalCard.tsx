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
            left: "130px",
            width: "2px",
            background: "rgba(184, 134, 11, 0.45)",
          }}
        />
        {[260, 720, 1180, 1640].map((y) => (
          <div
            key={y}
            style={{
              position: "absolute",
              left: "60px",
              top: `${y}px`,
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.08)",
              boxShadow: "inset 0 2px 3px rgba(0,0,0,0.15)",
            }}
          />
        ))}

        <div
          style={{
            position: "relative",
            zIndex: 10,
            paddingLeft: "180px",
            paddingRight: "80px",
            paddingTop: "90px",
            paddingBottom: "70px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "28px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontSize: "22px",
                color: blue,
                letterSpacing: "6px",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Devocionalzeiros RPG
            </span>
            <span
              style={{
                fontSize: "20px",
                color: gold,
                letterSpacing: "3px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {bookName} • Cap. {chapter}
            </span>
          </div>

          <h1
            style={{
              fontSize: "62px",
              fontWeight: 700,
              color: ink,
              lineHeight: 1.1,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              margin: "10px 0 0 0",
            }}
          >
            {title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ width: "60px", height: "2px", background: gold }} />
            <span
              style={{
                fontSize: "28px",
                color: blue,
                fontWeight: 600,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {bookName} {chapter}
            </span>
          </div>

          <div style={{ flex: 1, marginTop: "10px" }}>
            {reflection && <Section label="Reflexão" text={reflection} accent={blue} />}
            {application && <Section label="Aplicação" text={application} accent={gold} />}
            {prayer && <Section label="Oração" text={prayer} accent={blue} />}
          </div>

          <div
            style={{
              borderTop: `2px solid ${gold}`,
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "22px", color: ink, fontWeight: 500, letterSpacing: "2px" }}>
              Acesse
            </span>
            <span style={{ fontSize: "26px", color: blue, fontWeight: 700, letterSpacing: "2px" }}>
              devocionalzeiros.com.br
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ShareableRPGDevotionalCard.displayName = "ShareableRPGDevotionalCard";
