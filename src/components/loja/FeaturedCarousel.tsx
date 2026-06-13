import { ReactNode } from "react";
import { Star } from "lucide-react";

interface Props {
  title?: string;
  children: ReactNode;
}

export const FeaturedCarousel = ({ title = "Os Mais Pedidos", children }: Props) => (
  <section className="space-y-3">
    <h3 className="font-black tracking-tight flex items-center gap-2" style={{ fontSize: "clamp(15px, 4vw, 20px)" }}>
      <Star className="w-5 h-5" style={{ color: "var(--loja-amber)", fill: "var(--loja-amber)" }} />
      {title}
    </h3>
    <div
      className="flex gap-3 overflow-x-auto loja-no-scrollbar -mx-4 px-4 pb-1 snap-x snap-proximity"
      style={{ scrollPaddingLeft: 16, overscrollBehaviorY: "auto" }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} className="snap-start shrink-0 w-[55%] sm:w-[40%] md:w-[28%]">
              {child}
            </div>
          ))
        : (
          <div className="snap-start shrink-0 w-[55%] sm:w-[40%] md:w-[28%]">{children}</div>
        )}
    </div>
  </section>
);
