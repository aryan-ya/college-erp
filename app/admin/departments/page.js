"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Building2, 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Hash,
  Edit3,
  FolderTree,
  AlertCircle
} from "lucide-react"

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([])
  const [name, setName] = useState("")
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(null)
  
  const itemsPerPage = 8
  const router = useRouter()

  const fetchDepartments = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/departments")
      if (!res.ok) throw new Error("Failed to fetch departments")
      const data = await res.json()
      setDepartments(data)
    } catch (error) {
      console.error("Error fetching departments:", error)
      setError("Failed to load departments. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  const addDepartment = async () => {
    if (!name.trim()) {
      setError("Please enter a department name")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name.trim() })
      })

      if (!res.ok) throw new Error("Failed to add department")

      setName("")
      setShowForm(false)
      await fetchDepartments()
    } catch (error) {
      console.error("Error adding department:", error)
      setError("Failed to add department. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const deleteDepartment = async (id, deptName) => {
    const confirmDelete = confirm(`Are you sure you want to delete "${deptName}" department?`)
    if (!confirmDelete) return

    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/departments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      })

      if (!res.ok) throw new Error("Failed to delete department")

      await fetchDepartments()
    } catch (error) {
      console.error("Error deleting department:", error)
      setError("Failed to delete department. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const updateDepartment = async () => {
    if (!name.trim()) {
      setError("Please enter a department name")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/departments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: editId,
          name: name.trim()
        })
      })

      if (!res.ok) throw new Error("Failed to update department")

      setEditId(null)
      setName("")
      setShowForm(false)
      await fetchDepartments()
    } catch (error) {
      console.error("Error updating department:", error)
      setError("Failed to update department. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDepartments = filteredDepartments.slice(startIndex, startIndex + itemsPerPage)

  const handleEdit = (dept) => {
    setEditId(dept.id)
    setName(dept.name)
    setShowForm(true)
  }

  const cancelEdit = () => {
    setEditId(null)
    setName("")
    setShowForm(false)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="group relative w-10 h-10 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center overflow-hidden"
              >
                <ArrowLeft size={18} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </button>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Departments
                </h1>
                <p className="text-gray-500 mt-1 flex items-center">
                  <FolderTree size={16} className="mr-1" />
                  Manage your organization's departments
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowForm(true)
                setEditId(null)
                setName("")
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus size={18} className="mr-2" />
              New Department
            </button>
          </div>

          {/* Stats Card */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Departments</p>
                  <p className="text-3xl font-bold text-gray-800">{departments.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 size={24} className="text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Active Departments</p>
                  <p className="text-3xl font-bold text-gray-800">{departments.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Latest Update</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date().toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Edit3 size={24} className="text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center">
            <AlertCircle size={20} className="text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-slideUp">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    {editId ? 'Edit Department' : 'Create New Department'}
                  </h2>
                  <button
                    onClick={cancelEdit}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department Name
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Computer Science"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={editId ? updateDepartment : addDepartment}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin mr-2" />
                          {editId ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        editId ? 'Update Department' : 'Create Department'
                      )}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <div className="flex items-center text-sm text-gray-500 bg-white px-4 py-2 rounded-xl shadow-sm">
            <Hash size={16} className="mr-1" />
            {filteredDepartments.length} department{filteredDepartments.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Departments Grid */}
        {loading && departments.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 size={40} className="animate-spin text-blue-600" />
          </div>
        ) : filteredDepartments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Building2 size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Departments Found</h3>
            <p className="text-gray-500 mb-6">
              {search ? 'No departments match your search' : 'Get started by creating your first department'}
            </p>
            {!search && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Create Department
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Table View */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Department Name
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedDepartments.map((dept, index) => (
                    <tr 
                      key={dept.id} 
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="font-mono">#{startIndex + index + 1}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {dept.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {dept.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(dept)}
                            className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
                            title="Edit department"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => deleteDepartment(dept.id, dept.name)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Delete department"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDepartments.length)} of {filteredDepartments.length} departments
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
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

// Missing CheckCircle component
const CheckCircle = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)