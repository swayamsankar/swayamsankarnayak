import { Star } from "lucide-react";

export function RatingStars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(rating);
        return (
          <Star
            key={i}
            width={size}
            height={size}
            className={filled ? "fill-ember text-ember" : "text-white/20"}
          />
        );
      })}
    </div>
  );
}
