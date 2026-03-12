# 🎓 College ERP System

A simplified **College ERP (Enterprise Resource Planning) system** built using **Next.js, Prisma, PostgreSQL, and Tailwind CSS**.  
The application provides **role-based dashboards** for **Admin, Faculty, and Students** to manage academic activities such as departments, assignments, events, and notices.

---

# 🚀 Features

## 🔐 Authentication
- Secure login system
- Password hashing using **bcrypt**
- Role-based access control
- Protected routes for each user role

## 👑 Admin Portal
Admin has full control of the system.

Admin can:
- Create and manage **Departments**
- Add, edit, delete **Students**
- Add, edit, delete **Faculty**
- Create **Events**
- Publish **Notices**

## 👨‍🏫 Faculty Portal
Faculty members can:

- Upload **lecture materials**
- Create **assignments**
- View **student submissions**
- Post **announcements**

## 👨‍🎓 Student Portal
Students can:

- View **study materials**
- View and submit **assignments**
- Register for **events**
- Read **notices**

---

# 🛠 Tech Stack

### Frontend
- Next.js 14
- React
- Tailwind CSS
- Lucide Icons

### Backend
- Next.js API Routes
- REST API structure
- Prisma ORM

### Database
- PostgreSQL

### Authentication
- bcrypt password hashing

---

# 📂 Project Structure



# 🔌 API Structure

The backend APIs follow a **RESTful structure** using Next.js API routes.

## Authentication

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | User login |

---

## Admin APIs

### Departments

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/admin/departments | Get all departments |
| POST | /api/admin/departments | Create department |
| PUT | /api/admin/departments/:id | Update department |
| DELETE | /api/admin/departments/:id | Delete department |

### Students

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/admin/students | Get all students |
| POST | /api/admin/students | Create student |
| PUT | /api/admin/students/:id | Update student |
| DELETE | /api/admin/students/:id | Delete student |

### Faculty

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/admin/faculty | Get all faculty |
| POST | /api/admin/faculty | Create faculty |
| PUT | /api/admin/faculty/:id | Update faculty |
| DELETE | /api/admin/faculty/:id | Delete faculty |

### Events

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/admin/events | Get all events |
| POST | /api/admin/events | Create event |
| DELETE | /api/admin/events/:id | Delete event |

### Notices

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/admin/notices | Get all notices |
| POST | /api/admin/notices | Create notice |
| PUT | /api/admin/notices/:id | Update notice |
| DELETE | /api/admin/notices/:id | Delete notice |

---

## Faculty APIs

### Courses

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/faculty/courses | Get faculty courses |
| POST | /api/faculty/courses | Create course |
| PUT | /api/faculty/courses/:id | Update course |
| DELETE | /api/faculty/courses/:id | Delete course |

### Assignments

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/faculty/assignments | Get assignments |
| POST | /api/faculty/assignments | Create assignment |
| PUT | /api/faculty/assignments/:id | Update assignment |
| DELETE | /api/faculty/assignments/:id | Delete assignment |

---

## Student APIs

### Assignments

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/student/assignments | Get student assignments |
| POST | /api/student/assignments/submit | Submit assignment |

### Events

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/student/events | Get all events |
| POST | /api/student/events/register | Register for event |
| DELETE | /api/student/events/cancel | Cancel event registration |

### Notices

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/student/notices | Get all notices |