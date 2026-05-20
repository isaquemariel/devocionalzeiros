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
                fontSize: "58px",
                fontWeight: 500,
                color: blue,
                lineHeight: 1.1,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "6px",
                textTransform: "uppercase",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              Devocional do Dia
            </h1>
            <div
              style={{
                margin: "20px auto 0",
                width: "120px",
                height: "1px",
                background: gold,
              }}
            />
            <p
              style={{
                marginTop: "16px",
                fontSize: "20px",
                color: gold,
                letterSpacing: "5px",
                fontWeight: 400,
                textTransform: "uppercase",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {formattedDate}
            </p>
          </div>

          {/* Title */}
          {title && (
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 500,
                color: ink,
                lineHeight: 1.2,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "3px",
                textTransform: "uppercase",
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
              <div style={{ width: "60px", height: "1px", background: gold, flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "32px",
                  color: blue,
                  fontWeight: 500,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
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
                  fontWeight: 400,
                  fontStyle: "italic",
                  margin: "20px 0 0 0",
                }}
              >
                “{verse.text}”
              </p>
            )}
          </div>

          {/* Meditation */}
          <div>
            <p
              style={{
                fontSize: "32px",
                color: blue,
                fontWeight: 500,
                letterSpacing: "5px",
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
                fontWeight: 400,
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
                padding: "32px 36px",

                background: "rgba(29, 78, 216, 0.06)",
                borderLeft: `3px solid ${gold}`,
                borderRadius: "4px",
              }}
            >
              <p
                style={{
                  fontSize: "22px",
                  color: gold,
                  fontWeight: 500,
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  margin: "0 0 14px 0",
                }}
              >
                Frase do Dia
              </p>
              <p
                style={{
                  fontSize: "32px",
                  lineHeight: 1.45,
                  color: ink,
                  fontWeight: 400,
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
                    fontSize: "18px",
                    color: gold,
                    fontWeight: 400,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
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
              borderTop: `1px solid ${gold}`,
              paddingTop: "26px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                color: ink,
                fontWeight: 400,
                letterSpacing: "5px",
                textTransform: "uppercase",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                margin: 0,
              }}
            >
              Acesse a plataforma completa
            </p>
            <p
              style={{
                marginTop: "10px",
                fontSize: "30px",
                color: blue,
                fontWeight: 500,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
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
