"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Bell,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ChevronRight,
  BookOpen,
  ClipboardList,
  CalendarCheck,
  Clock,
  UserCircle,
  RefreshCw,
  MapPin,
  FileText,
  AlertCircle,
  Users,
  GraduationCap,
  Building,
  Award
} from "lucide-react"

export default function StudentDashboard() {

const router = useRouter()

const [sidebarOpen,setSidebarOpen] = useState(true)
const [loading,setLoading] = useState(true)
const [error,setError] = useState(null)

const [events,setEvents] = useState([])
const [notices,setNotices] = useState([])
const [departments,setDepartments] = useState([])

const [courses,setCourses] = useState([])
const [assignments,setAssignments] = useState([])

const [recentActivities,setRecentActivities] = useState([])

const [studentData,setStudentData] = useState({
name:"Aryan Yadav",
email:"aryan@college.edu",
rollNo:"CS2024001",
semester:"4th Semester",
department:"Computer Science",
attendance:92,
courses:0,
pendingAssignments:0,
upcomingEvents:0
})

/* ---------------- STATIC DATA ---------------- */

const staticCourses = [
{ id:1,name:"Mathematics",faculty:"Dr Sharma" },
{ id:2,name:"Physics",faculty:"Prof Verma" },
{ id:3,name:"Computer Science",faculty:"Dr Gupta" }
]

const staticAssignments = [
{ id:1,title:"Math Assignment",status:"pending",createdAt:new Date() },
{ id:2,title:"Physics Lab Report",status:"pending",createdAt:new Date() }
]

/* ---------------- AUTH ---------------- */

useEffect(()=>{

const role = localStorage.getItem("role")

if(!role || role !== "student"){
router.replace("/login")
}else{
fetchDashboardData()
}

},[])

/* ---------------- FETCH DATA ---------------- */

const fetchDashboardData = async()=>{

setLoading(true)
setError(null)

try{

const [deptsRes,eventsRes,noticesRes] = await Promise.all([
fetch("/api/admin/departments"),
fetch("/api/admin/events"),
fetch("/api/admin/notices")
])

const departments = await deptsRes.json()
const events = await eventsRes.json()
const notices = await noticesRes.json()

const courses = staticCourses
const assignments = staticAssignments

setDepartments(departments)
setEvents(events)
setNotices(notices)
setCourses(courses)
setAssignments(assignments)

setStudentData(prev=>({
...prev,
courses:courses.length,
pendingAssignments:assignments.filter(a=>a.status==="pending").length,
upcomingEvents:events.filter(e=>new Date(e.date) > new Date()).length
}))

/* activities */

const activities = []

events.slice(0,2).forEach(event=>{
activities.push({
icon:<Calendar size={16}/>,
text:`New event: ${event.title}`,
time:"recent",
color:"blue"
})
})

notices.slice(0,2).forEach(notice=>{
activities.push({
icon:<Bell size={16}/>,
text:`Notice: ${notice.title}`,
time:"recent",
color:"purple"
})
})

assignments.slice(0,2).forEach(a=>{
activities.push({
icon:<ClipboardList size={16}/>,
text:`Assignment: ${a.title}`,
time:"recent",
color:"green"
})
})

setRecentActivities(activities)

}catch(err){

console.error(err)
setError("Failed to load dashboard")

}finally{

setLoading(false)

}

}

/* ---------------- LOGOUT ---------------- */

const handleLogout = ()=>{

localStorage.removeItem("role")
localStorage.removeItem("user")
router.replace("/login")

}

/* ---------------- COLORS ---------------- */

const actionColors = {
blue:"bg-blue-50 text-blue-600 hover:bg-blue-100",
purple:"bg-purple-50 text-purple-600 hover:bg-purple-100",
green:"bg-green-50 text-green-600 hover:bg-green-100",
orange:"bg-orange-50 text-orange-600 hover:bg-orange-100",
red:"bg-red-50 text-red-600 hover:bg-red-100"
}

/* ---------------- MENU ---------------- */

const menuItems = [

{icon:<LayoutDashboard size={20}/>,label:"Dashboard",path:"/student/dashboard",active:true},

{icon:<BookOpen size={20}/>,label:"Courses",path:"/student/courses",count:studentData.courses},

{icon:<ClipboardList size={20}/>,label:"Assignments",path:"/student/assignments",count:studentData.pendingAssignments},

{icon:<CalendarCheck size={20}/>,label:"Attendance",path:"/student/attendance",value:`${studentData.attendance}%`},

{icon:<Calendar size={20}/>,label:"Events",path:"/student/events",count:studentData.upcomingEvents},

{icon:<Bell size={20}/>,label:"Notices",path:"/student/notices",count:notices.length}

]

/* ---------------- UI ---------------- */

return(

<div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">

{/* SIDEBAR */}

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
          {studentData.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{studentData.name}</p>
          <p className="text-xs text-gray-500 truncate">{studentData.rollNo}</p>
        </div>
      </div>
    ) : (
      <div className="w-10 h-10 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
        {studentData.name.charAt(0)}
      </div>
    )}
  </div>

  {/* Menu Items */}
  <div className="px-3 py-6 h-[calc(100vh-13rem)] overflow-y-auto">
    <ul className="space-y-2">
      {menuItems.map((item,i)=>(
        <li key={i}>
          <button
            onClick={()=>router.push(item.path)}
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
            {sidebarOpen && item.count > 0 && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                item.active 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {item.count}
              </span>
            )}
            {sidebarOpen && item.value && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                item.active 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {item.value}
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

{/* MAIN */}

<div className="flex-1 overflow-x-auto">

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
        Welcome back, {studentData.name.split(' ')[0]}
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
          {studentData.name.charAt(0)}
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-700">{studentData.name}</p>
          <p className="text-xs text-gray-500">{studentData.rollNo}</p>
        </div>
      </div>
    </div>
  </div>

  {/* Quick Info Bar */}
  <div className="px-6 py-2 border-t border-gray-100 bg-gray-50/50">
    <div className="flex items-center space-x-4 text-sm">
      <span className="flex items-center text-gray-600">
        <GraduationCap size={16} className="mr-1 text-blue-600" />
        {studentData.department}
      </span>
      <span className="flex items-center text-gray-600">
        <Clock size={16} className="mr-1 text-purple-600" />
        {studentData.semester}
      </span>
    </div>
  </div>
</header>

<main className="p-6">

{/* ERROR */}

{error &&(
  <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 flex items-center border-l-4 border-red-600">
    <AlertCircle size={18} className="mr-2 flex-shrink-0" />
    <span>{error}</span>
  </div>
)}

{/* LOADING */}

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
      <h2 className="text-2xl font-bold mb-1">Student Dashboard</h2>
      <p className="text-blue-100 text-sm">Track your academic progress and stay updated</p>
    </div>

    {/* STATS CARDS - IMPROVED */}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      
      <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Courses</p>
          <BookOpen size={20} className="text-blue-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800">{studentData.courses}</p>
        <p className="text-xs text-blue-600 mt-1">Enrolled courses</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Assignments</p>
          <ClipboardList size={20} className="text-purple-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800">{studentData.pendingAssignments}</p>
        <p className="text-xs text-purple-600 mt-1">Pending submissions</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Attendance</p>
          <CalendarCheck size={20} className="text-green-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800">{studentData.attendance}%</p>
        <p className="text-xs text-green-600 mt-1">Overall attendance</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Events</p>
          <Calendar size={20} className="text-orange-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800">{studentData.upcomingEvents}</p>
        <p className="text-xs text-orange-600 mt-1">Upcoming events</p>
      </div>

    </div>

    {/* TWO COLUMN LAYOUT */}

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* Student Information Card - 2 columns wide */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <UserCircle size={20} className="mr-2 text-blue-600" />
          Student Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Full Name</p>
            <p className="text-sm font-semibold text-gray-800">{studentData.name}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Roll Number</p>
            <p className="text-sm font-semibold text-blue-600">{studentData.rollNo}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Department</p>
            <p className="text-sm font-semibold text-purple-600">{studentData.department}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Semester</p>
            <p className="text-sm font-semibold text-green-600">{studentData.semester}</p>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-sm font-semibold text-orange-600">{studentData.email}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Card - 1 column */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Award size={20} className="mr-2 text-purple-600" />
          Quick Stats
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-gray-700">CGPA</span>
            <span className="text-sm font-bold text-blue-600">8.7</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <span className="text-sm text-gray-700">Total Courses</span>
            <span className="text-sm font-bold text-purple-600">{studentData.courses}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-sm text-gray-700">Completed Assignments</span>
            <span className="text-sm font-bold text-green-600">5</span>
          </div>
        </div>
      </div>

    </div>

    {/* BOTTOM GRID */}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* RECENT ACTIVITIES */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Clock size={18} className="mr-2 text-blue-600" />
          Recent Activity
        </h2>

        <div className="space-y-3">
          {recentActivities.length > 0 ? (
            recentActivities.map((a,i)=>(
              <div key={i} className={`flex items-center space-x-3 p-3 bg-${a.color}-50 rounded-lg hover:bg-${a.color}-100 transition-colors`}>
                <div className={`w-8 h-8 bg-${a.color}-100 rounded-lg flex items-center justify-center text-${a.color}-600`}>
                  {a.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{a.text}</p>
                  <p className="text-xs text-gray-500">{a.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No recent activities</p>
          )}
        </div>
      </div>

      {/* UPCOMING EVENTS */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar size={18} className="mr-2 text-purple-600" />
          Upcoming Events
        </h2>

        {events.length > 0 ? (
          <div className="space-y-3">
            {events.slice(0,3).map(e=>(
              <div key={e.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                    <Calendar size={14} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{e.title}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(e.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
        )}
      </div>

      {/* NOTICES */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 lg:col-span-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bell size={18} className="mr-2 text-green-600" />
          Recent Notices
        </h2>

        {notices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notices.slice(0,4).map(n=>(
              <div key={n.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    <Bell size={14} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{n.title}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(n.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No notices available</p>
        )}
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