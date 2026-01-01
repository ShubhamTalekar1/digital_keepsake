import { useState } from "react";

interface PolaroidPhotosProps {
  isRevealed: boolean;
  delay: number;
}

const photos = [
  { id: 1, image: "/photos/IMG-20181121-WA0000.jpg", rotation: -5 },
  { id: 2, image: "/photos/IMG-20190213-WA0003.jpg", rotation: 3 },
  { id: 3, image: "/photos/IMG-20190412-WA0006.jpg", rotation: -2 },
  { id: 4, image: "/photos/IMG-20190705-WA0037.jpg", rotation: 6 },
  { id: 5, image: "/photos/IMG-20190827-WA0000.jpg", rotation: -4 },
  { id: 6, image: "/photos/IMG-20190930-WA0015.jpg", rotation: 2 },
  { id: 7, image: "/photos/IMG-20191224-WA0051.jpg", rotation: -7 },
  { id: 8, image: "/photos/IMG-20191224-WA0075.jpg", rotation: 4 },
  { id: 9, image: "/photos/IMG-20200113-WA0019.jpg", rotation: -3 },
  { id: 10, image: "/photos/IMG-20200423-WA0010.jpg", rotation: 5 },
  { id: 11, image: "/photos/IMG_20181114_193536.jpg", rotation: -6 },
  { id: 12, image: "/photos/SANDU 🐘 20180823_232127.jpg", rotation: 2 },
  { id: 13, image: "/photos/Screenshot_2019-12-02-11-03-16-344_com.instagram.android.png", rotation: -4 },
  { id: 14, image: "/photos/Screenshot_20210115-002724_Instagram.jpg", rotation: 3 },
];

const PolaroidPhotos = ({ isRevealed, delay }: PolaroidPhotosProps) => {
  const [expandedPhoto, setExpandedPhoto] = useState<number | null>(null);

  if (!isRevealed) return null;

  const selectedPhotoData = photos.find(p => p.id === expandedPhoto);

  return (
    <div
      className="gift-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative">
        <h3 className="font-script text-2xl text-white mb-4 text-center drop-shadow-md">
          Polaroids 📸
        </h3>

        {/* Photo stack/Grid */}
        {/* Added no-scrollbar utility classes */}
        <div
          className="relative flex flex-wrap justify-center gap-4 transition-all duration-700 max-h-[60vh] overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative cursor-pointer transition-all duration-500 hover:z-40 hover:scale-110"
              style={{
                transform: `rotate(${photo.rotation}deg)`,
                transitionDelay: `${index * 50}ms`,
              }}
              onClick={() => setExpandedPhoto(photo.id)}
            >
              {/* Photo Frame */}
              <div className="polaroid-frame p-2 pb-8 rounded-sm shadow-lg bg-white">
                <div className="w-24 h-24 md:w-28 md:h-28 overflow-hidden bg-gray-100">
                  <img
                    src={photo.image}
                    alt="Memory"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Photo Overlay (Modal Style) */}
        {expandedPhoto !== null && selectedPhotoData && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={() => setExpandedPhoto(null)}
          >
            <div
              className="relative transform transition-all duration-300 scale-100 animate-in zoom-in-95"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            >
              <div className="polaroid-frame p-4 pb-12 rounded shadow-2xl bg-white rotate-0 max-w-[90vw] max-h-[85vh]">
                <div className="overflow-hidden bg-gray-100 rounded-sm">
                  <img
                    src={selectedPhotoData.image}
                    alt="Memory"
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                </div>
              </div>

              <button
                className="absolute -top-12 right-0 text-white hover:text-rose-200 transition-colors"
                onClick={() => setExpandedPhoto(null)}
              >
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolaroidPhotos;
