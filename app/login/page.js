"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  LogIn, 
  Eye, 
  EyeOff, 
  Loader2,
  GraduationCap,
  Shield,
  ChevronRight,
  AlertCircle,
  Building,
  Users,
  BookOpen
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved email
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      localStorage.setItem("role", data.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Show success and redirect
      setTimeout(() => {
        if (data.role === "admin") {
          router.replace("/admin/dashboard");
        } else if (data.role === "faculty") {
          router.replace("/faculty/dashboard");
        } else if (data.role === "student") {
          router.replace("/student/dashboard");
        }
      }, 500);

    } catch (err) {
      console.log(err);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-blue-700">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap size={28} className="text-blue-600" />
            </div>
            <span className="text-white text-3xl font-bold">CollegeERP</span>
          </div>
        </div>

        <div className="space-y-8">
          <h1 className="text-white text-5xl font-bold leading-tight">
            Welcome Back to
            <span className="block text-blue-200">Your Dashboard</span>
          </h1>
          
          <p className="text-blue-100 text-lg max-w-md leading-relaxed">
            Access your personalized dashboard to manage courses, track progress, and stay connected with your college community.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-blue-500/50 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
              <Users size={24} className="text-white mb-2" />
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-blue-200">Active Students</div>
            </div>
            <div className="bg-blue-500/50 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
              <GraduationCap size={24} className="text-white mb-2" />
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-blue-200">Faculty Members</div>
            </div>
            <div className="bg-blue-500/50 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
              <BookOpen size={24} className="text-white mb-2" />
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-sm text-blue-200">Departments</div>
            </div>
            <div className="bg-blue-500/50 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
              <Shield size={24} className="text-white mb-2" />
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-blue-200">Secure</div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-blue-200">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
              <span className="text-sm">Real-time Updates</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
              <span className="text-sm">Secure Platform</span>
            </div>
          </div>
        </div>

        <div className="text-blue-200 text-sm">
          © 2024 CollegeERP. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">CollegeERP</h1>
            <p className="text-gray-500 mt-2">Login to your account</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-500">Please sign in to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start animate-shake">
              <AlertCircle size={18} className="text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative group">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                {/* <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-xs text-purple-600 hover:text-purple-700 hover:underline transition"
                >
                  Forgot Password?
                </button> */}
              </div>
              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Security Badge */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 transition"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition">
                  Remember me
                </span>
              </label>

              <div className="flex items-center text-xs text-gray-400">
                <Shield size={12} className="mr-1" />
                Secure Login
              </div>
            </div>

            {/* Login Button */}
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} className="mr-2" />
                  Sign In
                </>
              )}
            </button>

            {/* Register Link */}
            <p className="text-sm text-gray-600 text-center mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition inline-flex items-center group"
              >
                Create account
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-400 mb-3">
              Demo Credentials (Click to fill)
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <button
                onClick={() => {
                  setEmail("admin@college.edu");
                  setPassword("admin123");
                }}
                className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
              >
                <p className="font-semibold text-blue-600 mb-1">Admin</p>
                <p className="text-gray-500 truncate text-[10px]">admin@college.edu</p>
                <p className="text-gray-400 text-[10px]">••••••••</p>
              </button>
              <button
                onClick={() => {
                  setEmail("faculty@college.edu");
                  setPassword("faculty123");
                }}
                className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
              >
                <p className="font-semibold text-purple-600 mb-1">Faculty</p>
                <p className="text-gray-500 truncate text-[10px]">faculty@college.edu</p>
                <p className="text-gray-400 text-[10px]">••••••••</p>
              </button>
              <button
                onClick={() => {
                  setEmail("student@college.edu");
                  setPassword("student123");
                }}
                className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
              >
                <p className="font-semibold text-blue-600 mb-1">Student</p>
                <p className="text-gray-500 truncate text-[10px]">student@college.edu</p>
                <p className="text-gray-400 text-[10px]">••••••••</p>
              </button>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="lg:hidden text-center mt-8 text-xs text-gray-400">
            © 2024 CollegeERP. All rights reserved.
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}