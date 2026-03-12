"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Loader2,
  ChevronRight,
  Star,
  Ticket,
  Award,
  BookOpen,
  GraduationCap,
  Bell,
  Share2,
  Bookmark,
  Sparkles,
  TrendingUp,
  UserCheck,
  AlertCircle
} from "lucide-react"

export default function StudentEvents() {
  const router = useRouter()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [showDetails, setShowDetails] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [studentId, setStudentId] = useState("student-1") // Get from localStorage

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Events", icon: <Calendar size={14} /> },
    { id: "technical", name: "Technical", icon: <BookOpen size={14} /> },
    { id: "cultural", name: "Cultural", icon: <Star size={14} /> },
    { id: "academic", name: "Academic", icon: <GraduationCap size={14} /> },
    { id: "sports", name: "Sports", icon: <Award size={14} /> },
    { id: "workshop", name: "Workshops", icon: <Users size={14} /> }
  ]

  // Fetch events from API
  const fetchEvents = async () => {
    setLoading(true)
    setError(null)
    try {
      // Get all events
      const res = await fetch("/api/admin/events")
      if (!res.ok) {
        throw new Error('Failed to fetch events')
      }
      const data = await res.json()
      
      // Get student's registrations
      const regRes = await fetch(`/api/student/events/registrations?studentId=${studentId}`)
      const registrations = regRes.ok ? await regRes.json() : []
      
      // Mark which events student is registered for
      const eventsWithStatus = data.map(event => ({
        ...event,
        isRegistered: registrations.some(reg => reg.eventId === event.id),
        registered: event._count?.registrations || 0,
        registeredCount: event._count?.registrations || 0,
        status: new Date(event.date) > new Date() ? "upcoming" : "completed",
        image: getEventImage(event.category),
        color: getEventColor(event.category),
        tags: getEventTags(event.category)
      }))
      
      setEvents(eventsWithStatus)
    } catch (error) {
      console.error("Error fetching events:", error)
      setError('Failed to load events. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  // Helper functions for event styling
  const getEventImage = (category) => {
    const images = {
      technical: "💻",
      cultural: "🎭",
      academic: "📚",
      sports: "🏆",
      workshop: "⚙️",
      default: "🎉"
    }
    return images[category] || images.default
  }

  const getEventColor = (category) => {
    const colors = {
      technical: "blue",
      cultural: "pink",
      academic: "purple",
      sports: "orange",
      workshop: "green",
      default: "blue"
    }
    return colors[category] || colors.default
  }

  const getEventTags = (category) => {
    const tags = {
      technical: ["coding", "tech", "innovation"],
      cultural: ["music", "dance", "fun"],
      academic: ["lecture", "seminar", "learning"],
      sports: ["sports", "competition", "fitness"],
      workshop: ["workshop", "hands-on", "training"]
    }
    return tags[category] || ["event"]
  }

  // Handle event registration
  const handleRegister = async (eventId) => {
    setRegisterLoading(true)
    setError(null)
    
    try {
      const res = await fetch("/api/student/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eventId,
          studentId
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to register')
      }

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setShowDetails(false)
        fetchEvents() // Refresh events
      }, 2000)

    } catch (error) {
      console.error("Error registering:", error)
      setError(error.message)
    } finally {
      setRegisterLoading(false)
    }
  }

  // Handle registration cancellation
  const handleCancelRegistration = async (eventId) => {
    if (!confirm("Are you sure you want to cancel your registration?")) return
    
    try {
      const res = await fetch(`/api/student/events/cancel?eventId=${eventId}&studentId=${studentId}`, {
        method: "DELETE"
      })

      if (!res.ok) {
        throw new Error('Failed to cancel registration')
      }

      fetchEvents() // Refresh events
    } catch (error) {
      console.error("Error cancelling:", error)
      setError(error.message)
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      full: date.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  }

  // Get availability color
  const getAvailabilityColor = (registered, max) => {
    if (!max) return "text-green-600 bg-green-50"
    const percentage = (registered / max) * 100
    if (percentage >= 90) return "text-red-600 bg-red-50"
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-green-600 bg-green-50"
  }

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(search.toLowerCase()) ||
                         event.description?.toLowerCase().includes(search.toLowerCase()) ||
                         event.venue?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const upcomingEvents = filteredEvents.filter(e => e.status === "upcoming")
  const completedEvents = filteredEvents.filter(e => e.status === "completed")
  const registeredEvents = events.filter(e => e.isRegistered)

  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading events...</p>
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
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Campus Events</h1>
            <p className="text-xs md:text-sm text-gray-500">Discover and register for events</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-600">
            <p className="text-xs text-gray-500 mb-1">Total Events</p>
            <p className="text-xl font-bold text-gray-800">{events.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-600">
            <p className="text-xs text-gray-500 mb-1">Upcoming</p>
            <p className="text-xl font-bold text-green-600">{events.filter(e => e.status === "upcoming").length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-600">
            <p className="text-xs text-gray-500 mb-1">Registered</p>
            <p className="text-xl font-bold text-purple-600">{registeredEvents.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-orange-500">
            <p className="text-xs text-gray-500 mb-1">Completed</p>
            <p className="text-xl font-bold text-orange-600">{events.filter(e => e.status === "completed").length}</p>
          </div>
        </div>

        {/* My Registrations Card */}
        {registeredEvents.length > 0 && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-sm p-4 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Ticket size={20} />
                <div>
                  <p className="text-sm font-semibold">You're registered for {registeredEvents.length} events</p>
                  <p className="text-xs text-white/80">Check your upcoming events</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCategory("all")}
                className="px-3 py-1.5 bg-white/20 rounded-lg text-xs hover:bg-white/30 transition-colors"
              >
                View My Events
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Search and Categories */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title, description or venue..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                <Sparkles size={16} className="mr-2 text-yellow-500" />
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingEvents.map((event) => {
                  const date = formatDate(event.date)
                  const availableSeats = event.maxParticipants ? 
                    event.maxParticipants - (event.registered || 0) : null
                  
                  return (
                    <div
                      key={event.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
                      onClick={() => {
                        setSelectedEvent(event)
                        setShowDetails(true)
                      }}
                    >
                      {/* Color Bar */}
                      <div className={`h-2 bg-${event.color}-500`}></div>
                      
                      <div className="p-5">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <span className={`text-xs px-2 py-1 rounded-full bg-${event.color}-50 text-${event.color}-600`}>
                            {event.category || "General"}
                          </span>
                          {event.isRegistered && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center">
                              <CheckCircle size={12} className="mr-1" /> Registered
                            </span>
                          )}
                        </div>

                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{event.title}</h3>
                        
                        {event.description && (
                          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{event.description}</p>
                        )}

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-xs text-gray-600">
                            <Calendar size={12} className="mr-2 text-blue-600" />
                            {date.full}
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <MapPin size={12} className="mr-2 text-purple-600" />
                            {event.venue}
                          </div>
                          {event.maxParticipants && (
                            <div className="flex items-center text-xs">
                              <Users size={12} className="mr-2 text-green-600" />
                              <span className={`px-2 py-0.5 rounded-full text-xs ${getAvailabilityColor(event.registered, event.maxParticipants)}`}>
                                {availableSeats} / {event.maxParticipants} seats available
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center space-x-1">
                            {event.tags?.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-xs text-gray-400">#{tag}</span>
                            ))}
                          </div>
                          <button className="text-blue-600 hover:text-blue-700">
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Completed Events */}
          {completedEvents.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-500" />
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm opacity-75 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {event.category || "General"}
                      </span>
                      <span className="text-xs text-gray-400">Completed</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{event.title}</h3>
                    <p className="text-xs text-gray-500">{formatDate(event.date).full}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-sm font-medium text-gray-700 mb-1">No Events Found</h3>
              <p className="text-xs text-gray-400">No events match your search criteria</p>
            </div>
          )}
        </div>

        {/* Event Details Modal */}
        {showDetails && selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Color Bar */}
              <div className={`h-2 bg-${selectedEvent.color}-500 rounded-t-2xl`}></div>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full bg-${selectedEvent.color}-50 text-${selectedEvent.color}-600`}>
                        {selectedEvent.category || "General"}
                      </span>
                      {selectedEvent.isRegistered && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center">
                          <CheckCircle size={12} className="mr-1" /> Registered
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h2>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Event Image */}
                <div className="text-6xl text-center mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
                  {getEventImage(selectedEvent.category)}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Calendar size={16} className="text-blue-600 mb-1" />
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium">{formatDate(selectedEvent.date).full}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <MapPin size={16} className="text-purple-600 mb-1" />
                    <p className="text-xs text-gray-500">Venue</p>
                    <p className="text-sm font-medium">{selectedEvent.venue}</p>
                  </div>
                  {selectedEvent.maxParticipants && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Users size={16} className="text-green-600 mb-1" />
                      <p className="text-xs text-gray-500">Availability</p>
                      <p className={`text-sm font-medium ${getAvailabilityColor(selectedEvent.registered, selectedEvent.maxParticipants)}`}>
                        {selectedEvent.maxParticipants - (selectedEvent.registered || 0)} / {selectedEvent.maxParticipants} seats
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                {selectedEvent.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">About the Event</h3>
                    <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {getEventTags(selectedEvent.category).map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Close
                  </button>
                  
                

                  {selectedEvent.isRegistered && (
                    <button
                      onClick={() => handleCancelRegistration(selectedEvent.id)}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center hover:bg-red-700"
                    >
                      <XCircle size={14} className="mr-2" />
                      Cancel Registration
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center animate-slideUp">
            <CheckCircle size={18} className="mr-2" />
            Successfully registered for the event!
          </div>
        )}

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          * Events are created by college administration
        </p>
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