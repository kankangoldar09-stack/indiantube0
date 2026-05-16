import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface LoginPageProps {
  onSwitchToSignup: () => void;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
}

export default function LoginPage({ onSwitchToSignup, login }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await login(email, password);
    
    if (result.error) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-12">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center rotate-12">
            <span className="text-white text-3xl font-bold -rotate-12">IR</span>
          </div>
        </div>
        
        <h1 className="text-white text-3xl font-bold mb-2">IndianReels</h1>
        <p className="text-gray-400 text-center mb-8">Login to continue</p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          {/* Email Input */}
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

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              "Log In"
            )}
          </Button>
        </form>
      </div>

      {/* Signup Link */}
      <div className="px-8 py-6 border-t border-gray-800">
        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-pink-400 font-semibold hover:text-pink-300"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}