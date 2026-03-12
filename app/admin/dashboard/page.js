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
  UserPlus,
  Download,
  RefreshCw
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    departments: 0,
    events: 0,
    notices: 0
  })

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (!role || role !== "admin") {
      router.replace("/login")
    } else {
      fetchDashboardData()
    }
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const [studentsRes, facultyRes, deptsRes, eventsRes, noticesRes] = await Promise.all([
        fetch("/api/admin/students"),
        fetch("/api/admin/faculty"),
        fetch("/api/admin/departments"),
        fetch("/api/admin/events"),
        fetch("/api/admin/notices")
      ])

      const students = await studentsRes.json()
      const faculty = await facultyRes.json()
      const departments = await deptsRes.json()
      const events = await eventsRes.json()
      const notices = await noticesRes.json()

      setStats({
        students: students.length,
        faculty: faculty.length,
        departments: departments.length,
        events: events.length,
        notices: notices.length
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
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
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin/dashboard", active: true },
    { icon: <Building size={20} />, label: "Departments", path: "/admin/departments", count: stats.departments },
    { icon: <Users size={20} />, label: "Students", path: "/admin/students", count: stats.students },
    { icon: <GraduationCap size={20} />, label: "Faculty", path: "/admin/faculty", count: stats.faculty },
    { icon: <Calendar size={20} />, label: "Events", path: "/admin/events", count: stats.events },
    { icon: <Bell size={20} />, label: "Notices", path: "/admin/notices", count: stats.notices },
  ]

  const statCards = [
    { 
      title: "Total Students", 
      value: stats.students, 
      icon: <Users size={24} />, 
      gradient: "from-blue-600 to-blue-400",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      path: "/admin/students"
    },
    { 
      title: "Faculty Members", 
      value: stats.faculty, 
      icon: <GraduationCap size={24} />, 
      gradient: "from-purple-600 to-purple-400",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      path: "/admin/faculty"
    },
    { 
      title: "Departments", 
      value: stats.departments, 
      icon: <Building size={24} />, 
      gradient: "from-blue-600 to-blue-400",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      path: "/admin/departments"
    },
    { 
      title: "Events", 
      value: stats.events, 
      icon: <Calendar size={24} />, 
      gradient: "from-purple-600 to-purple-400",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      path: "/admin/events"
    },
    { 
      title: "Notices", 
      value: stats.notices, 
      icon: <Bell size={24} />, 
      gradient: "from-blue-600 to-blue-400",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      path: "/admin/notices"
    }
  ]

  const quickActions = [
    { icon: <UserPlus size={18} />, label: "Add Student", path: "/admin/students/add", color: "blue" },
    { icon: <GraduationCap size={18} />, label: "Add Faculty", path: "/admin/faculty", color: "purple" },
    { icon: <Calendar size={18} />, label: "Create Event", path: "/admin/events", color: "blue" },
    { icon: <Bell size={18} />, label: "Post Notice", path: "/admin/notices", color: "purple" },
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

        {/* Sidebar Menu */}
        <div className="px-3 py-6 h-[calc(100vh-5rem)] overflow-y-auto">
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
                  {sidebarOpen && item.count !== undefined && (
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
                Welcome back, Admin
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
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">admin@college.edu</p>
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
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors whitespace-nowrap">
                <Download size={18} />
                <span className="text-sm font-medium">Export Report</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          
          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Welcome Banner */}
              <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-1">Admin Dashboard</h2>
                <p className="text-blue-100 text-sm">Manage your college ERP system efficiently</p>
              </div>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-6">
                {statCards.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(card.path)}
                    className="bg-white rounded-xl shadow-md p-5 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-lg border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center ${card.iconColor}`}>
                        {card.icon}
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-1">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                    
                    <div className="mt-3 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full w-2/3 bg-gradient-to-r ${card.gradient} rounded-full`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity Section */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <Users size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">New student registered</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                      <Building size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Department created</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">New event added</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                      <Bell size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Notice published</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
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