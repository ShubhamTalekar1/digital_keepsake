import { useState, useCallback, useEffect } from "react";
import GiftBox from "@/components/GiftBox";
import GiftModal from "@/components/GiftModal";
import PersonalLetter from "@/components/PersonalLetter";
import PolaroidPhotos from "@/components/PolaroidPhotos";
import AffirmationJar from "@/components/AffirmationJar";
import ExperienceCoupons from "@/components/ExperienceCoupons";
import CassetteTapePlayer from "@/components/CassetteTapePlayer";
import { removeBackground } from "@/utils/imageProcessing";

const Index = () => {
  const [boxOpened, setBoxOpened] = useState(false);
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [processedImages, setProcessedImages] = useState<Record<string, string>>({});

  const handleOpenBox = useCallback(() => {
    setBoxOpened(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedGift(null);
  }, []);

  useEffect(() => {
    const processImages = async () => {
      const images: Record<string, { src: string; color: 'white' | 'green'; tolerance?: number }> = {
        letter: { src: "/vintage-envelope-white.png", color: 'white' },
        photos: { src: "/polaroid-stack-white.png", color: 'white', tolerance: 10 },
        jar: { src: "/mason-jar-new.png", color: 'white' },
        coupons: { src: "/vintage-ticket-white.png", color: 'white' },
        tape: { src: "/cassette-tape-new.png", color: 'white' },
      };

      const processed: Record<string, string> = {};

      for (const [key, { src, color, tolerance }] of Object.entries(images)) {
        try {
          processed[key] = await removeBackground(src, color, tolerance);
        } catch (error) {
          console.error("Failed to process image:", error);
          processed[key] = src; // Fallback to original
        }
      }

      setProcessedImages(processed);
    };

    processImages();
  }, []);

  const renderGiftContent = () => {
    switch (selectedGift) {
      case "letter":
        return <PersonalLetter isRevealed={true} delay={0} />;
      case "photos":
        return <PolaroidPhotos isRevealed={true} delay={0} />;
      case "jar":
        return <AffirmationJar isRevealed={true} delay={0} />;
      case "coupons":
        return <ExperienceCoupons isRevealed={true} delay={0} />;
      case "tape":
        return <CassetteTapePlayer isRevealed={true} delay={0} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-rose-200 to-rose-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float text-rose-400/30"
            style={{
              left: `${Math.random() * 100}% `,
              top: `${Math.random() * 100}% `,
              animationDelay: `${Math.random() * 5} s`,
              fontSize: `${Math.random() * 20 + 10} px`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="z-10 text-center">
        <h1 className="font-script text-5xl md:text-7xl text-wine mb-8 animate-fade-in drop-shadow-sm">
          For My Sandu
        </h1>

        <div className="mb-12 animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <GiftBox isOpen={boxOpened} onOpen={handleOpenBox}>
            <div className="relative w-full h-full">
              {/* Letter Thumbnail - Bottom Left, tilted right */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedGift("letter"); }}
                className="absolute bottom-4 left-4 transform rotate-12 hover:scale-110 transition-all duration-300 group z-20"
              >
                {processedImages.letter && (
                  <img
                    src={processedImages.letter}
                    alt="Vintage Envelope"
                    className="w-48 h-auto drop-shadow-lg group-hover:drop-shadow-xl transition-all"
                  />
                )}
              </button>

              {/* Photos Thumbnail - Top Right, tilted left */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedGift("photos"); }}
                className="absolute top-4 right-4 transform -rotate-6 hover:scale-110 transition-all duration-300 group z-10"
              >
                {processedImages.photos && (
                  <img
                    src={processedImages.photos}
                    alt="Polaroid Stack"
                    className="w-44 h-auto drop-shadow-lg group-hover:drop-shadow-xl transition-all"
                  />
                )}
              </button>

              {/* Jar Thumbnail - Top Left, tilted right */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedGift("jar"); }}
                className="absolute top-8 left-8 transform rotate-6 hover:scale-110 transition-all duration-300 group z-30"
              >
                {processedImages.jar && (
                  <img
                    src={processedImages.jar}
                    alt="Mason Jar"
                    className="w-36 h-auto drop-shadow-lg group-hover:drop-shadow-xl transition-all"
                  />
                )}
              </button>

              {/* Coupons Thumbnail - Bottom Right, tilted left */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedGift("coupons"); }}
                className="absolute bottom-8 right-8 transform -rotate-12 hover:scale-110 transition-all duration-300 group z-20"
              >
                {processedImages.coupons && (
                  <img
                    src={processedImages.coupons}
                    alt="Vintage Ticket"
                    className="w-40 h-auto drop-shadow-lg group-hover:drop-shadow-xl transition-all"
                  />
                )}
              </button>

              {/* Tape Thumbnail - Center, slight tilt */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedGift("tape"); }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-3 hover:scale-110 transition-all duration-300 group z-40"
              >
                {processedImages.tape && (
                  <img
                    src={processedImages.tape}
                    alt="Cassette Tape"
                    className="w-48 h-auto drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
                  />
                )}
              </button>
            </div>
          </GiftBox>
        </div>

        {/* Gift Modal */}
        <GiftModal isOpen={!!selectedGift} onClose={handleCloseModal}>
          <div className="p-4 md:p-8 flex items-center justify-center min-h-[50vh]">
            {renderGiftContent()}
          </div>
        </GiftModal>

        {/* Footer */}
        <footer className="mt-16 text-center animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span className="text-rose">♥</span>
            <p className="font-serif text-sm italic">Made with love</p>
            <span className="text-rose">♥</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
