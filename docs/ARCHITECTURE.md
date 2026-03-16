# System Architecture

This document describes the architecture of the Self-Improvement application.

## High Level Architecture

```text
Frontend (Vue 3)
        │
        │ REST API
        ▼
Backend (Node.js)
        │
        ├ Auth Service
        ├ Goal Service
        ├ Habit Service
        ├ Journal Service
        └ Analytics Service
        │
        ▼
Database (PostgreSQL)
```

Optional services:
- Redis Cache
- Notification Service

## Frontend Architecture

The frontend is built using Vue 3 with Composition API.

Main responsibilities:
- UI rendering
- State management
- API communication
- Client-side routing

### Frontend Folder Structure

```text
src
│
├ components
│   ├ goals
│   ├ habits
│   ├ charts
│   └ common
│
├ views
│   ├ DashboardView.vue
│   ├ GoalsView.vue
│   ├ HabitsView.vue
│   ├ JournalView.vue
│   └ SettingsView.vue
│
├ stores
│   ├ authStore.ts
│   ├ goalStore.ts
│   ├ habitStore.ts
│   ├ journalStore.ts
│
├ router
│   └ index.ts
│
├ services
│   ├ api.ts
│   ├ goalService.ts
│   ├ habitService.ts
│
├ composables
│
└ utils
```

### State Management

State is managed using Pinia.
Stores are organized by domain.

Examples:
- `authStore`
- `goalStore`
- `habitStore`
- `journalStore`
- `analyticsStore`

Example structure:
```text
goalStore
 ├ goals
 ├ activeGoal
 ├ fetchGoals()
 ├ createGoal()
 └ updateGoal()
```

## Backend Architecture

Recommended backend structure:

```text
src
│
├ controllers
│   ├ authController
│   ├ goalController
│   ├ habitController
│
├ services
│   ├ goalService
│   ├ habitService
│
├ models
│   ├ user
│   ├ goal
│   ├ habit
│
├ routes
│
└ middlewares
```

## Database Design

### Users
```text
users
-----
id
email
password_hash
created_at
```

### Goals
```text
goals
-----
id
user_id
title
description
deadline
status
progress
created_at
```

### Milestones
```text
milestones
-----------
id
goal_id
title
deadline
progress
```

### Habits
```text
habits
------
id
user_id
name
frequency
created_at
```

### Habit Logs
```text
habit_logs
-----------
id
habit_id
date
completed
```

### Journal Entries
```text
journal_entries
----------------
id
user_id
content
mood
created_at
```

## API Design

### Authentication
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Goals
- `GET    /goals`
- `POST   /goals`
- `PUT    /goals/:id`
- `DELETE /goals/:id`

### Habits
- `GET  /habits`
- `POST /habits`
- `POST /habits/:id/check`

### Journal
- `GET  /journal`
- `POST /journal`
