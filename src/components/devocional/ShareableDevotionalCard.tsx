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
          padding: "0",
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
        {/* Margin line */}
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
        {/* Holes */}
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

        {/* Content */}
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
            gap: "32px",
          }}
        >
          {/* Header */}
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
              Devocional do Dia
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
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "68px",
              fontWeight: 700,
              color: ink,
              lineHeight: 1.1,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              margin: "10px 0 0 0",
            }}
          >
            {title}
          </h1>

          {/* Verse reference */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              marginTop: "4px",
            }}
          >
            <div style={{ width: "60px", height: "2px", background: gold }} />
            <span
              style={{
                fontSize: "32px",
                color: blue,
                fontWeight: 600,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {verse.reference}
            </span>
          </div>

          {/* Phrase of the day */}
          {phraseOfDay?.text && (
            <div
              style={{
                marginTop: "20px",
                padding: "32px 36px",
                background: "rgba(29, 78, 216, 0.06)",
                borderLeft: `5px solid ${gold}`,
                borderRadius: "4px",
              }}
            >
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

          {/* Meditation */}
          <div style={{ flex: 1, marginTop: "10px" }}>
            <p
              style={{
                fontSize: "18px",
                color: blue,
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: "16px",
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

          {/* Footer */}
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
            <span
              style={{
                fontSize: "26px",
                color: blue,
                fontWeight: 700,
                letterSpacing: "2px",
              }}
            >
              devocionalzeiros.com.br
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ShareableDevotionalCard.displayName = "ShareableDevotionalCard";
