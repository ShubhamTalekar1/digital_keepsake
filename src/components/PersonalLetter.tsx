import { useState } from "react";

interface PersonalLetterProps {
  isRevealed: boolean;
  delay: number;
}

const PersonalLetter = ({ isRevealed, delay }: PersonalLetterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);

  const breakSeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSealBroken(true);
    setTimeout(() => setIsExpanded(true), 300);
  };

  if (!isRevealed) return null;

  const letterContent = `Dear Sandhay Makwana,

First day of the year. I hope you had a good day, maybe even better. But it's going to be the best after reading this letter.

I don't know if you like this or not, but I love it. Doing things for you makes me happy. When you smile, even just for a second, it makes everything worth it. You were the best thing that happened to me last year, and I hope that continues this year. I wish I could give this to you in person, watch your face as you read it but I'm limited to this for now. Maybe next year that won't be the case, if you wish.

I hope this year brings you joy like you've never felt before. You deserve everything under the stars, and I want to give it all to you.

Every moment with you feels like a dream I never want to wake from. You are the sunrise that greets my mornings and the starlight that guides my nights. Your laughter is my favorite melody, and your smile could light up the darkest corners of this world. I treasure the little things: the way you scrunch your nose when you're thinking, how your hand fits perfectly in mine, the warmth of your embrace that makes everything feel right.

I keep replaying our memories that night at your house when we watched movies while cuddling of course. The way time seemed to pause while we were wrapped up together, the world outside fading into nothing. And that walk we took after eating those strawberry chocolates, your favorite. What felt like an eternity somehow passed in the blink of an eye. I wish I could freeze those moments, stretch them into forever. I just wish I could spend more and more time with you.

Through every storm and every rainbow, I choose you. Today, tomorrow, and all the days that follow. You are my greatest adventure, my safest harbor.

Thank you for being unapologetically you. Thank you for choosing me. Thank you for making ordinary moments extraordinary.

I love you more than words could ever express, but I'll spend forever trying anyway.

Happy New Year to the most wonderful, beautiful person in the whole wide world.

Yours truly,
Shubham SF`;

  return (
    <div
      className="gift-reveal"
      style={{ animationDelay: `${delay}ms` }}
        >
      <div
        className={`relative cursor-pointer transition-all duration-500 ${isExpanded ? "w-full max-w-md" : "w-48 md:w-56"
          }`}
        onClick={() => sealBroken && setIsExpanded(!isExpanded)}
      >         
        {/* Letter card */}
        <div
          className={`parchment-tex t ure rounded-lg bor d er-2 border- g old/30
    shadow-xl transition-all duration-500 bg-[#FDFBF7] ${isExpanded ? "p-6 md:p-8" : "p-4"
            }`}
          style={{
            boxShadow: "0 8px 30px hsl(35 40% 50% / 0.2), inset 0 0 30px hsl(40 30% 85% / 0.5)",
          }}
        >
          {/* Wax seal */}
  { !sealBroken && (
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full wax-seal flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-10"
              onClick={breakSeal}
            >
              <span className="text-cream text-lg">♥</span>
            </div>
          )}

          {sealBroken && !isExpanded && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
              <div
                className="w-5 h-5 rounded-full wax-seal opacity-70 rotate-12"
              />
              <div
                className="w-4 h-4 rounded-full wax-seal opacity-60 -rotate-12"
              />
            </div>
          )}

          {/* Content */}
          <div className="relative">
            <h3 className="font-script text-2xl md:text-3xl text-wine mb-2 text-center">
              A Letter For You
            </h3>

            {!isExpanded && (
              <p className="font-serif text-sm text-muted-foreground text-center italic">
                {sealBroken ? "Click to read..." : "Break the seal to open"}
              </p>
            )}

            {isExpanded && (
              <div className="mt-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                <p className="font-serif text-sm md:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                  {letterContent}
                </p>
              </div>
            )}
          </div>

          {/* Decorative corners */}
          <div className="absolute top-2 left-2 text-gold/40 text-lg">❧</div>
          <div className="absolute top-2 right-2 text-gold/40 text-lg rotate-180">❧</div>
          <div className="absolute bottom-2 left-2 text-gold/40 text-lg rotate-180">❧</div>
          <div className="absolute bottom-2 right-2 text-gold/40 text-lg">❧</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLetter;
