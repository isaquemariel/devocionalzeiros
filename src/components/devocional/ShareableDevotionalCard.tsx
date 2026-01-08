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

    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1920px",
          background: "linear-gradient(to bottom, #f5f0e1, #ebe5d5)",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {/* Notebook lines effect */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "60px",
            right: "60px",
            bottom: "60px",
            backgroundImage: "repeating-linear-gradient(transparent, transparent 47px, #d4c4a8 48px)",
            pointerEvents: "none",
          }}
        />

        {/* Red margin line */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "120px",
            bottom: "60px",
            width: "2px",
            background: "rgba(220, 38, 38, 0.3)",
          }}
        />

        {/* Content container */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            paddingLeft: "80px",
            justifyContent: "center",
          }}
        >
          {/* Date */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                color: "#92400e",
                textTransform: "uppercase",
                letterSpacing: "4px",
                fontWeight: "600",
              }}
            >
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "bold",
              color: "#1f2937",
              textAlign: "center",
              marginBottom: "50px",
              lineHeight: "1.2",
            }}
          >
            ✦ {title}
          </h1>

          {/* Divider */}
          <div
            style={{
              width: "60%",
              height: "2px",
              background: "linear-gradient(to right, transparent, #d4a574, transparent)",
              margin: "0 auto 50px auto",
            }}
          />

          {/* Verse */}
          <div
            style={{
              marginBottom: "50px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "32px",
                fontStyle: "italic",
                color: "#374151",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              "{verse.text}"
            </p>
            <p
              style={{
                fontSize: "24px",
                color: "#92400e",
                fontWeight: "600",
              }}
            >
              — {verse.reference}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "40%",
              height: "1px",
              background: "linear-gradient(to right, transparent, #d4a574, transparent)",
              margin: "0 auto 50px auto",
            }}
          />

          {/* Meditation */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
            }}
          >
            <p
              style={{
                fontSize: "28px",
                color: "#4b5563",
                lineHeight: "1.8",
                textAlign: "justify",
              }}
            >
              {meditation.length > 600 ? meditation.substring(0, 600) + "..." : meditation}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "40px",
              borderTop: "2px solid rgba(212, 165, 116, 0.3)",
            }}
          >
            <p
              style={{
                fontSize: "26px",
                textAlign: "center",
                fontWeight: "600",
                letterSpacing: "2px",
              }}
            >
              <span style={{ color: "#1f2937" }}>Acesse: </span>
              <span style={{ color: "#2563eb" }}>devocionalzeiros.com.br</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ShareableDevotionalCard.displayName = "ShareableDevotionalCard";
