# 🎒 University Lost & Found System (UniFound)

A full-stack, production-ready **University Lost & Found Management System** designed to replace unreliable WhatsApp groups, notice boards, and word-of-mouth reporting with a secure, structured, and moderated digital solution.

Built with modern technologies and containerized using Docker as a **personal project**.

---

## ✨ Key Features

### 👤 Authentication & Authorization
- Secure user authentication powered by **Supabase Auth**
- JWT-based API protection
- Role-based access (Users / Admin)

### 📦 Lost & Found Lifecycle Management
- Report lost items with detailed metadata
- Report found items linked to lost records
- Three-stage item lifecycle:
  - **Active Lost Items**
  - **Found Reports**
  - **Successfully Claimed (Closed Cases)**

### ✅ Claim Verification
- Only item owners can mark items as *Claimed*
- Instant status updates across dashboards
- Visual indicators (line-through) for resolved cases

### 📊 User Dashboard
- Personalized dashboard per user
- Three-way filtering by item status
- Real-time state updates without page reloads

### 🛠 Admin Moderation
- Admin-only verification endpoints
- Prevents fake claims and misuse
- Controlled resolution flow

### 📈 Live System Statistics
- Live counts of:
  - Total lost items
  - Total found items
- Displayed on the **About Us** page

---

## 🧱 Tech Stack

### Frontend
- **Next.js (App Router)**
- TypeScript
- Tailwind CSS
- Supabase Client SDK

### Backend
- **NestJS**
- REST API
- Supabase Admin SDK (Service Role)

### Database & Auth
- **Supabase (PostgreSQL + Auth)**
- Row Level Security (RLS)

### Infrastructure
- **Docker & Docker Compose**
- Environment-based configuration

---

## 🚀 Getting Started

### 1. Prerequisites
- Docker & Docker Compose installed
- Supabase project created

---

### 2. Environment Setup

Create a `.env` file in the **root directory** (next to `docker-compose.yml`) and **frontend directory**:

```env
# Frontend & Build Keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
Create a `.env` file in the **backend directory**:

```env
# Backend Keys
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```
---

### 3. Running the System

From the root directory:

```bash
docker compose up --build
```
Services will be available at:

Frontend → http://localhost:3000

Backend API → http://localhost:3001


## 🧠 System Architecture

[ Next.js Frontend ]
&ensp;&ensp;&ensp;&ensp;|
&ensp;&ensp;&ensp;&ensp;|  REST API (JWT)
&ensp;&ensp;&ensp;&ensp;v
[ NestJS Backend ]
&ensp;&ensp;&ensp;&ensp;|
&ensp;&ensp;&ensp;&ensp;|
[ Supabase PostgreSQL + Auth ]

## 🔐 Security Highlights

- JWT validation on every protected route
- Supabase Service Role key used only on backend
- RLS policies enforced at database level
- Environment variables isolated per container


## 👨‍💻 Author

#### Upek Kasun Akalanka
**Software Engineering Undergraduate**
Sri Lanka Institute of Information Technology (SLIIT)


*⭐ If you like this project, consider giving it a star!*
