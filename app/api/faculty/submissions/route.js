import { NextResponse } from "next/server"

// This would be your database - using the same submissions array
let submissions = [
  {
    id: 1,
    assignmentId: 1,
    studentName: "Aryan Yadav",
    rollNo: "CS2024001",
    studentId: "CS2024001",
    file: "assignment1.pdf",
    submittedAt: new Date().toISOString(),
    status: "submitted",
    marks: null,
    feedback: null
  },
  {
    id: 2,
    assignmentId: 1,
    studentName: "Priya Singh",
    rollNo: "CS202402",
    studentId: "CS202402",
    file: "assignment1_priya.pdf",
    submittedAt: new Date().toISOString(),
    status: "submitted",
    marks: null,
    feedback: null
  }
]

// GET submissions for a specific student
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get("studentId")
  
  if (!studentId) {
    return NextResponse.json(
      { error: "Student ID is required" },
      { status: 400 }
    )
  }

  const studentSubmissions = submissions.filter(s => s.studentId === studentId)
  
  return NextResponse.json(studentSubmissions)
}

// POST new submission
export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const assignmentId = formData.get("assignmentId")
    const studentId = formData.get("studentId")
    const studentName = formData.get("studentName")
    const rollNo = formData.get("rollNo")

    if (!file || !assignmentId || !studentId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if already submitted
    const existingSubmission = submissions.find(
      s => s.assignmentId === parseInt(assignmentId) && s.studentId === studentId
    )

    if (existingSubmission) {
      return NextResponse.json(
        { error: "Already submitted" },
        { status: 400 }
      )
    }

    // In a real app, you would save the file to disk/cloud here
    // For now, we'll just store the filename
    const newSubmission = {
      id: submissions.length + 1,
      assignmentId: parseInt(assignmentId),
      studentId,
      studentName,
      rollNo,
      file: file.name,
      submittedAt: new Date().toISOString(),
      status: "submitted",
      marks: null,
      feedback: null
    }

    submissions.push(newSubmission)

    return NextResponse.json({
      message: "Submission successful",
      submission: newSubmission
    })

  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    )
  }
}

// UPDATE submission (for grading)
export async function PUT(request) {
  const body = await request.json()
  
  const submission = submissions.find(s => s.id === body.id)
  
  if (!submission) {
    return NextResponse.json(
      { message: "Submission not found" },
      { status: 404 }
    )
  }
  
  submission.marks = body.marks
  submission.feedback = body.feedback
  submission.status = "graded"
  
  return NextResponse.json({
    message: "Submission graded",
    submission
  })
}