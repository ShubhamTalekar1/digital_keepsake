import { useEffect, useState } from "react";

interface WelcomeOverlayProps {
  onComplete: () => void;
}

const WelcomeOverlay = ({ onComplete }: WelcomeOverlayProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 3000);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-light/95 via-cream/90 to-blush/95 backdrop-blur-sm transition-opacity duration-700 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center px-8 max-w-lg">
        <div className="mb-6 text-6xl animate-pulse-glow inline-block">💝</div>
        <h1 className="font-script text-4xl md:text-5xl lg:text-6xl text-wine mb-6 text-shadow-romantic leading-relaxed">
          To my love,
        </h1>
        <p className="font-serif text-xl md:text-2xl text-foreground/80 italic leading-relaxed">
          open this box and feel my heart inside
        </p>
        <div className="mt-8 flex justify-center gap-2">
          <span className="text-2xl animate-float">💕</span>
          <span className="text-2xl animate-float-delayed">💗</span>
          <span className="text-2xl animate-float">💕</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
