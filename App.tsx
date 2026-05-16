import { useState, useEffect } from "react";
import { Home, Search, PlusSquare, Heart, User, Film } from "lucide-react";
import FeedPage from "./pages/FeedPage";
import ReelsPage from "./pages/ReelsPage";
import CreatePage from "./pages/CreatePage";
import InboxPage from "./pages/InboxPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EditProfilePage from "./pages/EditProfilePage";
import { getStoredUser, setStoredUser, getAllUsers, setAllUsers } from "./utils/storage";

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar: string;
  avatarImage: string;
  bio: string;
  city: string;
  dateOfBirth: string;
  website: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    const users = getAllUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      return { error: "Invalid email or password" };
    }
    
    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      name: foundUser.name || foundUser.username,
      avatar: foundUser.avatar || "😎",
      avatarImage: foundUser.avatarImage || "",
      bio: foundUser.bio || "",
      city: foundUser.city || "",
      dateOfBirth: foundUser.dateOfBirth || "",
      website: foundUser.website || "",
    };
    
    setUser(userData);
    setStoredUser(userData);
    return { error: null };
  };

  const signup = async (
    email: string, 
    password: string, 
    username: string, 
    name: string, 
    city: string, 
    dateOfBirth: string
  ): Promise<{ error: string | null }> => {
    const users = getAllUsers();
    
    if (users.find(u => u.email === email)) {
      return { error: "Email already exists" };
    }
    
    if (users.find(u => u.username === username)) {
      return { error: "Username already taken" };
    }
    
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password,
      username,
      name,
      city,
      dateOfBirth,
      avatar: "😎",
      avatarImage: "",
      bio: "",
      website: "",
    };
    
    users.push(newUser);
    setAllUsers(users);
    
    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      name: newUser.name,
      avatar: newUser.avatar,
      avatarImage: newUser.avatarImage,
      bio: newUser.bio,
      city: newUser.city,
      dateOfBirth: newUser.dateOfBirth,
      website: newUser.website,
    };
    
    setUser(userData);
    setStoredUser(userData);
    return { error: null };
  };

  const logout = () => {
    setUser(null);
    setStoredUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setStoredUser(updatedUser);
    
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      setAllUsers(users);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return showSignup ? (
      <SignupPage onSwitchToLogin={() => setShowSignup(false)} signup={signup} />
    ) : (
      <LoginPage onSwitchToSignup={() => setShowSignup(true)} login={login} />
    );
  }

  if (showEditProfile) {
    return (
      <EditProfilePage 
        user={user} 
        onSave={(updates) => {
          updateProfile(updates);
          setShowEditProfile(false);
        }}
        onCancel={() => setShowEditProfile(false)}
      />
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <FeedPage onOpenReels={() => setActiveTab("reels")} />;
      case "reels":
        return <ReelsPage />;
      case "discover":
        return <FeedPage onOpenReels={() => setActiveTab("reels")} />;
      case "create":
        return <CreatePage setActiveTab={setActiveTab} user={user} />;
      case "inbox":
        return <InboxPage />;
      case "profile":
        return <ProfilePage user={user} logout={logout} onEditProfile={() => setShowEditProfile(true)} />;
      default:
        return <FeedPage onOpenReels={() => setActiveTab("reels")} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto bg-black min-h-screen relative">
        {renderPage()}
        
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-black border-t border-gray-800 px-2 py-2 z-50">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setActiveTab("home")}
              className="flex flex-col items-center gap-0.5 px-4 py-1"
            >
              <Home className={`w-6 h-6 ${activeTab === "home" ? "text-white fill-white" : "text-gray-500"}`} />
              <span className={`text-xs ${activeTab === "home" ? "text-white" : "text-gray-500"}`}>Home</span>
            </button>
            
            <button
              onClick={() => setActiveTab("discover")}
              className="flex flex-col items-center gap-0.5 px-4 py-1"
            >
              <Search className={`w-6 h-6 ${activeTab === "discover" ? "text-white" : "text-gray-500"}`} />
              <span className={`text-xs ${activeTab === "discover" ? "text-white" : "text-gray-500"}`}>Discover</span>
            </button>
            
            <button
              onClick={() => setActiveTab("reels")}
              className="px-4 py-1"
            >
              <div className={`w-12 h-8 rounded-lg ${activeTab === "reels" ? 'bg-gradient-to-r from-cyan-400 to-pink-500' : 'bg-gradient-to-r from-cyan-400 via-white to-pink-500'} p-0.5`}>
                <div className="w-full h-full bg-black rounded-md flex items-center justify-center">
                  <Film className="w-5 h-5 text-white" />
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab("create")}
              className="flex flex-col items-center gap-0.5 px-4 py-1"
            >
              <PlusSquare className={`w-6 h-6 ${activeTab === "create" ? "text-white" : "text-gray-500"}`} />
              <span className={`text-xs ${activeTab === "create" ? "text-white" : "text-gray-500"}`}>Create</span>
            </button>
            
            <button
              onClick={() => setActiveTab("profile")}
              className="flex flex-col items-center gap-0.5 px-4 py-1"
            >
              <User className={`w-6 h-6 ${activeTab === "profile" ? "text-white fill-white" : "text-gray-500"}`} />
              <span className={`text-xs ${activeTab === "profile" ? "text-white" : "text-gray-500"}`}>Profile</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}