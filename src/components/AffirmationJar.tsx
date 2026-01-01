import { useState, useCallback } from "react";
import { affirmations } from "../data/affirmations";

interface AffirmationJarProps {
  isRevealed: boolean;
  delay: number;
}



const AffirmationJar = ({ isRevealed, delay }: AffirmationJarProps) => {
  const [pulledAffirmations, setPulledAffirmations] = useState<string[]>(() => {
    const saved = localStorage.getItem("pulledAffirmations");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentAffirmation, setCurrentAffirmation] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isFluttering, setIsFluttering] = useState(false);

  const remainingAffirmations = affirmations.filter(
    (a) => !pulledAffirmations.includes(a)
  );

  const pullAffirmation = useCallback(() => {
    if (remainingAffirmations.length === 0) return;

    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setIsFluttering(true);

      const randomIndex = Math.floor(Math.random() * remainingAffirmations.length);
      const selected = remainingAffirmations[randomIndex];
      setCurrentAffirmation(selected);

      setPulledAffirmations((prev) => {
        const newPulled = [...prev, selected];
        localStorage.setItem("pulledAffirmations", JSON.stringify(newPulled));
        return newPulled;
      });

      setTimeout(() => {
        setIsFluttering(false);
      }, 2000);
    }, 500);
  }, [remainingAffirmations]);

  if (!isRevealed) return null;

  const isEmpty = remainingAffirmations.length === 0;

  return (
    <div
      className="gift-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="font-script text-2xl text-white mb-4 text-center drop-shadow-md">
        Jar of Love Notes 💌
      </h3>

      <div className="flex flex-col items-center gap-4">
        {/* Jar */}
        <div
          className={`relative cursor-pointer transition-transform duration-300 ${isShaking ? "animate-wiggle" : "hover:scale-105"
            }`}
          onClick={pullAffirmation}
        >
          {/* Cork lid */}
          <div
            className="relative z-10 w-20 h-6 mx-auto rounded-t-lg"
            style={{
              background: "linear-gradient(180deg, hsl(30 40% 50%), hsl(30 35% 40%))",
              boxShadow: "inset 0 2px 4px hsl(30 50% 60% / 0.3)",
            }}
          />

          {/* Jar body */}
          <div className="glass-jar w-32 h-40 rounded-b-3xl rounded-t-lg border-2 border-cream-dark/50 relative overflow-hidden">
            {/* Glass shine */}
            <div className="absolute left-2 top-4 w-1 h-20 bg-gradient-to-b from-white/40 to-transparent rounded-full" />

            {/* Paper slips inside */}
            {!isEmpty && (
              <div className="absolute inset-x-4 bottom-4 top-8 flex flex-wrap gap-1 justify-center items-end overflow-hidden">
                {remainingAffirmations.slice(0, 8).map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-12 bg-cream rounded-sm shadow-sm"
                    style={{
                      transform: `rotate(${(i - 4) * 8}deg)`,
                      opacity: 0.8 - i * 0.05,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Empty state */}
            {isEmpty && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-rose/50 text-3xl">💕</span>
              </div>
            )}
          </div>

          {/* Label */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-cream px-3 py-1 rounded-full shadow-md border border-gold/30">
            <span className="font-script text-xs text-wine">
              {isEmpty ? "Empty!" : `${remainingAffirmations.length} left`}
            </span>
          </div>
        </div>

        {/* Pull instruction or empty message */}
        {!isEmpty && !currentAffirmation && (
          <p className="font-serif text-sm text-white/90 text-center italic drop-shadow-sm">
            Click the jar to pull a love note
          </p>
        )}

        {isEmpty && !currentAffirmation && (
          <div className="text-center parchment-texture rounded-lg p-4 shadow-md max-w-xs">
            <p className="font-script text-xl text-wine">
              All my love, pulled just for you 💕
            </p>
            <button
              onClick={() => {
                setPulledAffirmations([]);
                setCurrentAffirmation(null);
              }}
              className="mt-3 font-serif text-sm text-rose hover:text-rose-dark transition-colors underline"
            >
              Refill the jar
            </button>
          </div>
        )}

        {/* Current affirmation */}
        {currentAffirmation && (
          <div
            className={`relative max-w-xs transition-all duration-500 ${isFluttering ? "animate-flutter" : ""
              }`}
          >
            <div
              className="parchment-texture rounded-lg p-6 shadow-lg border border-gold/30 bg-[#FDFBF7]"
              style={{
                transform: "rotate(-2deg)",
              }}
            >
              <p className="font-script text-xl text-wine text-center leading-relaxed">
                "{currentAffirmation}"
              </p>
              <div className="mt-3 text-center">
                <span className="text-rose text-2xl">💗</span>
              </div>
            </div>

            {/* Pull another button */}
            {!isEmpty && (
              <button
                onClick={pullAffirmation}
                className="mt-4 mx-auto block font-serif text-sm text-rose hover:text-rose-dark transition-colors"
              >
                Pull another note →
              </button>
            )}
          </div>
        )}

        {/* Progress Counter */}
        <div className="mt-4 text-center">
          <p className="font-serif text-sm text-white/80 drop-shadow-sm">
            {remainingAffirmations.length} notes remaining
          </p>
        </div>
      </div>
    </div>
  );
};

export default AffirmationJar;
