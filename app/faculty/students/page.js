"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Clock,
  UserCircle,
  GraduationCap,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Plus,
  FileText,
  BarChart
} from "lucide-react"

export default function FacultyStudents() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState("all")
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  
  // Faculty data
  const [facultyData, setFacultyData] = useState({
    name: "Dr. Priya Sharma",
    department: "Computer Science",
    courses: ["Data Structures", "Algorithms", "Python Programming"]
  })

  // Departments and courses for filters
  const [departments, setDepartments] = useState([])
  const [courses, setCourses] = useState([])

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
      setCourses(coursesData)
      
      // Fetch students
      const studentsRes = await fetch("/api/faculty/students")
      const studentsData = await studentsRes.json()
      
      // If API returns empty, use sample data
      if (studentsData.length === 0) {
        setStudents(sampleStudents)
        setFilteredStudents(sampleStudents)
      } else {
        setStudents(studentsData)
        setFilteredStudents(studentsData)
      }
      
    } catch (err) {
      console.error("Error fetching data:", err)
      // Use sample data on error
      setStudents(sampleStudents)
      setFilteredStudents(sampleStudents)
      setError("Using sample data - API connection failed")
    } finally {
      setLoading(false)
    }
  }

  // Sample student data
  const sampleStudents = [
    { 
      id: 1, 
      name: "Aryan Yadav", 
      rollNo: "CS2024001", 
      department: "Computer Science", 
      year: "3rd Year",
      semester: "4th Semester",
      email: "aryan@college.edu",
      phone: "+91 98765 43210",
      attendance: 92,
      courses: ["Data Structures", "Algorithms"],
      status: "active",
      avatar: "AY"
    },
    { 
      id: 2, 
      name: "Priya Singh", 
      rollNo: "CS2024002", 
      department: "Computer Science", 
      year: "3rd Year",
      semester: "4th Semester",
      email: "priya@college.edu",
      phone: "+91 98765 43211",
      attendance: 88,
      courses: ["Data Structures", "Algorithms"],
      status: "active",
      avatar: "PS"
    },
    { 
      id: 3, 
      name: "Rahul Verma", 
      rollNo: "CS2024003", 
      department: "Computer Science", 
      year: "3rd Year",
      semester: "4th Semester",
      email: "rahul@college.edu",
      phone: "+91 98765 43212",
      attendance: 95,
      courses: ["Data Structures", "Algorithms"],
      status: "active",
      avatar: "RV"
    },
    { 
      id: 4, 
      name: "Neha Gupta", 
      rollNo: "CS2024004", 
      department: "Computer Science", 
      year: "3rd Year",
      semester: "4th Semester",
      email: "neha@college.edu",
      phone: "+91 98765 43213",
      attendance: 78,
      courses: ["Data Structures", "Algorithms"],
      status: "active",
      avatar: "NG"
    },
    { 
      id: 5, 
      name: "Aditya Kumar", 
      rollNo: "CS2024005", 
      department: "Computer Science", 
      year: "3rd Year",
      semester: "4th Semester",
      email: "aditya@college.edu",
      phone: "+91 98765 43214",
      attendance: 85,
      courses: ["Data Structures", "Algorithms"],
      status: "inactive",
      avatar: "AK"
    },
    { 
      id: 6, 
      name: "Sneha Reddy", 
      rollNo: "CS2024006", 
      department: "Computer Science", 
      year: "3rd Year",
      semester: "4th Semester",
      email: "sneha@college.edu",
      phone: "+91 98765 43215",
      attendance: 91,
      courses: ["Data Structures", "Algorithms"],
      status: "active",
      avatar: "SR"
    },
    { 
      id: 7, 
      name: "Vikram Singh", 
      rollNo: "CS2024007", 
      department: "Computer Science", 
      year: "3rd Year",
      semester: "4th Semester",
      email: "vikram@college.edu",
      phone: "+91 98765 43216",
      attendance: 87,
      courses: ["Data Structures", "Algorithms"],
      status: "active",
      avatar: "VS"
    },
    { 
      id: 8, 
      name: "Pooja Patel", 
      rollNo: "CS2024008", 
      department: "Computer Science", 
      year: "3rd Year",
      semester: "4th Semester",
      email: "pooja@college.edu",
      phone: "+91 98765 43217",
      attendance: 93,
      courses: ["Data Structures", "Algorithms"],
      status: "active",
      avatar: "PP"
    },
    { 
      id: 9, 
      name: "Rohan Desai", 
      rollNo: "CS2024009", 
      department: "Computer Science", 
      year: "3rd Year",
      semester: "4th Semester",
      email: "rohan@college.edu",
      phone: "+91 98765 43218",
      attendance: 82,
      courses: ["Data Structures", "Algorithms"],
      status: "active",
      avatar: "RD"
    },
    { 
      id: 10, 
      name: "Anjali Mehta", 
      rollNo: "CS2024010", 
      department: "Computer Science", 
      year: "3rd Year",
      semester: "4th Semester",
      email: "anjali@college.edu",
      phone: "+91 98765 43219",
      attendance: 96,
      courses: ["Data Structures", "Algorithms"],
      status: "active",
      avatar: "AM"
    }
  ]

  // Filter students based on search and filters
  useEffect(() => {
    let filtered = students
    
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(s => s.department === selectedDepartment)
    }
    
    if (selectedYear !== "all") {
      filtered = filtered.filter(s => s.year === selectedYear)
    }
    
    if (selectedCourse !== "all") {
      filtered = filtered.filter(s => s.courses.includes(selectedCourse))
    }
    
    setFilteredStudents(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedDepartment, selectedYear, selectedCourse, students])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

  // Stats
  const totalStudents = students.length
  const activeStudents = students.filter(s => s.status === "active").length
  const avgAttendance = Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)

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
              My Students
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
                <p className="text-xs text-gray-500">{facultyData.department}</p>
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
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total Students</p>
              <Users size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{totalStudents}</p>
            <p className="text-xs text-blue-600 mt-1">Enrolled in your courses</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Active Students</p>
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{activeStudents}</p>
            <p className="text-xs text-green-600 mt-1">Currently enrolled</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Avg Attendance</p>
              <BarChart size={20} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{avgAttendance}%</p>
            <p className="text-xs text-purple-600 mt-1">Overall average</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Courses</p>
              <BookOpen size={20} className="text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{facultyData.courses.length}</p>
            <p className="text-xs text-orange-600 mt-1">Courses you teach</p>
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
                placeholder="Search by name, roll number or email..."
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
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Years</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Courses</option>
                {facultyData.courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
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

        {/* Students Table */}
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
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {student.avatar || student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{student.name}</p>
                              <p className="text-xs text-gray-500">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-blue-600 font-medium">{student.rollNo}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{student.department}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{student.year}</span>
                          <p className="text-xs text-gray-500">{student.semester}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className={`text-sm font-medium ${
                              student.attendance >= 90 ? 'text-green-600' :
                              student.attendance >= 75 ? 'text-blue-600' :
                              'text-orange-600'
                            }`}>
                              {student.attendance}%
                            </span>
                            <div className="ml-2 w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  student.attendance >= 90 ? 'bg-green-600' :
                                  student.attendance >= 75 ? 'bg-blue-600' :
                                  'bg-orange-600'
                                }`}
                                style={{ width: `${student.attendance}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            student.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {student.status === 'active' ? (
                              <CheckCircle size={12} className="mr-1" />
                            ) : (
                              <XCircle size={12} className="mr-1" />
                            )}
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                              <Eye size={16} className="text-blue-600" />
                            </button>
                            <button className="p-1 hover:bg-purple-50 rounded-lg transition-colors" title="Send Email">
                              <Mail size={16} className="text-purple-600" />
                            </button>
                            <button className="p-1 hover:bg-green-50 rounded-lg transition-colors" title="Call">
                              <Phone size={16} className="text-green-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical size={16} className="text-gray-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredStudents.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredStudents.length}</span> students
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
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex justify-end space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={18} />
                <span>Add Student</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <FileText size={18} />
                <span>Export List</span>
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