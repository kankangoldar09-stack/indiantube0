import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Play, Trash2, Film, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { getPosts, getLikedPosts, getSavedPosts, toggleLikedPost, toggleSavedPost, deletePost } from "../utils/storage";
import { Post } from "../utils/storage";
import { getStoredUser } from "../utils/storage";
import ShareSheet from "../components/ShareSheet";

interface FeedPageProps {
  onOpenReels?: () => void;
}

export default function FeedPage({ onOpenReels }: FeedPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [sharePost, setSharePost] = useState<Post | null>(null);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setCurrentUserId(user.id);
    }
    setPosts(getPosts());
    setLikedPosts(getLikedPosts());
    setSavedPosts(getSavedPosts());
  }, []);

  const handleToggleLike = (postId: string) => {
    toggleLikedPost(postId);
    setLikedPosts(getLikedPosts());
  };

  const handleToggleSave = (postId: string) => {
    toggleSavedPost(postId);
    setSavedPosts(getSavedPosts());
  };

  const handleDeletePost = (postId: string) => {
    deletePost(postId);
    setPosts(getPosts());
  };

  const handleSharePost = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: 'IndianReels Post',
        text: post.caption,
        url: window.location.href
      }).catch(() => {
        setSharePost(post);
      });
    } else {
      setSharePost(post);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const videoPosts = posts.filter(p => p.mediaType === "video");

  return (
    <>
      <div className="min-h-screen bg-black pb-20">
        {/* Header */}
        <header className="sticky top-0 bg-black z-40 px-4 py-3 flex items-center justify-between border-b border-gray-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            IndianReels
          </h1>
          <div className="flex items-center gap-3">
            <button className="relative">
              <Send className="w-6 h-6 text-white" />
            </button>
          </div>
        </header>

        {/* Reels Section */}
        {videoPosts.length > 0 && (
          <div className="px-4 py-3 border-b border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold">Reels</h2>
              <button 
                onClick={onOpenReels}
                className="text-pink-500 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {videoPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={onOpenReels}
                  className="flex-shrink-0 relative"
                >
                  <div className="w-24 h-32 rounded-lg overflow-hidden bg-gray-800 relative">
                    <video
                      src={post.media}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Posts Feed */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Play className="w-10 h-10 text-gray-600" />
            </div>
            <h2 className="text-white text-lg font-bold mb-2">No Posts Yet</h2>
            <p className="text-gray-400 text-center">Be the first to share a moment!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {posts.map((post) => (
              <article key={post.id} className="pb-4">
                {/* Post Header */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white text-lg">
                      {post.userAvatar || post.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{post.username}</p>
                    {post.location && (
                      <p className="text-gray-400 text-xs">{post.location}</p>
                    )}
                  </div>
                  {currentUserId === post.userId && (
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="text-gray-400 hover:text-red-500 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Post Media */}
                <div className="relative bg-gray-900">
                  {post.mediaType === "video" ? (
                    <div className="relative aspect-square">
                      <video
                        src={post.media}
                        className="w-full h-full object-cover"
                        loop
                        playsInline
                        muted
                      />
                      <div 
                        onClick={onOpenReels}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      >
                        <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 rounded-full flex items-center gap-1">
                        <Film className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-medium">Reel</span>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square">
                      <img
                        src={post.media}
                        alt={post.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="px-4 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <button onClick={() => handleToggleLike(post.id)}>
                        <Heart
                          className={`w-6 h-6 ${
                            likedPosts.includes(post.id)
                              ? "text-pink-500 fill-pink-500"
                              : "text-white"
                          }`}
                        />
                      </button>
                      <button>
                        <MessageCircle className="w-6 h-6 text-white" />
                      </button>
                      <button onClick={() => handleSharePost(post)}>
                        <Share2 className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <button onClick={() => handleToggleSave(post.id)}>
                      <Bookmark
                        className={`w-6 h-6 ${
                          savedPosts.includes(post.id)
                            ? "text-pink-500 fill-pink-500"
                            : "text-white"
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-white font-semibold text-sm mb-1">
                    {formatNumber(likedPosts.includes(post.id) ? post.likes + 1 : post.likes)} likes
                  </p>

                  <p className="text-white text-sm">
                    <span className="font-semibold">{post.username}</span>{" "}
                    {post.caption}
                  </p>

                  {post.hashtags && (
                    <p className="text-cyan-400 text-sm mt-1">{post.hashtags}</p>
                  )}

                  <p className="text-gray-500 text-xs mt-1">{post.time}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Share Sheet */}
      {sharePost && (
        <ShareSheet
          isOpen={true}
          onClose={() => setSharePost(null)}
          title="IndianReels Post"
          text={sharePost.caption}
          url={window.location.href}
        />
      )}
    </>
  );
}