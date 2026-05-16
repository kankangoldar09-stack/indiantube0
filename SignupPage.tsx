import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, MapPin, Calendar, ChevronDown, Loader2, Camera } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

// Indian cities list
const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
  "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad",
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut",
  "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar",
  "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad",
  "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior",
  "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota",
  "Guwahati", "Chandigarh", "Solapur", "Hubballi-Dharwad", "Bareilly",
  "Moradabad", "Mysore", "Gurgaon", "Aligarh", "Jalandhar",
  "Tiruchirappalli", "Bhubaneswar", "Salem", "Mira-Bhayandar", "Warangal",
  "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Guntur", "Amravati",
  "Bikaner", "Noida", "Jamshedpur", "Bhilai", "Cuttack",
  "Firozabad", "Surat", "Durgapur", "Asansol", "Bhilwara"
].sort();

// Avatar options
const avatarOptions = [
  "😀", "😎", "🥳", "😊", "🤩", "😍", "🤠", "👻", "🦊", "🐱", "🦁", "🐯", "🐸", "🐵", "🦄"
];

interface SignupPageProps {
  onSwitchToLogin: () => void;
  signup: (email: string, password: string, username: string, name: string, city: string, dateOfBirth: string) => Promise<{ error: string | null }>;
}

export default function SignupPage({ onSwitchToLogin, signup }: SignupPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("😎");
  const [showPassword, setShowPassword] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const filteredCities = indianCities.filter(c => 
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password || !username || !name || !city || !dateOfBirth) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      setLoading(false);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers, and underscores");
      setLoading(false);
      return;
    }

    const result = await signup(email, password, username, name, city, dateOfBirth);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-black z-40 px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <button onClick={onSwitchToLogin} className="text-white text-lg">
          ← Back
        </button>
        <h1 className="text-lg font-bold text-white">Sign Up</h1>
        <div className="w-12"></div>
      </header>

      {/* Progress Steps */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 1 ? "bg-pink-500 text-white" : "bg-gray-800 text-gray-500"
          }`}>
            1
          </div>
          <div className={`w-12 h-1 rounded ${step >= 2 ? "bg-pink-500" : "bg-gray-800"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 2 ? "bg-pink-500 text-white" : "bg-gray-800 text-gray-500"
          }`}>
            2
          </div>
          <div className={`w-12 h-1 rounded ${step >= 3 ? "bg-pink-500" : "bg-gray-800"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 3 ? "bg-pink-500 text-white" : "bg-gray-800 text-gray-500"
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 py-2">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-white text-xl font-bold mb-4">Choose your avatar</h2>
            
            {/* Avatar Selection */}
            <div className="flex flex-wrap gap-3 justify-center py-4">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
                    selectedAvatar === avatar 
                      ? "bg-pink-500 scale-110 ring-2 ring-pink-400 ring-offset-2 ring-offset-black" 
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>

            {/* Name Input */}
            <div className="mt-6">
              <label className="text-gray-400 text-sm mb-2 block">Your Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 pl-10 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Username Input */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  placeholder="username"
                  className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 pl-8 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!name || !username}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg mt-6"
            >
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-white text-xl font-bold mb-4">Where are you from?</h2>
            
            {/* City Selection */}
            <div className="relative">
              <label className="text-gray-400 text-sm mb-2 block">Select your city</label>
              <button
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="w-full bg-gray-900 border border-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-between focus:border-pink-500"
              >
                <span className={city ? "text-white" : "text-gray-500"}>
                  {city || "Select city"}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showCityDropdown ? "rotate-180" : ""}`} />
              </button>
              
              {showCityDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg max-h-64 overflow-y-auto z-50">
                  <div className="sticky top-0 bg-gray-900 p-2 border-b border-gray-700">
                    <Input
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      placeholder="Search city..."
                      className="w-full bg-gray-800 border-none text-white placeholder-gray-500"
                    />
                  </div>
                  {filteredCities.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCity(c);
                        setShowCityDropdown(false);
                        setCitySearch("");
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${
                        city === c ? "bg-pink-500/20 text-pink-400" : "text-white"
                      }`}
                    >
                      📍 {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div className="mt-4">
              <label className="text-gray-400 text-sm mb-2 block">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 pl-10 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 border-gray-700 text-white hover:bg-gray-800 py-3"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!city || !dateOfBirth}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-white text-xl font-bold mb-4">Create your account</h2>
            
            {/* Email Input */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 pl-10 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min 6 characters)"
                  className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 pl-10 pr-10 py-3 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 border-gray-700 text-white hover:bg-gray-800 py-3"
              >
                Back
              </Button>
              <Button
                onClick={handleSignup}
                disabled={loading || !email || !password}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>

            {/* Terms */}
            <p className="text-gray-500 text-xs text-center mt-4">
              By signing up, you agree to our{" "}
              <span className="text-gray-400">Terms of Service</span> and{" "}
              <span className="text-gray-400">Privacy Policy</span>
            </p>
          </div>
        )}
      </div>

      {/* Login Link */}
      <div className="px-8 py-4 border-t border-gray-800">
        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-pink-400 font-semibold hover:text-pink-300"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}