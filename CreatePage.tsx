import { useState, useRef } from "react";
import { X, Camera, Video, Image, Music, Type, Hash, MapPin, ChevronDown, Loader2, Play, Pause, Volume2, VolumeX, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { savePost } from "../utils/storage";
import { User } from "../App";

interface CreatePageProps {
  setActiveTab: (tab: string) => void;
  user: User;
}

export default function CreatePage({ setActiveTab, user }: CreatePageProps) {
  const [mediaType, setMediaType] = useState<"photo" | "video" | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showMediaPicker, setShowMediaPicker] = useState(true);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith("video/");
      setMediaType(isVideo ? "video" : "photo");
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedFile(event.target?.result as string);
        setShowMediaPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!selectedFile || !mediaType) return;
    
    setPosting(true);
    
    setTimeout(() => {
      const newPost = {
        id: `post_${Date.now()}`,
        userId: user.id,
        username: user.username,
        userAvatar: user.avatar,
        media: selectedFile,
        mediaType: mediaType,
        caption: caption,
        location: location,
        hashtags: hashtags,
        likes: 0,
        comments: 0,
        time: "Just now",
        createdAt: Date.now(),
      };
      
      savePost(newPost);
      setPosting(false);
      setPosted(true);
      
      setTimeout(() => {
        setActiveTab("home");
      }, 1500);
    }, 1000);
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

  // Success Screen
  if (posted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-white text-xl font-bold mb-2">Posted Successfully!</h2>
        <p className="text-gray-400 text-center">Your {mediaType === "video" ? "reel" : "post"} is now live on IndianReels</p>
      </div>
    );
  }

  // Media Picker Screen
  if (showMediaPicker && !selectedFile) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <header className="sticky top-0 bg-black z-40 px-4 py-3 flex items-center justify-between border-b border-gray-800">
          <button onClick={() => setActiveTab("home")} className="p-2">
            <X className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Create New</h1>
          <div className="w-10"></div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
            <Camera className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-white text-xl font-bold mb-2">Create Content</h2>
          <p className="text-gray-400 text-center mb-8">Share your moments with the world</p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="w-full max-w-sm space-y-3">
            <button
              onClick={() => {
                setMediaType("photo");
                fileInputRef.current?.click();
              }}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                <Image className="w-6 h-6 text-pink-500" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Photo</p>
                <p className="text-gray-400 text-sm">Share a photo with your followers</p>
              </div>
            </button>

            <button
              onClick={() => {
                setMediaType("video");
                fileInputRef.current?.click();
              }}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Video / Reel</p>
                <p className="text-gray-400 text-sm">Create a reel or share a video</p>
              </div>
            </button>

            <button
              onClick={() => {
                setMediaType("photo");
                fileInputRef.current?.click();
              }}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-cyan-500" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Camera</p>
                <p className="text-gray-400 text-sm">Take a photo or record video</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Edit Post Screen
  return (
    <div className="min-h-screen bg-black pb-6">
      <header className="sticky top-0 bg-black z-40 px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <button 
          onClick={() => {
            setSelectedFile(null);
            setShowMediaPicker(true);
          }}
          className="p-2"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-bold text-white">New Post</h1>
        <button
          onClick={handlePost}
          disabled={posting}
          className="text-pink-500 font-semibold"
        >
          {posting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Post"}
        </button>
      </header>

      {/* Preview */}
      <div className="relative">
        {selectedFile && (
          <>
            {mediaType === "video" ? (
              <div className="relative aspect-[9/16] max-h-96 bg-gray-900 flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={selectedFile}
                  className="w-full h-full object-contain"
                  loop
                  playsInline
                  muted={isMuted}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                </div>
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            ) : (
              <div className="aspect-square max-h-96 bg-gray-900">
                <img
                  src={selectedFile}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 rounded-full">
              <span className="text-white text-xs font-medium">
                {mediaType === "video" ? "🎬 Reel" : "📷 Photo"}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Edit Options */}
      <div className="px-4 py-4 space-y-4">
        <div>
          <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
            <Type className="w-4 h-4" />
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows={3}
            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 resize-none"
          />
          <p className="text-gray-500 text-xs mt-1 text-right">{caption.length}/2200</p>
        </div>

        <div>
          <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Add location"
            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Hashtags
          </label>
          <Input
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="#indianreels #viral"
            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["#indianreels", "#viral", "#trending", "#fyp", "#india"].map((tag) => (
            <button
              key={tag}
              onClick={() => setHashtags(hashtags ? `${hashtags} ${tag}` : tag)}
              className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-pink-500/20 hover:text-pink-400 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {mediaType === "video" && (
          <div className="pt-2 border-t border-gray-800">
            <button className="w-full flex items-center justify-between p-3 bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-pink-500" />
                <span className="text-white">Add Music</span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}

        <Button
          onClick={handlePost}
          disabled={posting || !selectedFile}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg mt-4"
        >
          {posting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Posting...
            </>
          ) : (
            "Share to IndianReels"
          )}
        </Button>

        <button
          onClick={() => {
            setSelectedFile(null);
            setShowMediaPicker(true);
          }}
          className="w-full text-gray-400 text-sm py-2 hover:text-white transition-colors"
        >
          Choose different media
        </button>
      </div>
    </div>
  );
}