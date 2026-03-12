"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Mail, 
  Lock, 
  User,
  GraduationCap,
  Building,
  Users,
  BookOpen,
  Eye,
  EyeOff,
  Loader2,
  ChevronRight,
  Shield,
  AlertCircle,
  Sparkles,
  CheckCircle,
  ArrowLeft
} from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  
  // Form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  
  // UI states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved email
    const savedEmail = localStorage.getItem("rememberedEmail")
    if (savedEmail && isLogin) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [isLogin])

  const handleSubmit = async () => {
    // Validation
    if (!email || !password) {
      setError("Please fill in all required fields")
      return
    }

    if (!isLogin && !name) {
      setError("Please enter your name")
      return
    }

    if (!isLogin && password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    setError("")

    const url = isLogin ? "/api/auth/login" : "/api/auth/register"
    const body = isLogin
      ? { email, password }
      : { name, email, password, role }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        setLoading(false)
        return
      }

      if (isLogin) {
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email)
        } else {
          localStorage.removeItem("rememberedEmail")
        }

        localStorage.setItem("role", data.role)
        localStorage.setItem("user", JSON.stringify(data.user))

        // Show success and redirect
        setSuccess(true)
        setTimeout(() => {
          router.push(`/${data.role}/dashboard`)
        }, 1000)
      } else {
        // Registration success
        setSuccess(true)
        setTimeout(() => {
          setIsLogin(true)
          setSuccess(false)
          setName("")
          setPassword("")
          setRole("student")
        }, 1500)
      }

    } catch (err) {
      console.error(err)
      setError("Server error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError("")
    setSuccess(false)
    setName("")
    setEmail("")
    setPassword("")
    setRole("student")
  }

  if (!mounted) return null

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? "Login Successful!" : "Registration Successful!"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isLogin 
              ? "Redirecting to your dashboard..." 
              : "Your account has been created. Redirecting to login..."}
          </p>
          <div className="flex justify-center">
            <Loader2 size={24} className="animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Left Side - Branding/Hero */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-2xl">
              <GraduationCap size={32} className="text-blue-600" />
            </div>
            <span className="text-white text-3xl font-bold">CollegeERP</span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <h1 className="text-white text-5xl font-bold leading-tight">
            {isLogin ? "Welcome Back!" : "Join Our Community"}
            <span className="block text-blue-200 text-2xl mt-2 font-normal">
              {isLogin 
                ? "Sign in to continue your journey" 
                : "Create your account and get started"}
            </span>
          </h1>
          
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-blue-500/30 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
              <Users size={24} className="text-white mb-2" />
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-blue-200">Students</div>
            </div>
            <div className="bg-blue-500/30 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
              <GraduationCap size={24} className="text-white mb-2" />
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-blue-200">Faculty</div>
            </div>
            <div className="bg-blue-500/30 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
              <Building size={24} className="text-white mb-2" />
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-sm text-blue-200">Departments</div>
            </div>
            <div className="bg-blue-500/30 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
              <BookOpen size={24} className="text-white mb-2" />
              <div className="text-2xl font-bold text-white">20+</div>
              <div className="text-sm text-blue-200">Courses</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-white">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <CheckCircle size={14} className="text-white" />
              </div>
              <span>Access to learning resources</span>
            </div>
            <div className="flex items-center text-white">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <CheckCircle size={14} className="text-white" />
              </div>
              <span>Real-time notifications</span>
            </div>
            <div className="flex items-center text-white">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <CheckCircle size={14} className="text-white" />
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-blue-200 text-sm">
          © 2024 CollegeERP. All rights reserved.
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full mb-4">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Welcome to CollegeERP</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-500">
              {isLogin 
                ? "Sign in to continue to your dashboard" 
                : "Fill in your details to get started"}
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500">
              {isLogin 
                ? "Please sign in to continue" 
                : "Fill in your information below"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start animate-shake">
              <AlertCircle size={18} className="text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Name Field - Register Only */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Full Name
                </label>
                <div className="relative group">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
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

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-xs text-purple-600 hover:text-purple-700 hover:underline transition"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
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
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters
                </p>
              )}
            </div>

            {/* Role Selection - Register Only */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  I am a
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["student", "faculty", "admin"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        role === r
                          ? r === "student"
                            ? "border-blue-600 bg-blue-50"
                            : r === "faculty"
                            ? "border-purple-600 bg-purple-50"
                            : "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        {r === "student" ? (
                          <GraduationCap size={20} className={role === r ? "text-blue-600" : "text-gray-400"} />
                        ) : r === "faculty" ? (
                          <User size={20} className={role === r ? "text-purple-600" : "text-gray-400"} />
                        ) : (
                          <Building size={20} className={role === r ? "text-blue-600" : "text-gray-400"} />
                        )}
                        <span className={`text-xs mt-1 font-medium capitalize ${
                          role === r
                            ? r === "student"
                              ? "text-blue-600"
                              : r === "faculty"
                              ? "text-purple-600"
                              : "text-blue-600"
                            : "text-gray-500"
                        }`}>
                          {r}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Remember Me - Login Only */}
            {isLogin && (
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
            )}

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Toggle between Login/Register */}
            <p className="text-sm text-gray-600 text-center mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleMode}
                className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition ml-2 inline-flex items-center group"
              >
                {isLogin ? "Register" : "Login"}
                <ArrowLeft size={14} className="ml-1 group-hover:-translate-x-1 transition-transform" />
              </button>
            </p>
          </div>

          {/* Demo Credentials - Login Only */}
          {isLogin && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-400 mb-3">
                Demo Credentials (Click to fill)
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <button
                  onClick={() => {
                    setEmail("admin@college.edu")
                    setPassword("admin123")
                  }}
                  className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <p className="font-semibold text-blue-600 mb-1">Admin</p>
                  <p className="text-gray-500 truncate text-[10px]">admin@college.edu</p>
                </button>
                <button
                  onClick={() => {
                    setEmail("faculty@college.edu")
                    setPassword("faculty123")
                  }}
                  className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                >
                  <p className="font-semibold text-purple-600 mb-1">Faculty</p>
                  <p className="text-gray-500 truncate text-[10px]">faculty@college.edu</p>
                </button>
                <button
                  onClick={() => {
                    setEmail("student@college.edu")
                    setPassword("student123")
                  }}
                  className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <p className="font-semibold text-blue-600 mb-1">Student</p>
                  <p className="text-gray-500 truncate text-[10px]">student@college.edu</p>
                </button>
              </div>
            </div>
          )}

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
  )
}