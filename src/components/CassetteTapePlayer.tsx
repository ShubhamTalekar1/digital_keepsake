import { useState, useRef, useEffect } from "react";

interface CassetteTapePlayerProps {
  isRevealed: boolean;
  delay: number;
}

const tracks = [
  { id: 1, title: "Can't Help Falling In Love", artist: "Elvis Presley", src: "/audio/cant_help_falling_in_love.mp3" },
  { id: 2, title: "Dooron Dooron", artist: "Unknown Artist", src: "/audio/dooron_dooron.mp3" },
  { id: 3, title: "Perfect", artist: "Ed Sheeran", src: "/audio/perfect.mp3" },
  { id: 4, title: "Qayde Se", artist: "Unknown Artist", src: "/audio/qayde_se.mp3" },
  { id: 5, title: "Yeh Fitoor Mera", artist: "Arijit Singh", src: "/audio/yeh_fitoor_mera.mp3" },
];

const CassetteTapePlayer = ({ isRevealed, delay }: CassetteTapePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(tracks[currentTrack].src);

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      // Update source if track changed
      if (audioRef.current.src !== window.location.origin + tracks[currentTrack].src) {
        audioRef.current.src = tracks[currentTrack].src;
        if (isPlaying) {
          audioRef.current.play().catch(e => console.log("Playback error:", e));
        }
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log("Playback failed (user interaction needed):", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle track ending
  useEffect(() => {
    const handleEnded = () => {
      forward();
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, [currentTrack]); // Re-bind if audio instance changes (though we try to keep it stable)


  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const rewind = () => {
    setCurrentTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    // Keep playing if already playing
  };

  const forward = () => {
    setCurrentTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  if (!isRevealed) return null;

  return (
    <div
      className="gift-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="font-script text-2xl text-white mb-4 text-center drop-shadow-md">
        Mixtape for you 🎵
      </h3>

      <div className="flex flex-col items-center gap-4">
        {/* Cassette tape */}
        <div
          className={`relative cursor-pointer transition-transform duration-300 ${isPlaying ? "scale-105" : "hover:scale-102"
            }`}
          onClick={togglePlay}
        >
          {/* Cassette body */}
          <div className="cassette-body rounded-lg p-4 w-56 h-36 relative shadow-xl">
            {/* Label */}
            <div className="absolute inset-x-4 top-3 h-16 bg-cream rounded flex items-center justify-center">
              <div className="text-center px-2">
                <p className="font-script text-wine text-sm truncate max-w-[180px]">
                  {tracks[currentTrack].title}
                </p>
                <p className="font-serif text-[10px] text-muted-foreground mt-1 truncate max-w-[180px]">
                  {tracks[currentTrack].artist}
                </p>
              </div>
            </div>

            {/* Spools */}
            <div className="absolute bottom-4 left-8 w-10 h-10 rounded-full bg-foreground/90 border-4 border-foreground/70 flex items-center justify-center">
              <div
                className={`w-4 h-4 rounded-full bg-cream ${isPlaying ? "animate-spin-slow" : ""
                  }`}
              >
                <div className="w-2 h-2 bg-foreground/80 rounded-full mx-auto mt-1" />
              </div>
            </div>
            <div className="absolute bottom-4 right-8 w-10 h-10 rounded-full bg-foreground/90 border-4 border-foreground/70 flex items-center justify-center">
              <div
                className={`w-4 h-4 rounded-full bg-cream ${isPlaying ? "animate-spin-slow" : ""
                  }`}
              >
                <div className="w-2 h-2 bg-foreground/80 rounded-full mx-auto mt-1" />
              </div>
            </div>

            {/* Tape window */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-foreground/40 rounded-sm border border-foreground/30" />

            {/* Screw holes */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-foreground/50" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-foreground/50" />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-foreground/50" />
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-foreground/50" />
          </div>

          {/* Play indicator */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-rose text-cream px-3 py-1 rounded-full text-xs font-script shadow-md whitespace-nowrap">
            {isPlaying ? "♪ Playing..." : "Click to play"}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              rewind();
            }}
            className="w-10 h-10 rounded-full bg-cream border-2 border-gold/50 flex items-center justify-center hover:bg-gold/20 transition-colors shadow-md"
          >
            <span className="text-wine">⏮</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-14 h-14 rounded-full bg-rose text-cream flex items-center justify-center hover:bg-rose-dark transition-colors shadow-lg"
          >
            <span className="text-2xl">{isPlaying ? "⏸" : "▶"}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              forward();
            }}
            className="w-10 h-10 rounded-full bg-cream border-2 border-gold/50 flex items-center justify-center hover:bg-gold/20 transition-colors shadow-md"
          >
            <span className="text-wine">⏭</span>
          </button>
        </div>

        {/* Now playing */}
        <div className="text-center">
          <p className="font-script text-lg text-white drop-shadow-md">
            {tracks[currentTrack].title}
          </p>
          <p className="font-serif text-sm text-white/80 drop-shadow-sm">
            {tracks[currentTrack].artist}
          </p>
        </div>

        {/* Playlist toggle */}
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="font-serif text-sm text-white hover:text-rose-200 transition-colors underline drop-shadow-sm"
        >
          {showPlaylist ? "Hide" : "Show"} Full Playlist
        </button>

        {/* Playlist */}
        {showPlaylist && (
          <div className="w-full max-w-xs parchment-texture rounded-lg p-4 shadow-md">
            <p className="font-script text-lg text-wine mb-2 text-center border-b border-gold/30 pb-2">
              ♪ Tracklist ♪
            </p>
            <ul className="space-y-2">
              {tracks.map((track, index) => (
                <li
                  key={track.id}
                  className={`font-serif text-sm cursor-pointer transition-all duration-200 p-2 rounded ${index === currentTrack
                    ? "bg-rose/20 text-wine font-medium"
                    : "text-foreground/70 hover:bg-gold/10"
                    }`}
                  onClick={() => {
                    setCurrentTrack(index);
                    setIsPlaying(true);
                  }}
                >
                  <span className="text-gold mr-2">{index + 1}.</span>
                  {track.title}
                  {index === currentTrack && isPlaying && (
                    <span className="ml-2 text-rose">♪</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CassetteTapePlayer;
