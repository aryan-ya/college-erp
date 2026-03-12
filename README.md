.
🎓 College ERP System

A full-stack College ERP (Enterprise Resource Planning) system built to simulate a simplified but practical college management environment.
The system provides role-based portals for Administrators, Faculty Members, and Students to manage academic activities efficiently.

This project was developed as an end-to-end production-style application including database design, API development, authentication, and deployment.

🚀 Live Demo

Frontend: https://college-erp-79li.vercel.app/login

GitHub Repository:
https://github.com/aryan-ya/college-erp

🧑‍💻 Tech Stack
Frontend

Next.js 14 (App Router)

React

Tailwind CSS

Lucide React Icons

Backend

Next.js API Routes

RESTful API architecture

bcrypt authentication

Database

PostgreSQL

Prisma ORM

Deployment

Vercel (Frontend)

Supabase / Railway / Render (Database & backend services)

🔐 Authentication System

The system implements secure authentication with role-based access control.

Features:

Secure login using email and password

Password hashing using bcrypt

Role-based dashboards

Protected routes to prevent unauthorized access

Session handling using localStorage

User Roles:

Admin

Faculty

Student

👑 Admin Portal

The Administrator has full control over the system.

Admin can manage:

Departments

Create and manage academic departments such as:

Computer Science

Mechanical Engineering

Electronics

Management

Each department contains associated students and faculty members.

Student Management

Admin can:

Create new student records

Edit student details

Delete students

View all registered students

Student information includes:

Name

Roll number / Student ID

Email

Phone number

Department

Admission year

Status

Admin can also search students and filter by department or admission year.

Faculty Management

Admin can:

Add new faculty members

Assign faculty to departments

Edit faculty details

Remove faculty when necessary

Faculty information includes:

Name

Email

Department

Designation

👨‍🏫 Faculty Portal

Faculty members access their own faculty dashboard.

They can:

Upload Lecture Materials

Faculty can upload:

PDFs

Presentations

Documents

Each material contains:

Title

Course name

Description

Department / semester

Students belonging to that department can view and download materials.

Assignment Management

Faculty can:

Create assignments

Set assignment deadlines

Upload assignment files

Students can submit assignments by uploading their work.

The system records:

Submission time

Submitted files

Faculty can review submitted assignments.

Announcements

Faculty can publish announcements such as:

Class updates

Schedule changes

Deadline reminders

Exam notifications

These announcements are visible to students of the relevant department.

👨‍🎓 Student Portal

Students have their own dashboard after login.

Students can:

View lecture materials uploaded by faculty

View assignments

Submit assignments

Read notices and announcements

View upcoming deadlines

The dashboard shows:

Recent materials

Upcoming assignments

Important notices

🎉 Event Management System

The ERP includes an Event Management module.

Admin can create events by adding:

Event name

Description

Date

Venue

Organizer

Maximum participants

Students can:

View upcoming events

Register for events

After registration, the system generates a digital event pass containing:

Student name

Event name

Event date

Unique identifier

(Optional feature: QR code verification)

📢 Notice Board

The portal includes a digital notice board.

Both Admin and Faculty can publish notices.

Each notice contains:

Title

Content

Department

Publication date

Students can:

View notices

Filter notices by department

🔎 Search Functionality

The system includes search features for easier navigation.

Examples:

Admin can search students and faculty

Students can search events and lecture materials

🗄 Database Design

The system uses PostgreSQL with Prisma ORM.

Core database entities:

User

Department

Student

Faculty

Course

Assignment

AssignmentSubmission

Event

Notice

Relationships between entities are implemented using foreign keys and relational mapping.

An ER Diagram is included in the repository.

🔌 API Structure

The backend exposes RESTful APIs for core operations.

Authentication APIs
POST /api/auth/login
POST /api/auth/register
Admin APIs
GET /api/admin/departments
POST /api/admin/departments

GET /api/admin/students
POST /api/admin/students

GET /api/admin/faculty
POST /api/admin/faculty
Faculty APIs
GET /api/faculty/courses
POST /api/faculty/courses

GET /api/faculty/assignments
POST /api/faculty/assignments
Student APIs
GET /api/student/assignments
GET /api/student/events
GET /api/student/notices

All APIs follow REST principles with proper error handling.

📂 Project Structure
college-erp
│
├── app
│   ├── api
│   ├── admin
│   ├── faculty
│   ├── student
│   └── login
│
├── prisma
│   └── schema.prisma
│
├── lib
│   └── prisma.js
│
├── public
│
├── .env.local
├── package.json
└── README.md
⚙️ Running the Project Locally
1 Clone Repository
git clone https://github.com/yourusername/college-erp.git
cd college-erp
2 Install Dependencies
npm install
3 Setup Environment Variables

Create .env.local

DATABASE_URL="postgresql://username:password@localhost:5432/college_erp"
4 Setup Database
npx prisma db push
npx prisma generate
5 Start Development Server
npm run dev

Open:

http://localhost:3000
🚀 Deployment

The application is deployed using modern cloud platforms.

Frontend: Vercel

Database: Supabase / Railway

Deployment Steps:

1 Push code to GitHub
2 Import repository in Vercel
3 Add environment variables
4 Deploy application