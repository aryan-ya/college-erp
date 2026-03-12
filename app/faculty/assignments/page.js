"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  FileText,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  Eye,
  ChevronRight,
  Loader2,
  BookOpen,
  GraduationCap,
  Filter,
  Search,
  Plus,
  FileUp,
  FileCheck,
  X,
  Award,
  TrendingUp,
  Bell,
  Paperclip,
  MessageSquare,
  Star,
  Users,
  Building,
  Sparkles
} from "lucide-react"

export default function StudentAssignments() {
  const router = useRouter()
  
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all") // all, pending, submitted, graded
  const [sort, setSort] = useState("dueDate") // dueDate, title, course
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadFile, setUploadFile] = useState(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [studentCourses, setStudentCourses] = useState([])
  
  // Student data
  const [studentData, setStudentData] = useState({
    id: "CS2024001",
    name: "Aryan Yadav",
    rollNo: "CS2024001",
    department: "Computer Science",
    semester: "4th Semester",
    email: "aryan@college.edu"
  })

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    submitted: 0,
    graded: 0,
    averageGrade: 0
  })

  useEffect(() => {
    // Check authentication
    const role = localStorage.getItem("role")
    if (!role || role !== "student") {
      router.replace("/login")
    } else {
      // Get student data from localStorage
      const savedStudent = localStorage.getItem("user")
      if (savedStudent) {
        try {
          const parsed = JSON.parse(savedStudent)
          setStudentData(prev => ({ ...prev, ...parsed }))
        } catch (e) {
          console.error("Error parsing student data")
        }
      }
      fetchStudentCourses()
    }
  }, [])

  const fetchStudentCourses = async () => {
    try {
      // Fetch courses this student is enrolled in
      const res = await fetch(`/api/student/courses?studentId=${studentData.id}`)
      if (res.ok) {
        const data = await res.json()
        setStudentCourses(data)
        // Now fetch assignments for these courses
        fetchAssignments(data)
      } else {
        // If API fails, use mock enrolled courses
        const mockCourses = [
          { id: 1, code: "CS301", name: "Data Structures" },
          { id: 2, code: "CS401", name: "Algorithms" },
          { id: 3, code: "CS201", name: "Python Programming" }
        ]
        setStudentCourses(mockCourses)
        fetchAssignments(mockCourses)
      }
    } catch (error) {
      console.error("Error fetching student courses:", error)
      // Fallback to mock courses
      const mockCourses = [
        { id: 1, code: "CS301", name: "Data Structures" },
        { id: 2, code: "CS401", name: "Algorithms" },
        { id: 3, code: "CS201", name: "Python Programming" }
      ]
      setStudentCourses(mockCourses)
      fetchAssignments(mockCourses)
    }
  }

  const fetchAssignments = async (enrolledCourses) => {
    setLoading(true)
    setError("")
    
    try {
      // Fetch assignments from faculty API
      const res = await fetch("/api/faculty/assignments")
      
      if (!res.ok) {
        throw new Error("Failed to fetch assignments")
      }
      
      const allAssignments = await res.json()
      
      // Get course codes that student is enrolled in
      const enrolledCourseCodes = enrolledCourses.map(c => c.code)
      
      // Filter assignments for this student's courses
      const studentAssignments = allAssignments.filter(assignment => 
        enrolledCourseCodes.includes(assignment.courseCode)
      )
      
      // Fetch student's submissions to check status
      const submissionsRes = await fetch(`/api/student/submissions?studentId=${studentData.id}`)
      const submissions = submissionsRes.ok ? await submissionsRes.json() : []
      
      // Merge assignment data with submission data
      const mergedAssignments = studentAssignments.map(assignment => {
        const submission = submissions.find(s => s.assignmentId === assignment.id)
        
        return {
          ...assignment,
          status: submission ? submission.status : "pending",
          submittedAt: submission?.submittedAt,
          grade: submission?.grade,
          feedback: submission?.feedback,
          submissionId: submission?.id,
          submissionFile: submission?.file
        }
      })
      
      setAssignments(mergedAssignments)
      
      // Calculate stats
      const total = mergedAssignments.length
      const pending = mergedAssignments.filter(a => a.status === "pending").length
      const submitted = mergedAssignments.filter(a => a.status === "submitted").length
      const graded = mergedAssignments.filter(a => a.status === "graded").length
      
      // Calculate average grade
      const gradedAssignments = mergedAssignments.filter(a => a.grade)
      const avgGrade = gradedAssignments.length > 0
        ? Math.round(gradedAssignments.reduce((acc, curr) => acc + (curr.grade / curr.totalMarks * 100), 0) / gradedAssignments.length)
        : 0

      setStats({
        total,
        pending,
        submitted,
        graded,
        averageGrade: avgGrade
      })

    } catch (error) {
      console.error("Error fetching assignments:", error)
      setError("Failed to load assignments. Please try again.")
      
      // Fallback to mock data if API fails
      const mockAssignments = [
        {
          id: 1,
          title: "Data Structures Assignment - Trees",
          course: "Data Structures",
          courseCode: "CS301",
          professor: "Dr. Sharma",
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          totalMarks: 100,
          status: "pending",
          description: "Implement binary tree traversal algorithms. Submit code and documentation.",
          attachments: ["assignment.pdf"],
          submittedAt: null,
          grade: null,
          feedback: null,
          priority: "high",
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Algorithms - Sorting Algorithms",
          course: "Algorithms",
          courseCode: "CS401",
          professor: "Prof. Gupta",
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          totalMarks: 50,
          status: "pending",
          description: "Implement and compare different sorting algorithms.",
          attachments: ["problems.pdf"],
          submittedAt: null,
          grade: null,
          feedback: null,
          priority: "medium",
          createdAt: new Date().toISOString()
        }
      ]
      setAssignments(mockAssignments)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async () => {
    if (!uploadFile) {
      setError("Please select a file")
      return
    }

    setUploadLoading(true)
    setError("")

    try {
      // Create form data
      const formData = new FormData()
      formData.append("file", uploadFile)
      formData.append("assignmentId", selectedAssignment.id)
      formData.append("studentId", studentData.id)
      formData.append("studentName", studentData.name)
      formData.append("rollNo", studentData.rollNo)

      // Upload submission
      const res = await fetch("/api/student/assignments/submit", {
        method: "POST",
        body: formData
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      setUploadSuccess(true)
      
      // Close modal after success and refresh
      setTimeout(() => {
        setShowUploadModal(false)
        setUploadSuccess(false)
        setUploadFile(null)
        fetchAssignments(studentCourses) // Refresh assignments
      }, 1500)

    } catch (error) {
      console.error("Upload error:", error)
      setError("Upload failed. Please try again.")
    } finally {
      setUploadLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "submitted": return "bg-blue-100 text-blue-700 border-blue-200"
      case "graded": return "bg-green-100 text-green-700 border-green-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "bg-red-100 text-red-700"
      case "medium": return "bg-yellow-100 text-yellow-700"
      case "low": return "bg-green-100 text-green-700"
      default: return "bg-gray-100 text-gray-700"
    }
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

  const filteredAssignments = assignments
    .filter(a => {
      const matchesSearch = a.title?.toLowerCase().includes(search.toLowerCase()) ||
                           a.course?.toLowerCase().includes(search.toLowerCase()) ||
                           a.courseCode?.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === "all" || a.status === filter
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sort === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (sort === "title") {
        return a.title.localeCompare(b.title)
      }
      if (sort === "course") {
        return a.course.localeCompare(b.course)
      }
      return 0
    })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FileText size={28} className="mr-2 text-blue-600" />
              My Assignments
            </h1>
            <p className="text-gray-500 mt-1">Track and submit your academic assignments</p>
          </div>
          <div className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
            <Sparkles size={16} className="mr-2" />
            {studentData.name} • {studentData.rollNo}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-600">
            <p className="text-sm text-gray-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 mb-1">Submitted</p>
            <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-500 mb-1">Graded</p>
            <p className="text-2xl font-bold text-green-600">{stats.graded}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
            <p className="text-sm text-gray-500 mb-1">Avg. Grade</p>
            <p className="text-2xl font-bold text-purple-600">{stats.averageGrade}%</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search assignments by title, course or code..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="title">Sort by Title</option>
                <option value="course">Sort by Course</option>
              </select>
              <button
                onClick={() => fetchAssignments(studentCourses)}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                title="Refresh"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center">
            <AlertCircle size={18} className="text-red-500 mr-2" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Assignments Found</h3>
              <p className="text-gray-500">No assignments match your search criteria.</p>
            </div>
          ) : (
            filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          assignment.status === "pending" ? "bg-yellow-100" :
                          assignment.status === "submitted" ? "bg-blue-100" :
                          "bg-green-100"
                        }`}>
                          {assignment.status === "pending" ? (
                            <Clock size={24} className="text-yellow-600" />
                          ) : assignment.status === "submitted" ? (
                            <Upload size={24} className="text-blue-600" />
                          ) : (
                            <CheckCircle size={24} className="text-green-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {assignment.title}
                            </h3>
                            {assignment.priority && (
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(assignment.priority)}`}>
                                {assignment.priority} priority
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center">
                              <BookOpen size={14} className="mr-1 text-blue-600" />
                              {assignment.course} ({assignment.courseCode})
                            </span>
                            <span className="flex items-center">
                              <GraduationCap size={14} className="mr-1 text-purple-600" />
                              {assignment.professor}
                            </span>
                            <span className="flex items-center">
                              <Award size={14} className="mr-1 text-green-600" />
                              {assignment.totalMarks} marks
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {assignment.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </span>
                            
                            <span className="flex items-center text-sm text-gray-500">
                              <Calendar size={14} className="mr-1" />
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </span>

                            <span className={`text-sm font-medium ${
                              getDaysLeft(assignment.dueDate).includes("Overdue") ? "text-red-600" :
                              getDaysLeft(assignment.dueDate).includes("today") ? "text-orange-600" :
                              "text-gray-600"
                            }`}>
                              {getDaysLeft(assignment.dueDate)}
                            </span>

                            {assignment.attachments && assignment.attachments.length > 0 && (
                              <span className="flex items-center text-sm text-gray-500">
                                <Paperclip size={14} className="mr-1" />
                                {assignment.attachments.length} files
                              </span>
                            )}

                            <span className="text-xs text-gray-400">
                              Posted: {new Date(assignment.createdAt || assignment.dueDate).toLocaleDateString()}
                            </span>
                          </div>

                          {assignment.status === "graded" && (
                            <div className="mt-3 p-3 bg-green-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                  Grade: {assignment.grade}/{assignment.totalMarks}
                                </span>
                                <span className="text-sm text-gray-600">
                                  {Math.round((assignment.grade / assignment.totalMarks) * 100)}%
                                </span>
                              </div>
                              {assignment.feedback && (
                                <p className="text-xs text-gray-600 mt-1">
                                  <span className="font-medium">Feedback:</span> {assignment.feedback}
                                </p>
                              )}
                            </div>
                          )}

                          {assignment.status === "submitted" && (
                            <div className="mt-3 text-sm text-gray-500">
                              Submitted on {new Date(assignment.submittedAt).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 md:mt-0 md:ml-4">
                      <button
                        onClick={() => setSelectedAssignment(assignment)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      
                      {assignment.attachments && assignment.attachments.length > 0 && (
                        <button
                          className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                          title="Download Attachments"
                        >
                          <Download size={18} />
                        </button>
                      )}

                      {assignment.status === "pending" && (
                        <button
                          onClick={() => {
                            setSelectedAssignment(assignment)
                            setShowUploadModal(true)
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center"
                        >
                          <Upload size={16} className="mr-2" />
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Assignment Details Modal */}
        {selectedAssignment && !showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 sticky top-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Assignment Details</h2>
                  <button
                    onClick={() => setSelectedAssignment(null)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedAssignment.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(selectedAssignment.status)}`}>
                        {selectedAssignment.status}
                      </span>
                      {selectedAssignment.priority && (
                        <span className={`text-xs px-3 py-1 rounded-full ${getPriorityColor(selectedAssignment.priority)}`}>
                          {selectedAssignment.priority} priority
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Course</p>
                      <p className="font-medium">{selectedAssignment.course}</p>
                      <p className="text-sm text-gray-600">{selectedAssignment.courseCode}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Professor</p>
                      <p className="font-medium">{selectedAssignment.professor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p className="font-medium">{new Date(selectedAssignment.dueDate).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Marks</p>
                      <p className="font-medium">{selectedAssignment.totalMarks}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedAssignment.description}</p>
                  </div>

                  {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Attachments</h4>
                      <div className="space-y-2">
                        {selectedAssignment.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">{file}</span>
                            <button className="text-blue-600 hover:text-blue-700">
                              <Download size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedAssignment.status === "graded" && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-2">Grade & Feedback</h4>
                      <div className="mb-2">
                        <span className="text-lg font-bold text-green-600">{selectedAssignment.grade}/{selectedAssignment.totalMarks}</span>
                        <span className="ml-2 text-sm text-gray-600">
                          ({Math.round((selectedAssignment.grade / selectedAssignment.totalMarks) * 100)}%)
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{selectedAssignment.feedback}</p>
                    </div>
                  )}

                  {selectedAssignment.status === "submitted" && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Submitted on {new Date(selectedAssignment.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setSelectedAssignment(null)}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                    {selectedAssignment.status === "pending" && (
                      <button
                        onClick={() => {
                          setShowUploadModal(true)
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
                      >
                        <Upload size={16} className="mr-2" />
                        Submit Assignment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && selectedAssignment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Submit Assignment</h2>
                  <button
                    onClick={() => {
                      setShowUploadModal(false)
                      setUploadFile(null)
                      setError("")
                    }}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {uploadSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Successful!</h3>
                    <p className="text-gray-500 text-sm">Your assignment has been submitted.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-800 mb-2">{selectedAssignment.title}</h3>
                      <p className="text-sm text-gray-600">Due: {new Date(selectedAssignment.dueDate).toLocaleString()}</p>
                    </div>

                    {error && (
                      <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center hover:border-blue-500 transition-colors">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => setUploadFile(e.target.files[0])}
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer"
                      >
                        <FileUp size={40} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          {uploadFile ? uploadFile.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-400">
                          PDF, DOC, DOCX, ZIP (Max 10MB)
                        </p>
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setShowUploadModal(false)
                          setUploadFile(null)
                          setError("")
                        }}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpload}
                        disabled={uploadLoading || !uploadFile}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploadLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin mr-2" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload size={16} className="mr-2" />
                            Submit
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}