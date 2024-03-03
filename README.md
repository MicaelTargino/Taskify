# Taskify

Taskify is a Task Management App built with Next.js14. It provides a seamless and intuitive experience for managing tasks and collaborating with your team.

## Technologies Used

- **Next.js**: React framework for building server-rendered applications. [https://nextjs.org/](https://nextjs.org/)
- **Tailwind CSS**: Utility-first CSS framework for styling. [https://tailwindcss.com/](https://tailwindcss.com/)
- **Shadcn Ui**: Open-Source library with Pre-built and customizable components for the UI. [https://ui.shadcn.com/](https://ui.shadcn.com/)
- **Clerk**: User management library that serves UI's and API's for authentication.  [https://clerk.com/](https://clerk.com/)

  
## Status
**COMPLETED**

The development of the Taskify is currently is completed for now. Soon will be deployed and the link will be available here.

## Features:
- ✅ Auth 
- ✅ Organizations / Workspaces
- ✅ Board creation
- ✅ Unsplash API for random beautiful cover images
- ✅ Board rename and delete
- ✅ List creation
- ✅ List rename
- ✅ List delete
- ✅ List drag & drop
- ✅ List reorder
- ✅ List copy
- ✅ Card creation
- ✅ Card description, rename, delete, drag & drop reorder and copy
- ✅ Landing page
- ✅ MySQL DB
- ✅ Prisma ORM
- ✅ shadcnUI & TailwindCSS
- ✅ Pomodoro
- ✅ Assign collaborators to workspaces
- ✅ Add deadline to tasks

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/MicaelTargino/Taskify.git taskify

2. cd into directory 

   ```bash
   cd taskify

4. Install the requirements 

   ```bash
   npm install 

5. Start the database server
   ```bash
   docker-compose up
   ```

6. Make sure the app is in sync with the database
   ```bash
   npx prisma db push
   ```

7. run the development server:

     ```bash
     npm run dev
     # or
     yarn dev
     # or
     pnpm dev
     ```

8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
