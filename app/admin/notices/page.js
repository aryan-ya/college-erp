"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import {
  Bell,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Pin,
  Eye,
  Edit,
  Trash2,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Download,
  Upload,
  AlertCircle,
  Megaphone,
  FileText,
  Tag,
  Users,
  Building2,
  CheckCircle,
  Paperclip
} from "lucide-react"

export default function NoticesPage() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState(null)
  const [viewMode, setViewMode] = useState("card") // card or list
  const [error, setError] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
    priority: "medium",
    targetAudience: "all",
    departmentId: "",
    expiryDate: "",
    attachments: "",
    isPinned: false
  })

  const [departments, setDepartments] = useState([])

  const itemsPerPage = 9
  const router = useRouter()

  // Categories for filtering
  const categories = [
    { value: "general", label: "General", color: "blue" },
    { value: "academic", label: "Academic", color: "green" },
    { value: "exam", label: "Exam", color: "purple" },
    { value: "event", label: "Event", color: "orange" },
    { value: "holiday", label: "Holiday", color: "red" },
    { value: "meeting", label: "Meeting", color: "indigo" },
    { value: "circular", label: "Circular", color: "pink" }
  ]

  // Priority levels
  const priorities = [
    { value: "high", label: "High", color: "red" },
    { value: "medium", label: "Medium", color: "yellow" },
    { value: "low", label: "Low", color: "green" }
  ]

  useEffect(() => {
    fetchNotices()
    fetchDepartments()
  }, [])

  const fetchNotices = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/notices")
      if (!res.ok) throw new Error("Failed to fetch notices")
      const data = await res.json()
      setNotices(data)
    } catch (error) {
      console.error("Error fetching notices:", error)
      setError("Failed to load notices")
      toast.error("Failed to load notices")
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/admin/departments")
      const data = await res.json()
      setDepartments(data)
    } catch (error) {
      console.error("Error fetching departments:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "general",
      priority: "medium",
      targetAudience: "all",
      departmentId: "",
      expiryDate: "",
      attachments: "",
      isPinned: false
    })
    setEditingNotice(null)
    setShowForm(false)
    setError(null)
  }

  const handleEdit = (notice) => {
    setEditingNotice(notice)
    setFormData({
      title: notice.title,
      content: notice.content,
      category: notice.category || "general",
      priority: notice.priority || "medium",
      targetAudience: notice.targetAudience || "all",
      departmentId: notice.departmentId?.toString() || "",
      expiryDate: notice.expiryDate?.split('T')[0] || "",
      attachments: notice.attachments || "",
      isPinned: notice.isPinned || false
    })
    setShowForm(true)
  }

  const addNotice = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/admin/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error("Failed to add notice")
      
      toast.success("Notice added successfully")
      resetForm()
      await fetchNotices()
    } catch (error) {
      console.error("Error adding notice:", error)
      toast.error("Failed to add notice")
    } finally {
      setLoading(false)
    }
  }

  const updateNotice = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/admin/notices", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: editingNotice.id,
          ...formData
        })
      })

      if (!res.ok) throw new Error("Failed to update notice")
      
      toast.success("Notice updated successfully")
      resetForm()
      await fetchNotices()
    } catch (error) {
      console.error("Error updating notice:", error)
      toast.error("Failed to update notice")
    } finally {
      setLoading(false)
    }
  }

  const deleteNotice = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    setLoading(true)
    try {
      const res = await fetch("/api/admin/notices", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      })

      if (!res.ok) throw new Error("Failed to delete notice")
      
      toast.success("Notice deleted successfully")
      await fetchNotices()
    } catch (error) {
      console.error("Error deleting notice:", error)
      toast.error("Failed to delete notice")
    } finally {
      setLoading(false)
    }
  }

  const togglePin = async (id, currentPinStatus) => {
    try {
      const res = await fetch("/api/admin/notices", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          isPinned: !currentPinStatus
        })
      })

      if (!res.ok) throw new Error("Failed to update pin status")
      
      toast.success(currentPinStatus ? "Notice unpinned" : "Notice pinned")
      await fetchNotices()
    } catch (error) {
      console.error("Error toggling pin:", error)
      toast.error("Failed to update pin status")
    }
  }

  // Filter notices
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = 
      notice.title?.toLowerCase().includes(search.toLowerCase()) ||
      notice.content?.toLowerCase().includes(search.toLowerCase())
    
    const matchesCategory = filterCategory === "all" || notice.category === filterCategory
    const matchesPriority = filterPriority === "all" || notice.priority === filterPriority
    
    return matchesSearch && matchesCategory && matchesPriority
  })

  // Sort: pinned notices first, then by date
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  // Pagination
  const totalPages = Math.ceil(sortedNotices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNotices = sortedNotices.slice(startIndex, startIndex + itemsPerPage)

  // Get category color
  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category)
    return cat?.color || "gray"
  }

  // Get priority color
  const getPriorityColor = (priority) => {
    const pri = priorities.find(p => p.value === priority)
    return pri?.color || "gray"
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  // Check if notice is expired
  const isExpired = (expiryDate) => {
    return expiryDate && new Date(expiryDate) < new Date()
  }

  // Stats
  const stats = {
    total: notices.length,
    pinned: notices.filter(n => n.isPinned).length,
    active: notices.filter(n => !n.expiryDate || new Date(n.expiryDate) >= new Date()).length,
    expired: notices.filter(n => n.expiryDate && new Date(n.expiryDate) < new Date()).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="group relative w-10 h-10 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center overflow-hidden"
              >
                <ArrowLeft size={18} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </button>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Notice Board
                </h1>
                <p className="text-gray-500 mt-1 flex items-center">
                  <Megaphone size={16} className="mr-1" />
                  Manage and publish notices for students and faculty
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === "card" ? "list" : "card")}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm"
              >
                {viewMode === "card" ? "List View" : "Card View"}
              </button>
              <button
                onClick={() => {
                  resetForm()
                  setShowForm(true)
                }}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus size={18} className="mr-2" />
                Post Notice
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Notices</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText size={24} className="text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pinned</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.pinned}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Pin size={24} className="text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Active</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.active}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Expired</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.expired}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Notice Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 sticky top-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    {editingNotice ? 'Edit Notice' : 'Post New Notice'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title *</label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter notice title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Content *</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Enter notice content"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Priority</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {priorities.map(pri => (
                          <option key={pri.value} value={pri.value}>{pri.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Target Audience</label>
                      <select
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All</option>
                        <option value="students">Students Only</option>
                        <option value="faculty">Faculty Only</option>
                        <option value="department">Specific Department</option>
                      </select>
                    </div>

                    {formData.targetAudience === "department" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Department</label>
                        <select
                          name="departmentId"
                          value={formData.departmentId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Department</option>
                          {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Expiry Date (Optional)</label>
                      <input
                        name="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Attachments (Optional)</label>
                      <input
                        name="attachments"
                        value={formData.attachments}
                        onChange={handleInputChange}
                        placeholder="Link or file name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      name="isPinned"
                      type="checkbox"
                      checked={formData.isPinned}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Pin this notice (appears at the top)
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingNotice ? updateNotice : addNotice}
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading && <Loader2 size={16} className="animate-spin mr-2" />}
                    {editingNotice ? 'Update Notice' : 'Post Notice'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notices..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Tag size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <AlertCircle size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterPriority}
                onChange={(e) => {
                  setFilterPriority(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Priorities</option>
                {priorities.map(pri => (
                  <option key={pri.value} value={pri.value}>{pri.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedNotices.length)} of {sortedNotices.length} notices
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={16} className="text-gray-600" />
            </button>
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && !showForm && (
          <div className="flex justify-center items-center h-64">
            <Loader2 size={40} className="animate-spin text-blue-600" />
          </div>
        )}

        {/* Empty State */}
        {!loading && sortedNotices.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Bell size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Notices Found</h3>
            <p className="text-gray-500 mb-6">
              {search || filterCategory !== "all" || filterPriority !== "all"
                ? 'No notices match your filters'
                : 'Get started by posting your first notice'}
            </p>
            {!search && filterCategory === "all" && filterPriority === "all" && (
              <button
                onClick={() => {
                  resetForm()
                  setShowForm(true)
                }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Post Notice
              </button>
            )}
          </div>
        )}

        {/* Card View */}
        {!loading && sortedNotices.length > 0 && viewMode === "card" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedNotices.map((notice) => {
                const categoryColor = getCategoryColor(notice.category)
                const priorityColor = getPriorityColor(notice.priority)
                const expired = isExpired(notice.expiryDate)

                return (
                  <div
                    key={notice.id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      expired ? 'opacity-60' : ''
                    } ${notice.isPinned ? 'ring-2 ring-yellow-400' : ''}`}
                  >
                    {notice.isPinned && (
                      <div className="bg-yellow-400 px-4 py-1 flex items-center justify-center">
                        <Pin size={14} className="text-white mr-1" />
                        <span className="text-xs font-medium text-white">PINNED</span>
                      </div>
                    )}
                    
                    <div className={`h-2 bg-${categoryColor}-500`}></div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${categoryColor}-100 text-${categoryColor}-700`}>
                          {categories.find(c => c.value === notice.category)?.label || 'General'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${priorityColor}-100 text-${priorityColor}-700`}>
                          {notice.priority?.charAt(0).toUpperCase() + notice.priority?.slice(1) || 'Medium'}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {notice.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {notice.content}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar size={12} className="mr-1" />
                          Posted: {formatDate(notice.createdAt)}
                        </div>
                        
                        {notice.expiryDate && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            Expires: {formatDate(notice.expiryDate)}
                            {expired && <span className="ml-2 text-red-500">(Expired)</span>}
                          </div>
                        )}

                        {notice.targetAudience !== "all" && (
                          <div className="flex items-center text-xs text-gray-500">
                            {notice.targetAudience === "students" ? <Users size={12} className="mr-1" /> :
                             notice.targetAudience === "faculty" ? <Users size={12} className="mr-1" /> :
                             <Building2 size={12} className="mr-1" />}
                            Target: {notice.targetAudience === "department" 
                              ? departments.find(d => d.id === parseInt(notice.departmentId))?.name 
                              : notice.targetAudience}
                          </div>
                        )}

                        {notice.attachments && (
                          <div className="flex items-center text-xs text-blue-600">
                            <Paperclip size={12} className="mr-1" />
                            {notice.attachments}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => togglePin(notice.id, notice.isPinned)}
                            className={`p-2 rounded-lg transition-colors ${
                              notice.isPinned 
                                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title={notice.isPinned ? "Unpin" : "Pin"}
                          >
                            <Pin size={14} />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleEdit(notice)}
                            className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => deleteNotice(notice.id, notice.title)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-white rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-white rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}

        {/* List View */}
        {!loading && sortedNotices.length > 0 && viewMode === "list" && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {paginatedNotices.map((notice) => {
                const categoryColor = getCategoryColor(notice.category)
                const priorityColor = getPriorityColor(notice.priority)
                const expired = isExpired(notice.expiryDate)

                return (
                  <div 
                    key={notice.id} 
                    className={`p-6 hover:bg-gray-50 transition-colors ${notice.isPinned ? 'bg-yellow-50/50' : ''} ${expired ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {notice.isPinned && (
                            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                              <Pin size={10} className="mr-1" />
                              Pinned
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${categoryColor}-100 text-${categoryColor}-700`}>
                            {categories.find(c => c.value === notice.category)?.label || 'General'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${priorityColor}-100 text-${priorityColor}-700`}>
                            {notice.priority?.charAt(0).toUpperCase() + notice.priority?.slice(1) || 'Medium'}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {notice.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-3">
                          {notice.content}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            {formatDate(notice.createdAt)}
                          </span>
                          
                          {notice.expiryDate && (
                            <span className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              Expires: {formatDate(notice.expiryDate)}
                              {expired && <span className="ml-2 text-red-500">(Expired)</span>}
                            </span>
                          )}

                          {notice.targetAudience !== "all" && (
                            <span className="flex items-center">
                              {notice.targetAudience === "students" ? <Users size={12} className="mr-1" /> :
                               notice.targetAudience === "faculty" ? <Users size={12} className="mr-1" /> :
                               <Building2 size={12} className="mr-1" />}
                              {notice.targetAudience === "department" 
                                ? departments.find(d => d.id === parseInt(notice.departmentId))?.name 
                                : notice.targetAudience}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button 
                          onClick={() => togglePin(notice.id, notice.isPinned)}
                          className={`p-2 rounded-lg transition-colors ${
                            notice.isPinned 
                              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title={notice.isPinned ? "Unpin" : "Pin"}
                        >
                          <Pin size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(notice)}
                          className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => deleteNotice(notice.id, notice.title)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedNotices.length)} of {sortedNotices.length} notices
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-white rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-white rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}