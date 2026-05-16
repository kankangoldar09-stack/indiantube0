import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Music, Play, Pause, Volume2, VolumeX, MoreHorizontal, X } from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { getPosts, getLikedPosts, getSavedPosts, toggleLikedPost, toggleSavedPost } from "../utils/storage";
import { Post } from "../utils/storage";

interface ReelsPageProps {
  onClose?: () => void;
}

export default function ReelsPage({ onClose }: ReelsPageProps) {
  const [reels, setReels] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allPosts = getPosts();
    const videoReels = allPosts.filter(p => p.mediaType === "video");
    setReels(videoReels);
    setLikedPosts(getLikedPosts());
    setSavedPosts(getSavedPosts());
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentIndex, isPlaying]);

  const handleToggleLike = (postId: string) => {
    toggleLikedPost(postId);
    setLikedPosts(getLikedPosts());
  };

  const handleToggleSave = (postId: string) => {
    toggleSavedPost(postId);
    setSavedPosts(getSavedPosts());
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    containerRef.current!.dataset.startY = touch.clientY.toString();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startY = parseFloat(containerRef.current!.dataset.startY || "0");
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    if (diff > 50 && currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (diff < -50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  if (reels.length === 0) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full z-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        )}
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Play className="w-10 h-10 text-gray-600" />
        </div>
        <h2 className="text-white text-lg font-bold mb-2">No Reels Yet</h2>
        <p className="text-gray-400 text-center px-6">Create your first reel to see it here!</p>
      </div>
    );
  }

  const currentReel = reels[currentIndex];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black z-50"
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-black/50 rounded-full z-50"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        src={currentReel.media}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        autoPlay
        muted={isMuted}
        onClick={togglePlay}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center">
            <Play className="w-10 h-10 text-white ml-1" />
          </div>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5">
        <button 
          onClick={() => handleToggleLike(currentReel.id)}
          className="flex flex-col items-center gap-1"
        >
          <Heart 
            className={`w-8 h-8 ${
              likedPosts.includes(currentReel.id) 
                ? "text-pink-500 fill-pink-500" 
                : "text-white"
            }`} 
          />
          <span className="text-white text-xs font-medium">
            {formatNumber(likedPosts.includes(currentReel.id) ? currentReel.likes + 1 : currentReel.likes)}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <MessageCircle className="w-8 h-8 text-white" />
          <span className="text-white text-xs font-medium">{currentReel.comments}</span>
        </button>

        <button 
          onClick={() => handleToggleSave(currentReel.id)}
          className="flex flex-col items-center gap-1"
        >
          <Bookmark 
            className={`w-8 h-8 ${
              savedPosts.includes(currentReel.id) 
                ? "text-pink-500 fill-pink-500" 
                : "text-white"
            }`} 
          />
        </button>

        <button className="flex flex-col items-center gap-1">
          <Share2 className="w-8 h-8 text-white" />
        </button>

        <button onClick={toggleMute} className="flex flex-col items-center gap-1">
          {isMuted ? (
            <VolumeX className="w-8 h-8 text-white" />
          ) : (
            <Volume2 className="w-8 h-8 text-white" />
          )}
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-20 left-3 right-16">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-10 h-10 border-2 border-white">
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white text-lg">
              {currentReel.userAvatar || currentReel.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-bold text-sm">@{currentReel.username}</p>
            {currentReel.location && (
              <p className="text-gray-300 text-xs">{currentReel.location}</p>
            )}
          </div>
          <button className="px-4 py-1 bg-pink-500 text-white text-sm font-semibold rounded-full ml-2">
            Follow
          </button>
        </div>

        <p className="text-white text-sm mb-2 line-clamp-2">
          {currentReel.caption}
        </p>

        {currentReel.hashtags && (
          <p className="text-cyan-400 text-xs mb-2">{currentReel.hashtags}</p>
        )}

        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-white" />
          <div className="overflow-hidden flex-1">
            <p className="text-white text-xs whitespace-nowrap animate-marquee">
              {currentReel.hashtags || "Original Sound"} • {currentReel.username}
            </p>
          </div>
        </div>
      </div>

      {/* Reel Counter */}
      <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full">
        <span className="text-white text-sm font-medium">{currentIndex + 1} / {reels.length}</span>
      </div>

      {/* Navigation Dots */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {reels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-6 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}