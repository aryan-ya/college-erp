"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft,
  BookOpen,
  Clock,
  Calendar,
  User,
  Star,
  Award,
  TrendingUp,
  FileText,
  Video,
  Download,
  BookMarked,
  GraduationCap,
  ChevronRight,
  Search,
  Filter,
  Grid,
  List,
  Loader2,
  CheckCircle,
  AlertCircle,
  Users,
  BarChart3
} from "lucide-react"

export default function StudentCourses() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [search, setSearch] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("all")

  // Mock data
  const studentInfo = {
    name: "Aryan Yadav",
    semester: "4th Semester",
    department: "Computer Science",
    cgpa: 8.7,
    totalCredits: 22
  }

  const courses = [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      faculty: "Dr. Sharma",
      facultyInitial: "DS",
      schedule: "Mon, Wed, Fri • 10:00 AM",
      room: "Room 101",
      credits: 4,
      progress: 75,
      attendance: 95,
      assignments: 3,
      materials: 12,
      status: "ongoing",
      color: "blue",
      description: "Learn fundamentals of programming using Python",
      syllabus: ["Basics of Programming", "Control Structures", "Functions", "Data Structures"],
      nextClass: "Tomorrow • 10:00 AM"
    },
    {
      id: 2,
      code: "CS201",
      name: "Data Structures",
      faculty: "Prof. Gupta",
      facultyInitial: "PG",
      schedule: "Tue, Thu • 11:00 AM",
      room: "Room 203",
      credits: 4,
      progress: 60,
      attendance: 88,
      assignments: 2,
      materials: 8,
      status: "ongoing",
      color: "purple",
      description: "Study of data structures and algorithms",
      syllabus: ["Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Graphs"],
      nextClass: "Tomorrow • 11:00 AM"
    },
    {
      id: 3,
      code: "CS301",
      name: "Database Management",
      faculty: "Dr. Verma",
      facultyInitial: "AV",
      schedule: "Wed, Fri • 2:00 PM",
      room: "Room 105",
      credits: 3,
      progress: 45,
      attendance: 92,
      assignments: 1,
      materials: 6,
      status: "ongoing",
      color: "green",
      description: "Learn database design and SQL",
      syllabus: ["ER Modeling", "SQL", "Normalization", "Transactions"],
      nextClass: "Wednesday • 2:00 PM"
    },
    {
      id: 4,
      code: "CS401",
      name: "Web Development",
      faculty: "Prof. Singh",
      facultyInitial: "AS",
      schedule: "Mon, Thu • 3:00 PM",
      room: "Lab 301",
      credits: 4,
      progress: 30,
      attendance: 85,
      assignments: 2,
      materials: 10,
      status: "ongoing",
      color: "orange",
      description: "Modern web development with React",
      syllabus: ["HTML/CSS", "JavaScript", "React", "Node.js"],
      nextClass: "Monday • 3:00 PM"
    },
    {
      id: 5,
      code: "CS501",
      name: "Machine Learning",
      faculty: "Dr. Patel",
      facultyInitial: "RP",
      schedule: "Tue, Fri • 9:00 AM",
      room: "Room 401",
      credits: 4,
      progress: 15,
      attendance: 78,
      assignments: 1,
      materials: 5,
      status: "ongoing",
      color: "red",
      description: "Introduction to machine learning concepts",
      syllabus: ["Python for ML", "Regression", "Classification", "Neural Networks"],
      nextClass: "Tuesday • 9:00 AM"
    },
    {
      id: 6,
      code: "CS102",
      name: "Discrete Mathematics",
      faculty: "Dr. Sharma",
      facultyInitial: "DS",
      schedule: "Mon, Wed • 1:00 PM",
      room: "Room 102",
      credits: 3,
      progress: 100,
      attendance: 98,
      assignments: 5,
      materials: 8,
      status: "completed",
      color: "gray",
      description: "Mathematical foundations for computer science",
      syllabus: ["Sets", "Logic", "Graph Theory", "Combinatorics"],
      nextClass: "Completed"
    }
  ]

  const semesters = ["all", "1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester"]

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase()) ||
                         course.code.toLowerCase().includes(search.toLowerCase()) ||
                         course.faculty.toLowerCase().includes(search.toLowerCase())
    return matchesSearch
  })

  const ongoingCourses = filteredCourses.filter(c => c.status === "ongoing")
  const completedCourses = filteredCourses.filter(c => c.status === "completed")

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      green: "bg-green-50 text-green-600 border-green-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      red: "bg-red-50 text-red-600 border-red-200",
      gray: "bg-gray-50 text-gray-600 border-gray-200"
    }
    return colors[color] || colors.blue
  }

  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading courses...</p>
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
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">My Courses</h1>
            <p className="text-xs md:text-sm text-gray-500">Track your enrolled courses</p>
          </div>
        </div>

        {/* Student Info Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-sm p-5 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/90">{studentInfo.name}</p>
                <p className="text-xs text-white/70">{studentInfo.department} • {studentInfo.semester}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">{studentInfo.cgpa} CGPA</p>
              <p className="text-xs text-white/70">{studentInfo.totalCredits} Credits</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20">
            <div className="text-center">
              <p className="text-xs text-white/70">Total Courses</p>
              <p className="text-lg font-bold">{courses.length}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/70">Ongoing</p>
              <p className="text-lg font-bold">{ongoingCourses.length}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/70">Completed</p>
              <p className="text-lg font-bold">{completedCourses.length}</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem === "all" ? "All Semesters" : sem}</option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Ongoing Courses Section */}
        {ongoingCourses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
              <BookOpen size={16} className="mr-2 text-blue-600" />
              Ongoing Courses
            </h2>

            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ongoingCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    {/* Color Bar */}
                    <div className={`h-2 bg-${course.color}-500`}></div>
                    
                    <div className="p-5">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getColorClasses(course.color)}`}>
                            {course.code}
                          </span>
                          <h3 className="font-semibold text-gray-800 mt-2">{course.name}</h3>
                        </div>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm bg-${course.color}-500`}>
                          {course.facultyInitial}
                        </div>
                      </div>

                      {/* Faculty */}
                      <p className="text-xs text-gray-500 flex items-center mb-3">
                        <User size={12} className="mr-1" />
                        {course.faculty}
                      </p>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium text-gray-700">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`bg-${course.color}-500 h-1.5 rounded-full`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <Clock size={12} className="text-gray-400 mb-1" />
                          <p className="text-xs text-gray-600">{course.schedule.split('•')[1]}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <Calendar size={12} className="text-gray-400 mb-1" />
                          <p className="text-xs text-gray-600">{course.room}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <Award size={12} className="text-gray-400 mb-1" />
                          <p className="text-xs text-gray-600">{course.credits} Credits</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <TrendingUp size={12} className="text-gray-400 mb-1" />
                          <p className="text-xs text-gray-600">{course.attendance}% Att.</p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                            {course.assignments} Assignments
                          </span>
                          <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                            {course.materials} Materials
                          </span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {ongoingCourses.map((course, index) => (
                  <div key={course.id} className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${index !== ongoingCourses.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className={`w-1 h-12 rounded-full bg-${course.color}-500 mr-4`}></div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">{course.code}</p>
                        <p className="font-medium text-gray-800">{course.name}</p>
                        <p className="text-xs text-gray-500">{course.faculty}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500">Schedule</p>
                        <p className="text-sm text-gray-700">{course.schedule}</p>
                        <p className="text-xs text-gray-500">{course.room}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500">Progress</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div className={`bg-${course.color}-500 h-1.5 rounded-full`} style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <span className="text-xs font-medium">{course.progress}%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Next: {course.nextClass}</p>
                      </div>
                      
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                          <FileText size={14} />
                        </button>
                        <button className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                          <Video size={14} />
                        </button>
                        <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Completed Courses Section */}
        {completedCourses.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
              <CheckCircle size={16} className="mr-2 text-green-600" />
              Completed Courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm opacity-75">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {course.code}
                        </span>
                        <h3 className="font-semibold text-gray-800 mt-2">{course.name}</h3>
                      </div>
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold text-sm">
                        {course.facultyInitial}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award size={14} className="text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">Completed</span>
                      </div>
                      <span className="text-xs text-gray-400">Grade: A</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-sm font-medium text-gray-700 mb-1">No Courses Found</h3>
            <p className="text-xs text-gray-400">No courses match your search criteria</p>
          </div>
        )}

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          * Course materials and assignments updated regularly
        </p>
      </div>
    </div>
  )
}