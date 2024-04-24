## AI Reminder
Overview
AI Reminder is an advanced application designed to transform spoken commands into actionable reminders automatically. Utilizing state-of-the-art AI models like OpenAI's Whisper large-v2 and Mixtral 8x7B, this app interprets spoken tasks and schedules them effectively, improving productivity and organization. Developed using Next.js and tRPC, AI Reminder provides a seamless user interface and reliable server-side operations, supported by a robust PostgreSQL database managed through Supabase.

## Features
- Voice-Activated Reminder Creation: Easily convert speech into structured reminders.
- Intelligent Context Recognition: Understands context from voice notes, setting reminders based on recognized dates and times.
- Seamless User Experience: Provides a clean, user-friendly interface for managing daily tasks and reminders.
  
## Technology Stack
- Frontend: Next.js (v14) for a comprehensive web application framework.
- Backend: tRPC for type-safe API routes.
- Database: PostgreSQL hosted on Supabase for data storage.
- AI Analysis: OpenAI Whisper large-v2 for speech-to-text conversion and Mixtral 8x7B for task extraction and interpretation.
- Authentication: Integrated using Clerk for secure user management.

## Getting Started
Prerequisites

Before starting, ensure you have the following:

Node.js installed (latest LTS version recommended).
A Supabase account and a PostgreSQL database setup.
API keys for OpenAI.
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
