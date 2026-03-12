

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

## Login Page

<img width="1347" height="640" alt="image" src="https://github.com/user-attachments/assets/36e1e5ae-7e19-4d5c-b465-c0667effac46" />

Users can log in using their email and password.  
After login, they are redirected to their role-based dashboard (Admin, Faculty, or Student).

## Register Page 

<img width="1361" height="632" alt="image" src="https://github.com/user-attachments/assets/fc4b4077-1662-4aed-ab32-6cf63ca64d1d" />

Users can create a new account by providing their name, email, password, and role.  
After registration, they can log in to access their dashboard.

## Admin Dashboard Page 

<img width="1349" height="656" alt="image" src="https://github.com/user-attachments/assets/558ed402-69de-4f63-b9ab-4e1cedb83bdf" />
The Admin Dashboard provides complete control over the College ERP system.  
Administrators can manage all major entities of the system including departments, students, faculty members, events, and notices.

### Features

- **Departments:**  
  Admin can **add or delete departments** in the college system.

- **Students:**  
  Admin can **add new students, view student records, and delete students** when required.

- **Faculty:**  
  Admin can **add faculty members and remove them from the system**.

- **Events:**  
  Admin can **create events and delete existing events**.

- **Notices:**  
  Admin can **post notices for students and faculty and remove notices when needed**.

This dashboard acts as the **central management panel** for the entire ERP system.
## Student Dashboard Page 
<img width="1365" height="638" alt="image" src="https://github.com/user-attachments/assets/be00b591-19a0-4587-bc46-877fe15c33e6" />
The Student Dashboard provides an overview of the student's academic activities and information.

### Features

- **Dashboard Data (Dynamic):**  
  The dashboard displays dynamic data such as assignments, events, and notices fetched from the backend APIs.

- **Courses (Static):**  
  The courses section currently displays static course information assigned to the student.

- **Assignments:**  
  Assignments are created by **Faculty** and automatically appear on the **Student Dashboard**.

- **Events:**  
  Events are created and managed by the **Admin**, and students can view upcoming events from their dashboard.

- **Notices:**  
  Notices posted by the **Admin** are visible to students through the notice section.

This setup ensures proper workflow between **Admin → Faculty → Student** within the College ERP system.

## Faculty Dashboard Page
<img width="1357" height="637" alt="image" src="https://github.com/user-attachments/assets/b65bc26d-2b6d-44d1-a77c-20abe81f9b38" />

The Faculty Dashboard allows faculty members to manage academic activities such as courses, assignments, and student interactions.

Key features of this page:

- Faculty can view **courses they teach (My Courses)**.
- Faculty can **post assignments** which become directly visible on the **student dashboard**.
- Faculty can **view students enrolled in their courses**.
- Faculty can **post announcements and notices**.
- Faculty can **grade assignment submissions**.
- Faculty can also **take attendance for students**.

### Data Flow in the System

- **Students added by Admin** appear in the **Faculty Dashboard student list**.
- **Assignments created by Faculty** are automatically visible in the **Student Dashboard**.
- **Student dashboard data (courses, assignments, attendance)** is fetched dynamically using **API calls**.
- Some statistics such as **My Courses count** may be static or predefined depending on implementation.

This structure ensures proper **role-based workflow between Admin → Faculty → Student** within the ERP system.

 #@ 🚀 Live Demo

Frontend: https://college-erp-79li.vercel.app/login

GitHub Repository:
https://github.com/yourusername/college-erp


## ⚙️ Run Project Locally

Follow these steps to run the project on your local machine.

### 1️⃣ Clone the Repository

``` bash
git clone https://github.com/yourusername/college-erp.git
cd college-erp
```

### 2️⃣ Install Dependencies

``` bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root folder and add:

``` env
DATABASE_URL="your_postgresql_database_url"
```

### 4️⃣ Setup Database

``` bash
npx prisma db push
npx prisma generate
```

### 5️⃣ Run Development Server

``` bash
npm run dev
```

Now open your browser and go to:

    http://localhost:3000

The College ERP application will run locally on your system.



