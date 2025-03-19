# FlashEase

![FlashEase Banner](https://via.placeholder.com/1200x400.png?text=FlashEase+Flashcard+Learning)

**FlashEase** is a Quizlet-inspired flashcard learning application designed to help students and learners study efficiently. Built with [Next.js](https://nextjs.org/) for the frontend and [NestJS](https://nestjs.com/) for the backend, FlashEase offers a modern, responsive, and user-friendly experience for creating, managing, and studying flashcards. Whether you're preparing for exams or learning a new language, FlashEase makes studying engaging and effective.

## ✨ Features

- **Create and Manage Flashcards**: Easily create, edit, and organize flashcard sets for any subject.
- **Study Modes**: Practice with interactive modes like flashcard, learn, and test mode.
- **Responsive Design**: Optimized for both mobile and desktop devices using Tailwind CSS.
- **User Profiles**: Manage your account, track progress, and customize your learning experience.
- **Form Validation**: Robust form handling with React Hook Form and Zod for creating flashcard sets.
- **Modern UI**: Accessible and customizable components powered by Radix UI.
- **Dark/Light Mode**: Theme support with `next-themes` for comfortable studying at any time.
- **Backend API**: Powered by NestJS for secure and scalable data management.
- **Type Safety**: Written in TypeScript for a better developer experience and fewer bugs.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) (v15.1.6)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Theme Support**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [motion](https://motion.dev/)

### Backend

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

### Tools

- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linting**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [pnpm](https://pnpm.io/) (v10.4.1)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for Docker setup)

### Installation

1. **Clone the repository and install dependencies**:

   ```bash
   git clone https://github.com/hungpn23/flashease_client.git
   cd flashease_client
   pnpm install
   ```

2. **Build and run the application**:

   ```bash
   docker network create flashease
   COMPOSE_BAKE=true docker compose -f compose.local.yml up --build
   ```

3. **Access the application**:
   Open http://localhost in your browser to access the app via Nginx.

   The Nginx proxy routes requests to the Next.js frontend (http://client:3000).
   API requests to /api/v1/ will be proxied to the NestJS backend (if running on server:3001).
