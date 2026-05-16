import { useState, useRef } from "react";
import { ArrowLeft, Camera, X, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { User } from "../App";
import { indianCities } from "../utils/cities";

interface EditProfilePageProps {
  user: User;
  onSave: (updates: Partial<User>) => void;
  onCancel: () => void;
}

const avatarEmojis = ["😎", "🦁", "💃", "🎭", "🎵", "📸", "🎬", "🎨", "🔥", "⭐", "💫", "🌟", "🦋", "🌸", "🎭"];

export default function EditProfilePage({ user, onSave, onCancel }: EditProfilePageProps) {
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [website, setWebsite] = useState(user.website || "");
  const [city, setCity] = useState(user.city || "");
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || "");
  const [avatar, setAvatar] = useState(user.avatar || "😎");
  const [avatarImage, setAvatarImage] = useState(user.avatarImage || "");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredCities = indianCities.filter(c => 
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarImage(event.target?.result as string);
        setShowAvatarPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave({
        name,
        username,
        email,
        bio,
        website,
        city,
        dateOfBirth,
        avatar,
        avatarImage,
      });
      setSaving(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 bg-black z-40 px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <button onClick={onCancel} className="p-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-bold text-white">Edit profile</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="text-pink-500 font-semibold"
        >
          {saving ? "..." : "Done"}
        </button>
      </header>

      <div className="p-4 space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2 border-pink-500">
              {avatarImage ? (
                <img src={avatarImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white text-3xl">
                  {avatar}
                </AvatarFallback>
              )}
            </Avatar>
            <button 
              onClick={() => setShowAvatarPicker(true)}
              className="absolute bottom-0 right-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center border-2 border-black"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <button 
            onClick={() => setShowAvatarPicker(true)}
            className="text-pink-500 text-sm font-medium mt-3"
          >
            Change profile photo
          </button>
        </div>

        {/* Avatar Picker Modal */}
        {showAvatarPicker && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <button onClick={() => setShowAvatarPicker(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
              <h2 className="text-white font-bold">Choose Profile Photo</h2>
              <div className="w-6"></div>
            </div>
            
            <div className="p-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg mb-4 flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Choose from Gallery
              </button>
              
              <p className="text-gray-400 text-center mb-4">Or pick an emoji:</p>
              
              <div className="grid grid-cols-5 gap-3">
                {avatarEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setAvatar(emoji);
                      setAvatarImage("");
                      setShowAvatarPicker(false);
                    }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                      avatar === emoji && !avatarImage
                        ? "bg-pink-500/30 border-2 border-pink-500"
                        : "bg-gray-800"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <Label className="text-gray-400 text-sm">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-400 text-sm">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-400 text-sm">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-400 text-sm">Bio</Label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a bio..."
              rows={3}
              maxLength={150}
              className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 resize-none mt-1"
            />
            <p className="text-gray-500 text-xs mt-1 text-right">{bio.length}/150</p>
          </div>

          <div>
            <Label className="text-gray-400 text-sm">Website</Label>
            <Input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 mt-1"
            />
          </div>

          {/* City Dropdown */}
          <div className="relative">
            <Label className="text-gray-400 text-sm">City</Label>
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="w-full bg-gray-900 border border-gray-700 text-white py-3 px-4 rounded-lg mt-1 flex items-center justify-between"
            >
              <span className={city ? "text-white" : "text-gray-500"}>
                {city || "Select your city"}
              </span>
              <span className="text-gray-500">▼</span>
            </button>
            
            {showCityDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg max-h-60 overflow-hidden z-50">
                <input
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  placeholder="Search city..."
                  className="w-full bg-gray-800 border-b border-gray-700 text-white placeholder-gray-500 py-2 px-4"
                  autoFocus
                />
                <div className="overflow-y-auto max-h-48">
                  {filteredCities.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCity(c);
                        setShowCityDropdown(false);
                        setCitySearch("");
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-800 ${
                        city === c ? "text-pink-500 bg-gray-800" : "text-white"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <Label className="text-gray-400 text-sm">Date of Birth</Label>
            <Input
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              type="date"
              className="w-full bg-gray-900 border border-gray-700 text-white py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 mt-1"
            />
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}