"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  GraduationCap,
  Building,
  Calendar,
  Bell,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ChevronRight,
  BookOpen,
  ClipboardList,
  Clock,
  Award,
  UserCircle,
  RefreshCw,
  FileText,
  MessageSquare,
  CheckSquare,
  AlertCircle
} from "lucide-react"

export default function FacultyDashboard() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Faculty data
  const [facultyData, setFacultyData] = useState({
    name: "Dr. rahul Sharma",
    email: "rahul.sharma@college.edu",
    employeeId: "FAC2024001",
    department: "Computer Science",
    designation: "Professor",
    courses: 0,
    students: 0,
    pendingAssignments: 0,
    upcomingClasses: 4,
    researchPapers: 2
  })

  // Departments data
  const [departments, setDepartments] = useState([])
  // Courses data
  const [courses, setCourses] = useState([])
  // Students data
  const [students, setStudents] = useState([])
  // Assignments data
  const [assignments, setAssignments] = useState([])
  // Notices data
  const [notices, setNotices] = useState([])
  // Recent activities
  const [recentActivities, setRecentActivities] = useState([])

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (!role || role !== "faculty") {
      router.replace("/login")
    } else {
      fetchDashboardData()
    }
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Fetch all data in parallel - using correct endpoints
      const [deptsRes, coursesRes, studentsRes, assignmentsRes, noticesRes] = await Promise.all([
        fetch("/api/admin/departments"),
        fetch("/api/faculty/courses"),
        fetch("/api/faculty/students"),
        fetch("/api/faculty/assignments"),
        fetch("/api/admin/notices") // Changed from /api/faculty/notices to /api/admin/notices
      ])

      // Check if any responses are not ok
      if (!deptsRes.ok) throw new Error("Failed to fetch departments")
      if (!coursesRes.ok) throw new Error("Failed to fetch courses")
      if (!studentsRes.ok) throw new Error("Failed to fetch students")
      if (!assignmentsRes.ok) throw new Error("Failed to fetch assignments")
      if (!noticesRes.ok) throw new Error("Failed to fetch notices")

      const departmentsData = await deptsRes.json()
      const coursesData = await coursesRes.json()
      const studentsData = await studentsRes.json()
      const assignmentsData = await assignmentsRes.json()
      const noticesData = await noticesRes.json()
      
      setDepartments(departmentsData)
      setCourses(coursesData)
      setStudents(studentsData)
      setAssignments(assignmentsData)
      setNotices(noticesData)

      // Calculate real stats
      const totalStudents = studentsData.length
      const pendingAssignments = assignmentsData.filter(a => a.status === "pending").length
      
      setFacultyData(prev => ({
        ...prev,
        courses: coursesData.length,
        students: totalStudents,
        pendingAssignments: pendingAssignments
      }))

      // Create recent activities from real data
      const activities = []

      // Add recent assignments (last 2)
      assignmentsData.slice(0, 2).forEach(assignment => {
        activities.push({
          icon: <ClipboardList size={16} />,
          text: `Assignment: ${assignment.title} ${assignment.status === "pending" ? "(Pending)" : ""}`,
          time: new Date(assignment.createdAt || Date.now()).toLocaleDateString(),
          color: "blue"
        })
      })

      // Add recent notices (last 2)
      noticesData.slice(0, 2).forEach(notice => {
        activities.push({
          icon: <Bell size={16} />,
          text: `Notice: ${notice.title}`,
          time: new Date(notice.date || Date.now()).toLocaleDateString(),
          color: "purple"
        })
      })

      // Add student enrollment activity
      if (studentsData.length > 0) {
        activities.push({
          icon: <Users size={16} />,
          text: `${studentsData.length} students enrolled in your courses`,
          time: "Total",
          color: "green"
        })
      }

      // Add courses count
      if (coursesData.length > 0) {
        activities.push({
          icon: <BookOpen size={16} />,
          text: `Teaching ${coursesData.length} courses this semester`,
          time: "Current",
          color: "orange"
        })
      }

      setRecentActivities(activities)

    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("role")
      localStorage.removeItem("user")
      router.replace("/login")
    }
  }

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/faculty/dashboard", active: true },
    { icon: <BookOpen size={20} />, label: "My Courses", path: "/faculty/courses", count: facultyData.courses },
    { icon: <Users size={20} />, label: "Students", path: "/faculty/students", count: facultyData.students },
    { icon: <ClipboardList size={20} />, label: "Assignments", path: "/faculty/assignments", count: facultyData.pendingAssignments },
    { icon: <Bell size={20} />, label: "Notices", path: "/faculty/notices", count: notices.length },
  ]

  const statCards = [
    { 
      title: "Courses Taught", 
      value: facultyData.courses, 
      icon: <BookOpen size={24} />, 
      gradient: "from-blue-600 to-blue-400",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      suffix: "",
      path: "/faculty/courses"
    },
    { 
      title: "Total Students", 
      value: facultyData.students, 
      icon: <Users size={24} />, 
      gradient: "from-purple-600 to-purple-400",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      suffix: "",
      path: "/faculty/students"
    },
    { 
      title: "Pending Assignments", 
      value: facultyData.pendingAssignments, 
      icon: <ClipboardList size={24} />, 
      gradient: "from-blue-600 to-blue-400",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      suffix: "",
      path: "/faculty/assignments"
    },
    { 
      title: "Classes Today", 
      value: facultyData.upcomingClasses, 
      icon: <Clock size={24} />, 
      gradient: "from-purple-600 to-purple-400",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      suffix: "",
      path: "/faculty/schedule"
    },
    { 
      title: "Notices", 
      value: notices.length, 
      icon: <Bell size={24} />, 
      gradient: "from-blue-600 to-blue-400",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      suffix: "",
      path: "/faculty/notices"
    }
  ]

  const quickActions = [
    { icon: <BookOpen size={18} />, label: "Take Attendance", path: "/faculty/attendance", color: "blue" },
    { icon: <ClipboardList size={18} />, label: "Post Assignment", path: "/faculty/assignments/add", color: "purple" },
    { icon: <Users size={18} />, label: "View Students", path: "/faculty/students", color: "blue" },
    { icon: <MessageSquare size={18} />, label: "Announcement", path: "/faculty/announcements/add", color: "purple" },
    { icon: <CheckSquare size={18} />, label: "Grade Submissions", path: "/faculty/grades", color: "blue" },
  ]

  // Sample schedule data (can be replaced with real API)
  const todaySchedule = [
    { time: "09:00 - 10:30", course: "Data Structures", class: "CS 3rd Sem", room: "Room 401" },
    { time: "11:00 - 12:30", course: "Algorithms", class: "CS 5th Sem", room: "Room 402" },
    { time: "14:00 - 15:30", course: "Python Programming", class: "CS 3rd Sem", room: "Lab 203" },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}>
        
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-100">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-gray-800">
                CollegeERP
              </span>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
          )}
          
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b border-gray-100">
          {sidebarOpen ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                {facultyData.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{facultyData.name}</p>
                <p className="text-xs text-gray-500 truncate">{facultyData.employeeId}</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              {facultyData.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Sidebar Menu */}
        <div className="px-3 py-6 h-[calc(100vh-13rem)] overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} px-4 py-3 rounded-xl transition-all duration-200 ${
                    item.active 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={item.active ? 'text-white' : ''}>{item.icon}</span>
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                  </div>
                  {sidebarOpen && item.count !== undefined && item.count > 0 && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      item.active 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group"
          >
            <LogOut size={18} className="group-hover:rotate-180 transition-transform duration-300" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-auto">
        
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu size={20} className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">
                Welcome back, {facultyData.name.split(' ')[0]}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={fetchDashboardData}
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

          {/* Quick Actions Bar */}
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center space-x-2 overflow-x-auto">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => router.push(action.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg bg-${action.color}-50 text-${action.color}-600 hover:bg-${action.color}-100 transition-colors whitespace-nowrap`}
                >
                  {action.icon}
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 text-red-700 p-4 rounded-lg flex items-center border-l-4 border-red-600">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Welcome Banner with Faculty Info */}
              <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-1">Faculty Dashboard</h2>
                <p className="text-blue-100 text-sm">{facultyData.designation} • {facultyData.department}</p>
              </div>

              {/* Stats Cards Grid - With real data */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-6">
                {statCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-5 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-lg border border-gray-100"
                    onClick={() => router.push(card.path)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center ${card.iconColor}`}>
                        {card.icon}
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-1">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {card.value}{card.suffix}
                    </p>
                    
                    <div className="mt-3 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full w-2/3 bg-gradient-to-r ${card.gradient} rounded-full`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                
                {/* Faculty Information Card */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <UserCircle size={20} className="mr-2 text-blue-600" />
                    Faculty Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Full Name</span>
                      <span className="text-sm font-semibold text-gray-800">{facultyData.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Employee ID</span>
                      <span className="text-sm font-semibold text-blue-600">{facultyData.employeeId}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Department</span>
                      <span className="text-sm font-semibold text-purple-600">{facultyData.department}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Designation</span>
                      <span className="text-sm font-semibold text-green-600">{facultyData.designation}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Email</span>
                      <span className="text-sm font-semibold text-orange-600">{facultyData.email}</span>
                    </div>
                  </div>
                </div>

                {/* Today's Schedule Card */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Clock size={20} className="mr-2 text-purple-600" />
                    Today's Schedule
                  </h2>
                  
                  <div className="space-y-3">
                    {todaySchedule.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-blue-600">{item.time}</span>
                          <span className="text-xs text-gray-400">{item.room}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-800">{item.course}</p>
                        <p className="text-xs text-gray-500">{item.class}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Courses and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* My Courses Card - With real courses data */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <BookOpen size={20} className="mr-2 text-blue-600" />
                    My Courses
                  </h2>
                  
                  <div className="space-y-3">
                    {courses.length > 0 ? (
                      courses.slice(0, 3).map((course, index) => (
                        <div key={course.id} className={`flex items-center justify-between p-3 ${
                          index % 2 === 0 ? 'bg-blue-50' : 'bg-purple-50'
                        } rounded-lg hover:bg-gray-100 transition-colors cursor-pointer`}
                        onClick={() => router.push(`/faculty/courses/${course.id}`)}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 ${
                              index % 2 === 0 ? 'bg-blue-100' : 'bg-purple-100'
                            } rounded-lg flex items-center justify-center`}>
                              <BookOpen size={14} className={
                                index % 2 === 0 ? 'text-blue-600' : 'text-purple-600'
                              } />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">{course.name}</p>
                              <p className="text-xs text-gray-500">{course.code} • {course.students || 0} students</p>
                            </div>
                          </div>
                          <span className={`text-xs ${
                            index % 2 === 0 ? 'bg-blue-200 text-blue-700' : 'bg-purple-200 text-purple-700'
                          } px-2 py-1 rounded-full`}>
                            {course.schedule || "Mon, Wed"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No courses assigned</p>
                    )}
                    
                    {courses.length > 3 && (
                      <button 
                        onClick={() => router.push("/faculty/courses")}
                        className="text-xs text-blue-600 hover:text-blue-800 mt-2 block text-center"
                      >
                        View all {courses.length} courses
                      </button>
                    )}
                  </div>
                </div>

                {/* Recent Activity Section - With real activities */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                  
                  <div className="space-y-3">
                    {recentActivities.length > 0 ? (
                      recentActivities.slice(0, 5).map((activity, index) => (
                        <div key={index} className={`flex items-center space-x-3 p-3 bg-${activity.color}-50 rounded-lg hover:bg-${activity.color}-100 transition-colors`}>
                          <div className={`w-8 h-8 bg-${activity.color}-100 rounded-lg flex items-center justify-center text-${activity.color}-600`}>
                            {activity.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">{activity.text}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No recent activities</p>
                    )}
                  </div>
                </div>
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

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}