"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Building,
  CheckCircle,
  XCircle,
  GraduationCap,
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  UserPlus,
  BookOpen,
  Hash,
  Sparkles
} from "lucide-react"

export default function AddStudent() {
  const router = useRouter()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [departmentId, setDepartmentId] = useState("")
  const [admissionYear, setAdmissionYear] = useState("")
  const [status, setStatus] = useState("Active")
  const [departments, setDepartments] = useState([])
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/admin/departments")
      const data = await res.json()
      setDepartments(data)
    } catch (error) {
      console.error("Error fetching departments:", error)
    }
  }

  const validateForm = () => {
    if (!name.trim()) return "Name is required"
    if (!email.trim()) return "Email is required"
    if (!email.includes('@')) return "Invalid email format"
    if (!phone.trim()) return "Phone number is required"
    if (!departmentId) return "Please select a department"
    if (!admissionYear) return "Admission year is required"
    const year = parseInt(admissionYear)
    if (isNaN(year) || year < 2000 || year > new Date().getFullYear()) {
      return "Please enter a valid admission year"
    }
    return null
  }

  const handleSubmit = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          departmentId: parseInt(departmentId),
          admissionYear: parseInt(admissionYear),
          status
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to add student")
      }

      setSuccess(true)
      
      // Show success message and redirect
      setTimeout(() => {
        router.push("/admin/students")
      }, 1500)

    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Added Successfully!</h2>
          <p className="text-gray-600 mb-6">Redirecting to students list...</p>
          <div className="flex justify-center">
            <Loader2 size={24} className="animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="group relative w-10 h-10 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center overflow-hidden"
            >
              <ArrowLeft size={18} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Add New Student</h1>
              <p className="text-gray-500 mt-1 flex items-center">
                <GraduationCap size={16} className="mr-1" />
                Fill in the student details below
              </p>
            </div>
          </div>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
            <Sparkles size={16} className="mr-2" />
            New Registration
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <UserPlus size={20} className="mr-2" />
              Student Information
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-8 mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start animate-shake">
              <AlertCircle size={18} className="text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form Fields */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Enter student's full name"
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
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>

              {/* Admission Year Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Admission Year <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="number"
                    placeholder="e.g., 2024"
                    min="2000"
                    max={new Date().getFullYear()}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white"
                    value={admissionYear}
                    onChange={(e) => setAdmissionYear(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>

              {/* Department Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Building size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <select
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white appearance-none"
                  >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <CheckCircle size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white appearance-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                <BookOpen size={16} className="mr-2 text-blue-600" />
                Student Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-800">{name || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{email || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="text-sm font-medium text-gray-800">
                    {departments.find(d => d.id === parseInt(departmentId))?.name || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className={`text-sm font-medium ${
                    status === "Active" ? "text-green-600" : 
                    status === "Inactive" ? "text-red-600" : 
                    "text-purple-600"
                  }`}>
                    {status}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex items-center justify-end space-x-4">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Student
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">i</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 mb-1">Quick Tips:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• All fields marked with <span className="text-red-500">*</span> are required</li>
                <li>• Use a valid email address for student communication</li>
                <li>• Admission year should be between 2000 and {new Date().getFullYear()}</li>
              </ul>
            </div>
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