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
  phraseOfDay?: {
    text: string;
    author?: string;
  };
}

export const ShareableDevotionalCard = forwardRef<HTMLDivElement, ShareableDevotionalCardProps>(
  ({ title, verse, meditation, date, phraseOfDay }, ref) => {
    const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    const baseFontSize = meditation.length > 900 ? 26 : meditation.length > 600 ? 28 : 30;

    const cream = "#fbf6e9";
    const ink = "#1e293b";
    const blue = "#1d4ed8";
    const gold = "#b8860b";
    const ruleColor = "rgba(29, 78, 216, 0.18)";

    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1920px",
          background: cream,
          padding: 0,
          position: "relative",
          fontFamily: "'DM Sans', 'Karla', system-ui, sans-serif",
          overflow: "hidden",
          color: ink,
        }}
      >
        {/* Ruled paper lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 63px, ${ruleColor} 63px, ${ruleColor} 64px)`,
            pointerEvents: "none",
          }}
        />
        {/* Gold margin line */}
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

        {/* Content */}
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
            gap: "28px",
          }}
        >
          {/* Header centralized */}
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 700,
                color: blue,
                lineHeight: 1.05,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "1px",
                margin: 0,
              }}
            >
              Devocional do Dia
            </h1>
            <div
              style={{
                margin: "18px auto 0",
                width: "120px",
                height: "2px",
                background: gold,
              }}
            />
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
              {formattedDate}
            </p>
          </div>

          {/* Title */}
          {title && (
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
          )}

          {/* Verse reference + text */}
          <div style={{ marginTop: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <div style={{ width: "60px", height: "2px", background: gold, flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "34px",
                  color: blue,
                  fontWeight: 600,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                  whiteSpace: "nowrap",
                }}
              >
                {verse.reference}
              </span>
            </div>
            {verse.text && (
              <p
                style={{
                  fontSize: `${baseFontSize}px`,
                  lineHeight: 1.65,
                  color: "#334155",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                  margin: "20px 0 0 0",
                }}
              >
                “{verse.text}”
              </p>
            )}
          </div>

          {/* Meditation */}
          <div style={{ marginTop: "32px" }}>
            <p
              style={{
                fontSize: "32px",
                color: blue,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                margin: "0 0 20px 0",
              }}
            >
              Meditação
            </p>
            <p
              style={{
                fontSize: `${baseFontSize}px`,
                color: "#334155",
                lineHeight: 1.65,
                margin: 0,
                whiteSpace: "pre-line",
                textAlign: "justify",
              }}
            >
              {meditation}
            </p>
          </div>

          {/* Phrase of the day - destaque */}
          {phraseOfDay?.text && (
            <div
              style={{
                marginTop: "auto",
                padding: "32px 36px",
                background: "rgba(29, 78, 216, 0.06)",
                borderLeft: `5px solid ${gold}`,
                borderRadius: "4px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  color: gold,
                  fontWeight: 700,
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  margin: "0 0 12px 0",
                }}
              >
                Frase do Dia
              </p>
              <p
                style={{
                  fontSize: "34px",
                  lineHeight: 1.4,
                  color: ink,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                “{phraseOfDay.text}”
              </p>
              {phraseOfDay.author && (
                <p
                  style={{
                    marginTop: "14px",
                    fontSize: "20px",
                    color: gold,
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  — {phraseOfDay.author}
                </p>
              )}
            </div>
          )}

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

ShareableDevotionalCard.displayName = "ShareableDevotionalCard";
