"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Plus,
  Trash2,
  Edit,
  X,
  AlertCircle,
  Loader2,
  CheckCircle,
  Users,
  GraduationCap,
  Filter,
  Search,
  ChevronRight,
  Download,
  Eye
} from "lucide-react"

export default function FacultyAssignments() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState(null)
  const [search, setSearch] = useState("")
  const [filterCourse, setFilterCourse] = useState("all")
  
  // Data states
  const [assignments, setAssignments] = useState([])
  const [courses, setCourses] = useState([])
  const [submissions, setSubmissions] = useState({})

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    courseId: "",
    description: "",
    dueDate: "",
    totalMarks: "",
    attachments: ""
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch assignments
      const assignmentsRes = await fetch("/api/faculty/assignments")
      const assignmentsData = await assignmentsRes.json()
      
      // Fetch courses (assuming you have courses API)
      const coursesRes = await fetch("/api/faculty/courses")
      const coursesData = await coursesRes.json()

      // Fetch submissions for each assignment
      const submissionsData = {}
      for (const assignment of assignmentsData) {
        const subRes = await fetch(`/api/faculty/assignments/${assignment.id}/submissions`)
        const subData = await subRes.json()
        submissionsData[assignment.id] = subData
      }

      setAssignments(assignmentsData)
      setCourses(coursesData)
      setSubmissions(submissionsData)
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      courseId: "",
      description: "",
      dueDate: "",
      totalMarks: "",
      attachments: ""
    })
    setEditingAssignment(null)
    setShowForm(false)
    setError(null)
  }

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment)
    setFormData({
      title: assignment.title,
      courseId: assignment.courseId,
      description: assignment.description,
      dueDate: assignment.dueDate.split('T')[0],
      totalMarks: assignment.totalMarks || "",
      attachments: assignment.attachments || ""
    })
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.courseId || !formData.dueDate) {
      setError("Please fill all required fields")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const url = "/api/faculty/assignments"
      const method = editingAssignment ? "PUT" : "POST"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAssignment ? 
          { ...formData, id: editingAssignment.id } : formData
        )
      })

      if (!res.ok) throw new Error("Failed to save assignment")

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      resetForm()
      fetchData()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return

    setLoading(true)
    try {
      const res = await fetch("/api/faculty/assignments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })

      if (!res.ok) throw new Error("Failed to delete assignment")

      fetchData()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getDaysLeft = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due today"
    if (diffDays === 1) return "1 day left"
    return `${diffDays} days left`
  }

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title?.toLowerCase().includes(search.toLowerCase()) ||
                         assignment.description?.toLowerCase().includes(search.toLowerCase())
    const matchesCourse = filterCourse === "all" || assignment.courseId === filterCourse
    return matchesSearch && matchesCourse
  })

  const stats = {
    total: assignments.length,
    active: assignments.filter(a => new Date(a.dueDate) > new Date()).length,
    overdue: assignments.filter(a => new Date(a.dueDate) < new Date()).length,
    totalSubmissions: Object.values(submissions).flat().length
  }

  if (loading && !showForm) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading assignments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header with Back Arrow */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Assignments</h1>
              <p className="text-sm text-gray-500">Create and manage course assignments</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Plus size={18} />
            <span>New Assignment</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-600">
            <p className="text-xs text-gray-500 mb-1">Total Assignments</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-600">
            <p className="text-xs text-gray-500 mb-1">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500">
            <p className="text-xs text-gray-500 mb-1">Overdue</p>
            <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-600">
            <p className="text-xs text-gray-500 mb-1">Submissions</p>
            <p className="text-2xl font-bold text-purple-600">{stats.totalSubmissions}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search assignments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center">
            <CheckCircle size={18} className="text-green-500 mr-2" />
            <p className="text-green-700">Assignment saved successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center">
            <AlertCircle size={18} className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Assignment Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 sticky top-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    {editingAssignment ? "Edit Assignment" : "Create New Assignment"}
                  </h2>
                  <button onClick={resetForm} className="text-white/80 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assignment Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., React.js Project"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course *
                    </label>
                    <select
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Enter assignment details, instructions, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date *
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Marks
                      </label>
                      <input
                        type="number"
                        name="totalMarks"
                        value={formData.totalMarks}
                        onChange={handleInputChange}
                        placeholder="e.g., 100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attachments (Optional)
                    </label>
                    <input
                      type="text"
                      name="attachments"
                      value={formData.attachments}
                      onChange={handleInputChange}
                      placeholder="Link to resources or files"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center"
                  >
                    {loading && <Loader2 size={16} className="animate-spin mr-2" />}
                    {editingAssignment ? "Update Assignment" : "Create Assignment"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Assignments</h3>
              <p className="text-sm text-gray-500">Create your first assignment to get started.</p>
            </div>
          ) : (
            filteredAssignments.map((assignment) => {
              const daysLeft = getDaysLeft(assignment.dueDate)
              const assignmentSubmissions = submissions[assignment.id] || []
              
              return (
                <div key={assignment.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            daysLeft.includes('Overdue') ? 'bg-red-100 text-red-700' :
                            daysLeft.includes('today') ? 'bg-orange-100 text-orange-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {daysLeft}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <BookOpen size={14} className="mr-1 text-blue-600" />
                            {courses.find(c => c.id === assignment.courseId)?.name || 'Course'}
                          </span>
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1 text-purple-600" />
                            Due: {formatDate(assignment.dueDate)}
                          </span>
                          <span className="flex items-center">
                            <Users size={14} className="mr-1 text-green-600" />
                            {assignmentSubmissions.length} Submissions
                          </span>
                        </div>

                        {assignment.description && (
                          <p className="text-sm text-gray-600 mb-4">{assignment.description}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => router.push(`/faculty/assignments/${assignment.id}/submissions`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View Submissions"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(assignment)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(assignment.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Submissions Preview */}
                    {assignmentSubmissions.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Recent Submissions</p>
                        <div className="space-y-2">
                          {assignmentSubmissions.slice(0, 2).map((sub, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                              <span className="text-gray-700">{sub.studentName}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(sub.submittedAt).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          * Assignments are visible to students immediately after creation
        </p>
      </div>
    </div>
  )
}