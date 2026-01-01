import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { removeBackground } from "@/utils/imageProcessing";

interface GiftBoxProps {
  isOpen: boolean;
  onOpen: () => void;
  children: React.ReactNode;
}

const GiftBox = ({ isOpen, onOpen, children }: GiftBoxProps) => {
  const [boxImages, setBoxImages] = useState({ body: "", lid: "" });

  useEffect(() => {
    const loadImages = async () => {
      try {
        const body = await removeBackground("/gift-box-body.png", "white", 30);
        const lid = await removeBackground("/gift-box-lid.png", "white", 30);
        setBoxImages({ body, lid });
      } catch (error) {
        console.error("Failed to load box images", error);
        // Fallback to raw images if processing fails
        setBoxImages({ body: "/gift-box-body.png", lid: "/gift-box-lid.png" });
      }
    };
    loadImages();
  }, []);

  return (
    <div className="relative flex items-center justify-center w-[460px] h-[460px] perspective-1000">
      <div
        className={cn(
          "relative w-96 h-96 transition-all duration-1000 transform-style-3d cursor-pointer group",
          isOpen ? "scale-100" : "hover:scale-105"
        )}
        onClick={!isOpen ? onOpen : undefined}
      >
        {/* Box Body */}
        <div className="absolute inset-0 z-0">
          {boxImages.body && (
            <img
              src={boxImages.body}
              alt="Gift Box Body"
              className="w-full h-full object-contain drop-shadow-2xl scale-[2.4]"
            />
          )}
        </div>

        {/* Box Filler (Rose Petals) */}
        {isOpen && (
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <img
              src="/box-filler.jpg"
              alt="Box Filler"
              className="w-[30%] h-[33%] object-cover opacity-90 scale-[2.4]"
              style={{ maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)' }}
            />
          </div>
        )}

        {/* Box Content (Items) */}
        <div
          className={cn(
            "absolute inset-4 z-10 transition-opacity duration-500 flex items-center justify-center",
            isOpen ? "opacity-100 delay-300" : "opacity-0"
          )}
        >
          {children}
        </div>

        {/* Box Lid */}
        <div
          className={cn(
            "absolute inset-0 z-20 transition-all duration-1000 ease-in-out origin-top-left",
            isOpen
              ? "translate-x-[120%] rotate-12 opacity-0 pointer-events-none"
              : "translate-x-0 rotate-0 opacity-100"
          )}
        >
          {boxImages.lid && (
            <img
              src={boxImages.lid}
              alt="Gift Box Lid"
              className="w-full h-full object-contain drop-shadow-xl scale-[1.1]"
            />
          )}
        </div>

        {/* Click hint */}
        {!isOpen && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white/80 text-sm font-light tracking-widest animate-pulse whitespace-nowrap">
            CLICK TO OPEN
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftBox;
