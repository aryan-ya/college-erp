"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft,
  Bell,
  Calendar,
  Search,
  Loader2,
  ChevronRight,
  AlertCircle,
  FileText,
  Pin,
  Clock,
  Megaphone,
  BookOpen,
  GraduationCap,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react"

export default function StudentNotices() {
  const router = useRouter()
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Fetch notices from admin API
  const fetchNotices = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/notices")
      if (!res.ok) {
        throw new Error('Failed to fetch notices')
      }
      const data = await res.json()
      setNotices(data)
    } catch (error) {
      console.error("Error fetching notices:", error)
      setError('Failed to load notices. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotices()
  }, [])

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  }

  // Get icon based on notice title/content
  const getNoticeIcon = (notice) => {
    const title = notice.title?.toLowerCase() || ""
    const content = notice.content?.toLowerCase() || ""
    
    if (title.includes("exam") || title.includes("test") || content.includes("exam")) {
      return <FileText size={20} className="text-orange-600" />
    } else if (title.includes("holiday") || title.includes("vacation")) {
      return <Calendar size={20} className="text-green-600" />
    } else if (title.includes("meeting") || title.includes("faculty")) {
      return <Users size={20} className="text-purple-600" />
    } else if (title.includes("event") || title.includes("fest")) {
      return <Megaphone size={20} className="text-pink-600" />
    } else if (title.includes("result") || title.includes("grade")) {
      return <CheckCircle size={20} className="text-blue-600" />
    } else if (title.includes("important") || title.includes("urgent")) {
      return <AlertTriangle size={20} className="text-red-600" />
    } else {
      return <Bell size={20} className="text-blue-600" />
    }
  }

  // Get background color based on notice
  const getIconBgColor = (notice) => {
    const title = notice.title?.toLowerCase() || ""
    const content = notice.content?.toLowerCase() || ""
    
    if (title.includes("exam") || title.includes("test")) {
      return "bg-orange-100"
    } else if (title.includes("holiday") || title.includes("vacation")) {
      return "bg-green-100"
    } else if (title.includes("meeting") || title.includes("faculty")) {
      return "bg-purple-100"
    } else if (title.includes("event") || title.includes("fest")) {
      return "bg-pink-100"
    } else if (title.includes("result") || title.includes("grade")) {
      return "bg-blue-100"
    } else if (title.includes("important") || title.includes("urgent")) {
      return "bg-red-100"
    } else {
      return "bg-blue-100"
    }
  }

  // Categories based on notice content
  const categories = [
    { id: "all", name: "All Notices", icon: <Bell size={14} /> },
    { id: "exam", name: "Exams", icon: <FileText size={14} /> },
    { id: "holiday", name: "Holidays", icon: <Calendar size={14} /> },
    { id: "event", name: "Events", icon: <Megaphone size={14} /> },
    { id: "result", name: "Results", icon: <CheckCircle size={14} /> },
    { id: "important", name: "Important", icon: <AlertTriangle size={14} /> }
  ]

  // Filter notices based on search and category
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title?.toLowerCase().includes(search.toLowerCase()) ||
                         notice.content?.toLowerCase().includes(search.toLowerCase())
    
    if (selectedCategory === "all") return matchesSearch
    
    const title = notice.title?.toLowerCase() || ""
    const content = notice.content?.toLowerCase() || ""
    
    switch(selectedCategory) {
      case "exam":
        return (title.includes("exam") || content.includes("exam")) && matchesSearch
      case "holiday":
        return (title.includes("holiday") || content.includes("holiday") || 
                title.includes("vacation") || content.includes("vacation")) && matchesSearch
      case "event":
        return (title.includes("event") || content.includes("event") || 
                title.includes("fest") || content.includes("fest")) && matchesSearch
      case "result":
        return (title.includes("result") || content.includes("result") || 
                title.includes("grade") || content.includes("grade")) && matchesSearch
      case "important":
        return (title.includes("important") || content.includes("important") || 
                title.includes("urgent") || content.includes("urgent")) && matchesSearch
      default:
        return matchesSearch
    }
  })

  // Sort notices by date (newest first)
  const sortedNotices = [...filteredNotices].sort((a, b) => 
    new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
  )

  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading notices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        
        {/* Header with Back Arrow */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Notice Board</h1>
            <p className="text-xs md:text-sm text-gray-500">View all college announcements and notices</p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-sm p-4 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell size={24} />
              <div>
                <p className="text-sm font-semibold">Total Notices</p>
                <p className="text-2xl font-bold">{notices.length}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/80">Latest</p>
              <p className="text-sm font-medium">{notices.length > 0 ? formatDate(notices[0].date || notices[0].createdAt) : 'No notices'}</p>
            </div>
          </div>
        </div>

        {/* Search and Categories */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notices by title or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Notices List */}
        {notices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Notices Found</h3>
            <p className="text-sm text-gray-500">There are no notices at the moment.</p>
          </div>
        ) : sortedNotices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Matching Notices</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedNotices.map((notice, index) => {
              const icon = getNoticeIcon(notice)
              const bgColor = getIconBgColor(notice)
              const isNew = new Date(notice.date || notice.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              
              return (
                <div
                  key={notice.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-5">
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        {icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800">{notice.title}</h3>
                          {isNew && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              New
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3 whitespace-pre-line">
                          {notice.content}
                        </p>

                        <div className="flex items-center text-xs text-gray-400">
                          <Calendar size={12} className="mr-1" />
                          {formatDate(notice.date || notice.createdAt)}
                          {(notice.date || notice.createdAt) && (
                            <span className="ml-2">
                              {new Date(notice.date || notice.createdAt).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          * Notices are published by college administration
        </p>
      </div>
    </div>
  )
}

// Missing Users import
const Users = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)