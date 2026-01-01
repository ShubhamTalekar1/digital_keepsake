import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const GiftModal = ({ isOpen, onClose, children }: GiftModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "bg-black/40 backdrop-blur-sm opacity-100" : "bg-black/0 opacity-0"
        }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl transition-all duration-500 ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 md:top-0 md:right-0 z-50 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-300 hover:scale-110 hover:rotate-90"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto rounded-xl custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GiftModal;
