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

export default function RegisterPage() {
  const router = useRouter()
  
  // Form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  
  // UI states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async () => {
    // Validation
    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, role })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed")
        setLoading(false)
        return
      }

      // Registration success
      setSuccess(true)
      setTimeout(() => {
        router.push("/login") // Redirect to login page after registration
      }, 1500)

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

  const goToLogin = () => {
    router.push("/login")
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
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your account has been created. Redirecting to login...
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
            Join Our Community
            <span className="block text-blue-200 text-2xl mt-2 font-normal">
              Create your account and get started
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

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full mb-4">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Welcome to CollegeERP</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">
              Fill in your details to get started
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500">
              Fill in your information below
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
            {/* Name Field */}
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
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
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
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters
              </p>
            </div>

            {/* Role Selection */}
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

            {/* Security Badge */}
            <div className="flex items-center justify-end">
              <div className="flex items-center text-xs text-gray-400">
                <Shield size={12} className="mr-1" />
                Secure Registration
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Link to Login */}
            <p className="text-sm text-gray-600 text-center mt-6">
              Already have an account?
              <button
                onClick={goToLogin}
                className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition ml-2 inline-flex items-center group"
              >
                Login
                <ArrowLeft size={14} className="ml-1 group-hover:-translate-x-1 transition-transform" />
              </button>
            </p>
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
  )
}