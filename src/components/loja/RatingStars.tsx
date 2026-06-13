import { Star } from "lucide-react";

// Deterministic placeholder rating from a string id (until real reviews exist)
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

export const getPlaceholderRating = (id: string) => {
  const h = hash(id);
  const rating = 4.6 + ((h % 5) * 0.1); // 4.6 - 5.0
  const count = 12 + (h % 88); // 12 - 99
  return { rating: Math.round(rating * 10) / 10, count };
};

interface Props {
  rating: number;
  count: number;
  size?: "sm" | "md";
}

export const RatingStars = ({ rating, count, size = "sm" }: Props) => {
  const px = size === "sm" ? "clamp(11px, 2.8vw, 14px)" : "clamp(14px, 3.5vw, 17px)";
  const txt = size === "sm" ? "clamp(10px, 2.5vw, 12px)" : "clamp(12px, 3vw, 14px)";
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}
            style={{ width: px, height: px }}
          />
        ))}
      </div>
      <span className="font-bold text-amber-400" style={{ fontSize: txt }}>{rating.toFixed(1)}</span>
      <span className="text-muted-foreground" style={{ fontSize: txt }}>({count})</span>
    </div>
  );
};
