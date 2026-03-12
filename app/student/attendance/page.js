"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Award,
  BookOpen,
  Percent,
  Filter,
  Download,
  ChevronRight,
  GraduationCap,
  BarChart3
} from "lucide-react"

export default function StudentAttendance() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState("March")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [viewType, setViewType] = useState("overall") // overall, subject-wise

  // Mock data
  const stats = {
    overall: 92,
    totalClasses: 45,
    present: 42,
    absent: 3,
    leave: 0,
    required: 75
  }

  const subjects = [
    { name: "Mathematics", code: "MATH101", present: 38, total: 40, percentage: 95, faculty: "Dr. Sharma", status: "good" },
    { name: "Physics", code: "PHY101", present: 35, total: 40, percentage: 88, faculty: "Prof. Verma", status: "average" },
    { name: "Computer Science", code: "CS101", present: 37, total: 40, percentage: 92, faculty: "Dr. Gupta", status: "good" },
    { name: "English", code: "ENG101", present: 34, total: 40, percentage: 85, faculty: "Dr. Singh", status: "average" },
    { name: "Chemistry", code: "CHEM101", present: 31, total: 40, percentage: 78, faculty: "Prof. Patel", status: "warning" },
  ]

  const recentAttendance = [
    { date: "Mar 10, 2024", subject: "Mathematics", status: "present", time: "10:00 AM" },
    { date: "Mar 10, 2024", subject: "Physics", status: "present", time: "11:00 AM" },
    { date: "Mar 11, 2024", subject: "Computer Science", status: "absent", time: "09:00 AM" },
    { date: "Mar 11, 2024", subject: "English", status: "present", time: "10:00 AM" },
    { date: "Mar 12, 2024", subject: "Mathematics", status: "present", time: "10:00 AM" },
  ]

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const years = ["2023", "2024", "2025"]

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading attendance...</p>
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
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Attendance</h1>
            <p className="text-xs md:text-sm text-gray-500">Track your class attendance</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-600">
            <p className="text-xs text-gray-500 mb-1">Overall</p>
            <p className="text-xl font-bold text-gray-800">{stats.overall}%</p>
            <p className="text-xs text-green-600 mt-1">↑ 2%</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
            <p className="text-xs text-gray-500 mb-1">Present</p>
            <p className="text-xl font-bold text-green-600">{stats.present}</p>
            <p className="text-xs text-gray-400 mt-1">classes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500">
            <p className="text-xs text-gray-500 mb-1">Absent</p>
            <p className="text-xl font-bold text-red-600">{stats.absent}</p>
            <p className="text-xs text-gray-400 mt-1">classes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500">
            <p className="text-xs text-gray-500 mb-1">Required</p>
            <p className="text-xl font-bold text-yellow-600">{stats.required}%</p>
            <p className="text-xs text-green-600 mt-1">Above</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
            <p className="text-xs text-gray-500 mb-1">Total</p>
            <p className="text-xl font-bold text-purple-600">{stats.totalClasses}</p>
            <p className="text-xs text-gray-400 mt-1">classes</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-400" />
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="text-sm border-none bg-transparent focus:ring-0 text-gray-600"
              >
                {months.map(month => (
                  <option key={month}>{month}</option>
                ))}
              </select>
            </div>

            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="text-sm border-none bg-transparent focus:ring-0 text-gray-600"
            >
              {years.map(year => (
                <option key={year}>{year}</option>
              ))}
            </select>

            <div className="flex-1"></div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewType("overall")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  viewType === "overall" 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <BarChart3 size={14} className="inline mr-1" />
                Overall
              </button>
              <button
                onClick={() => setViewType("subject-wise")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  viewType === "subject-wise" 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <BookOpen size={14} className="inline mr-1" />
                Subject Wise
              </button>
            </div>

            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Download size={14} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Subject Wise View */}
        {viewType === "subject-wise" && (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Subject-wise Attendance</h2>
            
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-800">{subject.name}</h3>
                      <p className="text-xs text-gray-500">{subject.code} • {subject.faculty}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-800">{subject.percentage}%</span>
                      <p className="text-xs text-gray-400">{subject.present}/{subject.total} classes</p>
                    </div>
                  </div>
                  
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            subject.percentage >= 90 ? 'bg-green-500' :
                            subject.percentage >= 75 ? 'bg-blue-500' :
                            subject.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${subject.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overall View */}
        {viewType === "overall" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Chart Card */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Attendance Overview</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Present</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-green-600">{stats.present}</span>
                    <span className="text-xs text-gray-400 ml-1">classes</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <XCircle size={16} className="text-red-600 mr-3" />
                    <span className="text-sm text-gray-700">Absent</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-red-600">{stats.absent}</span>
                    <span className="text-xs text-gray-400 ml-1">classes</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock size={16} className="text-yellow-600 mr-3" />
                    <span className="text-sm text-gray-700">Leave</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-yellow-600">{stats.leave}</span>
                    <span className="text-xs text-gray-400 ml-1">classes</span>
                  </div>
                </div>
              </div>

              {/* Progress Circle */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full border-4 border-green-500 border-t-transparent animate-spin-slow mx-auto"></div>
                    <p className="text-xs text-gray-600 mt-2">Present 92%</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full border-4 border-red-500 border-t-transparent animate-spin-slow mx-auto"></div>
                    <p className="text-xs text-gray-600 mt-2">Absent 8%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Attendance */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent</h2>
              
              <div className="space-y-3">
                {recentAttendance.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs font-medium text-gray-800">{item.subject}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-xs text-blue-600 hover:text-blue-700 flex items-center justify-center">
                View All
                <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-sm p-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Attendance Summary</h3>
            <GraduationCap size={18} />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-blue-100 text-xs">This Week</p>
              <p className="text-lg font-bold">95%</p>
              <p className="text-blue-200 text-xs">↑ 2%</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">This Month</p>
              <p className="text-lg font-bold">92%</p>
              <p className="text-blue-200 text-xs">↑ 1%</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">Required</p>
              <p className="text-lg font-bold">75%</p>
              <p className="text-green-200 text-xs">Above</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">Status</p>
              <p className="text-lg font-bold">Good</p>
              <p className="text-blue-200 text-xs">Keep it up</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          * Attendance updates daily. Contact faculty for discrepancies.
        </p>
      </div>
    </div>
  )
}