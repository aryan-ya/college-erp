"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Users,
  Calendar,
  Clock,
  FileText,
  ClipboardList,
  Award,
  BarChart,
  Plus,
  MoreVertical,
  RefreshCw,
  AlertCircle,
  GraduationCap,
  UserCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Copy
} from "lucide-react"

export default function FacultyCourses() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  
  // Faculty data
  const [facultyData, setFacultyData] = useState({
    name: "Dr. Priya Sharma",
    department: "Computer Science",
    employeeId: "FAC2024001"
  })

  // Departments for filter
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (!role || role !== "faculty") {
      router.replace("/login")
    } else {
      fetchData()
    }
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Fetch departments
      const deptsRes = await fetch("/api/admin/departments")
      const deptsData = await deptsRes.json()
      setDepartments(deptsData)
      
      // Fetch courses
      const coursesRes = await fetch("/api/faculty/courses")
      const coursesData = await coursesRes.json()
      
      // If API returns empty, use sample data
      if (coursesData.length === 0) {
        setCourses(sampleCourses)
        setFilteredCourses(sampleCourses)
      } else {
        setCourses(coursesData)
        setFilteredCourses(coursesData)
      }
      
    } catch (err) {
      console.error("Error fetching data:", err)
      // Use sample data on error
      setCourses(sampleCourses)
      setFilteredCourses(sampleCourses)
      setError("Using sample data - API connection failed")
    } finally {
      setLoading(false)
    }
  }

  // Sample courses data
  const sampleCourses = [
    { 
      id: 1, 
      code: "CS301", 
      name: "Data Structures", 
      department: "Computer Science", 
      semester: "3rd Semester",
      credits: 4,
      students: 45,
      assignments: 5,
      lectures: 32,
      attendance: 92,
      status: "active",
      schedule: "Mon, Wed 09:00-10:30",
      room: "Room 401",
      description: "Advanced data structures and algorithms",
      color: "blue"
    },
    { 
      id: 2, 
      code: "CS401", 
      name: "Algorithms", 
      department: "Computer Science", 
      semester: "4th Semester",
      credits: 4,
      students: 38,
      assignments: 6,
      lectures: 30,
      attendance: 88,
      status: "active",
      schedule: "Tue, Thu 11:00-12:30",
      room: "Room 402",
      description: "Design and analysis of algorithms",
      color: "purple"
    },
    { 
      id: 3, 
      code: "CS201", 
      name: "Python Programming", 
      department: "Computer Science", 
      semester: "2nd Semester",
      credits: 3,
      students: 52,
      assignments: 4,
      lectures: 28,
      attendance: 95,
      status: "active",
      schedule: "Fri 09:00-12:30",
      room: "Lab 203",
      description: "Introduction to Python programming",
      color: "green"
    },
    { 
      id: 4, 
      code: "CS501", 
      name: "Machine Learning", 
      department: "Computer Science", 
      semester: "5th Semester",
      credits: 4,
      students: 32,
      assignments: 3,
      lectures: 25,
      attendance: 90,
      status: "upcoming",
      schedule: "Mon, Wed 14:00-15:30",
      room: "Room 405",
      description: "Fundamentals of machine learning",
      color: "orange"
    },
    { 
      id: 5, 
      code: "CS601", 
      name: "Artificial Intelligence", 
      department: "Computer Science", 
      semester: "6th Semester",
      credits: 4,
      students: 28,
      assignments: 2,
      lectures: 20,
      attendance: 85,
      status: "upcoming",
      schedule: "Tue, Thu 14:00-15:30",
      room: "Room 406",
      description: "AI concepts and applications",
      color: "red"
    },
    { 
      id: 6, 
      code: "CS202", 
      name: "Object Oriented Programming", 
      department: "Computer Science", 
      semester: "2nd Semester",
      credits: 3,
      students: 48,
      assignments: 4,
      lectures: 30,
      attendance: 87,
      status: "completed",
      schedule: "Mon, Wed 11:00-12:30",
      room: "Room 403",
      description: "OOP concepts in Java",
      color: "blue"
    }
  ]

  // Filter courses based on search and filters
  useEffect(() => {
    let filtered = courses
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(c => c.department === selectedDepartment)
    }
    
    if (selectedSemester !== "all") {
      filtered = filtered.filter(c => c.semester === selectedSemester)
    }
    
    if (selectedStatus !== "all") {
      filtered = filtered.filter(c => c.status === selectedStatus)
    }
    
    setFilteredCourses(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedDepartment, selectedSemester, selectedStatus, courses])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)

  // Stats
  const totalCourses = courses.length
  const activeCourses = courses.filter(c => c.status === "active").length
  const totalStudents = courses.reduce((acc, c) => acc + c.students, 0)
  const avgAttendance = Math.round(courses.reduce((acc, c) => acc + c.attendance, 0) / courses.length)

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircle size={12} className="mr-1" />
      case 'upcoming': return <Clock size={12} className="mr-1" />
      case 'completed': return <Award size={12} className="mr-1" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              My Courses
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchData}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={18} className="hover:rotate-180 transition-transform duration-500" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                {facultyData.name.charAt(0)}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">{facultyData.name}</p>
                <p className="text-xs text-gray-500">{facultyData.employeeId}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total Courses</p>
              <BookOpen size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{totalCourses}</p>
            <p className="text-xs text-blue-600 mt-1">Courses you teach</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Active Courses</p>
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{activeCourses}</p>
            <p className="text-xs text-green-600 mt-1">Currently running</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total Students</p>
              <Users size={20} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{totalStudents}</p>
            <p className="text-xs text-purple-600 mt-1">Across all courses</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Avg Attendance</p>
              <BarChart size={20} className="text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{avgAttendance}%</p>
            <p className="text-xs text-orange-600 mt-1">Overall average</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by course name, code or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Semesters</option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option>
                <option value="5th Semester">5th Semester</option>
                <option value="6th Semester">6th Semester</option>
                <option value="7th Semester">7th Semester</option>
                <option value="8th Semester">8th Semester</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>

              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={18} className="text-gray-600" />
              </button>

              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Download size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6 flex items-center border-l-4 border-yellow-600">
            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {currentItems.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {/* Course Header */}
                  <div className={`h-2 bg-gradient-to-r from-${course.color}-600 to-${course.color}-400`}></div>
                  
                  <div className="p-6">
                    {/* Course Code and Status */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {course.code}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                        {getStatusIcon(course.status)}
                        {course.status}
                      </span>
                    </div>

                    {/* Course Name */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{course.name}</h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-500 mb-4">{course.description}</p>

                    {/* Course Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <Users size={14} className="text-blue-600" />
                        <span className="text-xs text-gray-600">{course.students} Students</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap size={14} className="text-purple-600" />
                        <span className="text-xs text-gray-600">{course.semester}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClipboardList size={14} className="text-green-600" />
                        <span className="text-xs text-gray-600">{course.assignments} Assignments</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-orange-600" />
                        <span className="text-xs text-gray-600">{course.credits} Credits</span>
                      </div>
                    </div>

                    {/* Schedule and Room */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} className="text-blue-600" />
                          <span className="text-xs text-gray-600">{course.schedule}</span>
                        </div>
                        <span className="text-xs text-gray-400">{course.room}</span>
                      </div>
                      
                      {/* Attendance Progress */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Attendance</span>
                        <span className={`text-xs font-medium ${
                          course.attendance >= 90 ? 'text-green-600' :
                          course.attendance >= 75 ? 'text-blue-600' :
                          'text-orange-600'
                        }`}>
                          {course.attendance}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div 
                          className={`h-full ${
                            course.attendance >= 90 ? 'bg-green-600' :
                            course.attendance >= 75 ? 'bg-blue-600' :
                            'bg-orange-600'
                          }`}
                          style={{ width: `${course.attendance}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => router.push(`/faculty/courses/${course.id}`)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Eye size={16} />
                        <span>View Details</span>
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Course">
                          <Edit size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Copy Course">
                          <Copy size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete Course">
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredCourses.length)}
                </span>{' '}
                of <span className="font-medium">{filteredCourses.length}</span> courses
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border ${
                    currentPage === 1 
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                  } transition-colors`}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border ${
                    currentPage === totalPages 
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                  } transition-colors`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex justify-end space-x-3">
              {/* <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={18} />
                <span>Create New Course</span>
              </button> */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <FileText size={18} />
                <span>Export Courses</span>
              </button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-4 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© 2026 College ERP. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}