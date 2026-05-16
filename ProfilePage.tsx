import { useState, useEffect } from "react";
import { Grid, Heart, Bookmark, Edit2, Share2, LogOut, MapPin, Calendar, Trash2, Play, Film } from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { User } from "../App";
import { getUserPosts, deletePost } from "../utils/storage";
import { Post } from "../utils/storage";
import ShareSheet from "../components/ShareSheet";

interface ProfilePageProps {
  user: User;
  logout: () => void;
  onEditProfile: () => void;
}

export default function ProfilePage({ user, logout, onEditProfile }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<"videos" | "liked" | "saved">("videos");
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    setUserPosts(getUserPosts(user.id));
  }, [user.id]);

  const handleDeletePost = (postId: string) => {
    deletePost(postId);
    setUserPosts(getUserPosts(user.id));
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'IndianReels',
      text: `Check out ${user.name}'s profile on IndianReels! 🎬🇮🇳`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setShowShareSheet(true);
      }
    } catch (err) {
      // User cancelled or error
    }
  };

  const handleCopyProfileLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  const username = user?.username || "User";
  const name = user?.name || username;
  const email = user?.email || "";
  const city = user?.city || "";
  const dateOfBirth = user?.dateOfBirth || "";
  const bio = user?.bio || "";
  const avatar = user?.avatar || "😎";
  const avatarImage = user?.avatarImage || "";

  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <>
      <div className="min-h-screen bg-black pb-20">
        {/* Header */}
        <header className="sticky top-0 bg-black z-40 px-4 py-3 flex items-center justify-between border-b border-gray-800">
          <h1 className="text-lg font-bold text-white">@{username}</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleShareApp}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors relative"
            >
              <Share2 className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={logout}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <LogOut className="w-6 h-6 text-white" />
            </button>
          </div>
        </header>

        {/* Profile Info */}
        <div className="px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-24 h-24 border-2 border-pink-500">
              {avatarImage ? (
                <img src={avatarImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white text-3xl">
                  {avatar}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-around text-center">
                <div>
                  <p className="font-bold text-white text-xl">{userPosts.length}</p>
                  <p className="text-gray-400 text-xs">Posts</p>
                </div>
                <div>
                  <p className="font-bold text-white text-xl">0</p>
                  <p className="text-gray-400 text-xs">Followers</p>
                </div>
                <div>
                  <p className="font-bold text-white text-xl">{totalLikes}</p>
                  <p className="text-gray-400 text-xs">Likes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-white text-lg">{name}</h2>
            <p className="text-gray-300 text-sm">{email}</p>
            {city && (
              <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {city}, India 🇮🇳
              </p>
            )}
            {dateOfBirth && (
              <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {new Date(dateOfBirth).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
            {bio && (
              <p className="text-gray-300 text-sm mt-2">{bio}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={onEditProfile}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit profile
            </Button>
            <Button 
              onClick={handleShareApp}
              variant="outline" 
              className="bg-gray-800 border-none text-white hover:bg-gray-700"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="border-t border-gray-800">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex-1 py-3 flex justify-center border-b-2 transition-colors ${
                activeTab === "videos" 
                  ? "border-white text-white" 
                  : "border-transparent text-gray-500"
              }`}
            >
              <Grid className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab("liked")}
              className={`flex-1 py-3 flex justify-center border-b-2 transition-colors ${
                activeTab === "liked" 
                  ? "border-white text-white" 
                  : "border-transparent text-gray-500"
              }`}
            >
              <Heart className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 py-3 flex justify-center border-b-2 transition-colors ${
                activeTab === "saved" 
                  ? "border-white text-white" 
                  : "border-transparent text-gray-500"
              }`}
            >
              <Bookmark className="w-6 h-6" />
            </button>
          </div>

          {/* Content Grid */}
          <div className="p-1">
            {activeTab === "videos" && (
              <>
                {userPosts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-3">
                      <Film className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-gray-400 text-sm">No posts yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1">
                    {userPosts.map((post) => (
                      <div key={post.id} className="relative aspect-square group">
                        {post.mediaType === "video" ? (
                          <>
                            <video
                              src={post.media}
                              className="w-full h-full object-cover"
                              muted
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                          </>
                        ) : (
                          <img
                            src={post.media}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )}
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "liked" && (
              <div className="flex flex-col items-center justify-center py-16">
                <Heart className="w-12 h-12 text-gray-600 mb-3" />
                <p className="text-gray-400 text-sm">Posts you liked will appear here</p>
              </div>
            )}

            {activeTab === "saved" && (
              <div className="flex flex-col items-center justify-center py-16">
                <Bookmark className="w-12 h-12 text-gray-600 mb-3" />
                <p className="text-gray-400 text-sm">Posts you saved will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Sheet */}
      <ShareSheet
        isOpen={showShareSheet}
        onClose={() => setShowShareSheet(false)}
        title="IndianReels"
        text={`Check out ${user.name}'s profile on IndianReels! 🎬🇮🇳`}
        url={window.location.href}
      />
    </>
  );
}