import { useState } from "react";
import { toPng } from 'html-to-image';

interface ExperienceCouponsProps {
  isRevealed: boolean;
  delay: number;
}

const coupons = [
  {
    id: 1,
    title: "Make me come to you",
    subtitle: "Anytime, anywhere!",
    emoji: "🚗",
  },
  {
    id: 2,
    title: "Movie night together",
    subtitle: "Your pick, my cuddles",
    emoji: "🎬",
  },
  {
    id: 3,
    title: "Chocolate strawberries date",
    subtitle: "Midnight run optional",
    emoji: "🍓",
  },
  {
    id: 4,
    title: "Dance in the rain",
    subtitle: "No umbrella allowed",
    emoji: "💃",
  },
  {
    id: 5,
    title: "Whisper secrets",
    subtitle: "Under the stars",
    emoji: "🌟",
  },
];

const ExperienceCoupons = ({ isRevealed, delay }: ExperienceCouponsProps) => {
  const [redeemedCoupons, setRedeemedCoupons] = useState<Set<number>>(() => {
    const saved = localStorage.getItem("redeemedCoupons");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [confettiId, setConfettiId] = useState<number | null>(null);

  const redeemCoupon = (id: number) => {
    if (redeemedCoupons.has(id)) return;

    setConfettiId(id);
    setTimeout(() => {
      setRedeemedCoupons((prev) => {
        const newSet = new Set([...prev, id]);
        localStorage.setItem("redeemedCoupons", JSON.stringify([...newSet]));
        return newSet;
      });
      setConfettiId(null);
    }, 500);
  };

  const handleShare = async (e: React.MouseEvent, coupon: typeof coupons[0]) => {
    e.stopPropagation(); // Prevent triggering parent click if any

    // Auto-redeem
    redeemCoupon(coupon.id);

    // Share logic
    const text = `I'm redeeming my coupon: ${coupon.title} ${coupon.emoji}\n"${coupon.subtitle}"`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Coupon Redemption!',
          text: text,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(text);
      alert("Coupon copied to clipboard! Send it to redeem! 💌");
    }
  };

  const handleDownload = async (e: React.MouseEvent, coupon: typeof coupons[0]) => {
    e.stopPropagation();
    console.log("Download clicked for:", coupon.id);

    const element = document.getElementById(`coupon-card-${coupon.id}`);
    if (!element) {
      console.error("Element not found:", `coupon-card-${coupon.id}`);
      return;
    }

    try {
      console.log("Generating PNG...");
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#FFFDD0', // Force the cream background color
        filter: (node) => {
          // Exclude the download button from the image
          return node.tagName !== 'BUTTON';
        }
      });

      console.log("PNG generated, downloading...");
      const link = document.createElement('a');
      link.download = `coupon-${coupon.title.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      // Auto-redeem after download starts
      redeemCoupon(coupon.id);
    } catch (err) {
      console.error('Error generating coupon image:', err);
      alert("Oops! Couldn't download the coupon. Please try again.");
    }
  };

  if (!isRevealed) return null;

  return (
    <div
      className="gift-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="font-script text-2xl text-white mb-4 text-center drop-shadow-md">
        Experience Vouchers 🎟️
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {coupons.map((coupon, index) => (
          <div
            key={coupon.id}
            className={`relative transition-all duration-300 ${redeemedCoupons.has(coupon.id)
              ? "opacity-70 scale-95"
              : "hover:scale-105 hover:shadow-lg"
              }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Ticket card */}
            <div
              id={`coupon-card-${coupon.id}`}
              className="relative bg-[#FFFDD0] border-2 border-dashed border-gold/50 rounded-lg p-4 overflow-hidden flex flex-col h-full"
              style={{
                boxShadow: "0 4px 15px hsl(38 50% 50% / 0.15)",
              }}
            >
              {/* Perforation effect on sides */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-background rounded-r-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-background rounded-l-full" />

              {/* Content */}
              <div className="text-center relative z-10 flex-grow">
                <span className="text-3xl mb-2 block">{coupon.emoji}</span>
                <p className="font-script text-xl text-wine font-semibold leading-tight">
                  Redeem:
                </p>
                <p className="font-serif text-sm text-foreground mt-1 font-medium">
                  {coupon.title}
                </p>
                <p className="font-serif text-xs text-muted-foreground italic mt-1">
                  ({coupon.subtitle})
                </p>
              </div>

              {/* Footer: Expiry & Download */}
              <div className="mt-3 pt-2 border-t border-gold/20 flex flex-col items-center gap-2 relative z-20">
                <span className="font-mono text-[10px] text-muted-foreground/70">
                  Expires: 31-12-2026
                </span>

                {!redeemedCoupons.has(coupon.id) && (
                  <button
                    onClick={(e) => handleDownload(e, coupon)}
                    className="bg-rose text-white text-xs px-3 py-1 rounded-full shadow-sm hover:bg-rose-dark transition-colors flex items-center gap-1"
                  >
                    <span>⬇️</span> Download to Redeem
                  </button>
                )}
              </div>

              {/* Redeemed stamp */}
              {redeemedCoupons.has(coupon.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-cream/80 z-30 pointer-events-none">
                  <div
                    className="w-20 h-20 rounded-full border-4 border-rose flex items-center justify-center transform -rotate-12"
                    style={{ borderStyle: "double" }}
                  >
                    <span className="font-script text-rose text-lg">Used!</span>
                  </div>
                </div>
              )}

              {/* Confetti effect */}
              {confettiId === coupon.id && (
                <div className="absolute inset-0 pointer-events-none z-40">
                  {[...Array(12)].map((_, i) => (
                    <span
                      key={i}
                      className="absolute text-lg animate-confetti"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 200}ms`,
                      }}
                    >
                      {["✨", "💕", "🎉", "💗"][i % 4]}
                    </span>
                  ))}
                </div>
              )}

              {/* Decorative corner */}
              <div className="absolute top-1 right-2 text-gold/40 text-xs">★</div>
              <div className="absolute bottom-1 left-2 text-gold/40 text-xs">★</div>
            </div>
          </div>
        ))}
      </div>

      {/* Reset Button (for testing/re-gifting) */}
      {redeemedCoupons.size > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to reset all coupons?")) {
                setRedeemedCoupons(new Set());
                localStorage.removeItem("redeemedCoupons");
              }
            }}
            className="text-xs text-white/50 hover:text-white underline font-serif"
          >
            Reset All Coupons
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceCoupons;
