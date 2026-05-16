export const posts = [
  {
    id: "1",
    username: "arjun_kapoor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f46?w=100",
    location: "Delhi, India",
    image: "https://images.unsplash.com/photo-1524492412937-b28071a518d9?w=600",
    caption: "Exploring the beautiful streets of Old Delhi 🕌✨ #DelhiDiaries #IndianReels",
    likes: 12453,
    comments: 234,
    time: "2 hours ago",
    isReel: false
  },
  {
    id: "2",
    username: "dance_queen_anita",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    location: "Mumbai, Maharashtra",
    image: "https://images.unsplash.com/photo-1545959570-a94084071b5d?w=600",
    caption: "New dance reel dropping tonight! 💃🔥 Who's ready? #DanceReels #Bollywood",
    likes: 45678,
    comments: 891,
    time: "4 hours ago",
    isReel: true
  },
  {
    id: "3",
    username: "foodie_delhi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    location: "Chandni Chowk, Delhi",
    image: "https://images.unsplash.com/photo-1567188040759-f38c5a585609?w=600",
    caption: "Best chaat in Delhi! 🥘🌶️ You have to try this! #StreetFood #DelhiEats",
    likes: 8934,
    comments: 156,
    time: "6 hours ago",
    isReel: false
  },
  {
    id: "4",
    username: "travel_with_me",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    location: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1477587456474-44ba5a4a1fb0?w=600",
    caption: "The Pink City never disappoints 🏰💖 #Jaipur #Rajasthan #TravelIndia",
    likes: 23456,
    comments: 432,
    time: "8 hours ago",
    isReel: true
  },
  {
    id: "5",
    username: "bollywood_vibes",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69aebc?w=100",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1516450360832-3f8f4d8a33be?w=600",
    caption: "Behind the scenes of my latest reel 🎬✨ #Bollywood #ActorLife",
    likes: 67890,
    comments: 1234,
    time: "12 hours ago",
    isReel: true
  }
];

export const reels = [
  {
    id: "r1",
    username: "dance_with_pooja",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    thumbnail: "https://images.unsplash.com/photo-1516450360832-3f8f4d8a33be?w=600",
    caption: "New dance trend! Try it 💃 #DanceChallenge #Viral",
    song: "♪ Kesariya - Arijit Singh",
    likes: "1.2M",
    comments: "23.4K"
  },
  {
    id: "r2",
    username: "comedy_king_raj",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f46?w=100",
    thumbnail: "https://images.unsplash.com/photo-1524492412937-b28071a518d9?w=600",
    caption: "When mom finds your secret stash 😂 #Comedy #Relatable",
    song: "♪ Original Audio - comedy_king_raj",
    likes: "890K",
    comments: "15.2K"
  },
  {
    id: "r3",
    username: "chef_rohit",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    thumbnail: "https://images.unsplash.com/photo-1567188040759-f38c5a585609?w=600",
    caption: "5-min Maggi hack! 🍜 #FoodHacks #QuickRecipes",
    song: "♪ Bollywood Beats - Trending",
    likes: "2.1M",
    comments: "45.6K"
  },
  {
    id: "r4",
    username: "fitness_freak_anu",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600",
    caption: "Morning workout routine 💪 #Fitness #HealthyLifestyle",
    song: "♪ Motivational Mix - Gym Music",
    likes: "567K",
    comments: "8.9K"
  }
];

export const notifications = [
  {
    id: "n1",
    username: "arjun_kapoor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f46?w=100",
    action: "liked your post",
    time: "2m ago",
    type: "like",
    image: "https://images.unsplash.com/photo-1524492412937-b28071a518d9?w=100"
  },
  {
    id: "n2",
    username: "dance_queen_anita",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    action: "started following you",
    time: "15m ago",
    type: "follow",
    image: null
  },
  {
    id: "n3",
    username: "foodie_delhi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    action: "commented: 'This looks amazing! 😍'",
    time: "1h ago",
    type: "comment",
    image: "https://images.unsplash.com/photo-1567188040759-f38c5a585609?w=100"
  },
  {
    id: "n4",
    username: "travel_with_me",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    action: "mentioned you in a comment",
    time: "3h ago",
    type: "mention",
    image: null
  },
  {
    id: "n5",
    username: "bollywood_vibes",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69aebc?w=100",
    action: "liked your reel",
    time: "5h ago",
    type: "like",
    image: "https://images.unsplash.com/photo-1516450360832-3f8f4d8a33be?w=100"
  },
  {
    id: "n6",
    username: "fitness_freak_anu",
    avatar: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100",
    action: "started following you",
    time: "1d ago",
    type: "follow",
    image: null
  }
];

export const userPosts = [
  { id: "up1", image: "https://images.unsplash.com/photo-1524492412937-b28071a518d9?w=400", likes: "12.4K", comments: "234", isReel: false, views: "" },
  { id: "up2", image: "https://images.unsplash.com/photo-1516450360832-3f8f4d8a33be?w=400", likes: "45.6K", comments: "891", isReel: true, views: "1.2M" },
  { id: "up3", image: "https://images.unsplash.com/photo-1567188040759-f38c5a585609?w=400", likes: "8.9K", comments: "156", isReel: false, views: "" },
  { id: "up4", image: "https://images.unsplash.com/photo-1477587456474-44ba5a4a1fb0?w=400", likes: "23.4K", comments: "432", isReel: true, views: "890K" }
];