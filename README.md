# Premium Interactive Calendar Component

A production-ready, interactive wall calendar component built with modern React. This project delivers a high-performance, aesthetically pleasing physical-calendar-inspired UI with advanced features.

## Technical Stack & Choices

- **Next.js & React**: Built on Next.js leveraging the latest React 19 features for optimal performance, smooth server-client boundaries, and clean architecture.
- **TypeScript**: Ensuring robust code quality, strict type safety, and great developer experience, especially useful for managing complex domain data like holidays and calendar states.
- **Tailwind CSS v4**: Utilized for utility-first styling to ensure rapid development alongside a sophisticated, highly customizable design system without the bloat of traditional CSS.
- **Framer Motion**: Integrated to provide premium, physics-based micro-interactions, layout transitions, and fluid animations for the interactive elements (e.g., hover states, note panels, month transitions).

## Key Features

- **Interactive Calendar Grid**: A meticulously designed grid system mimicking a physical wall calendar (`CalendarGrid.tsx` & `DayCell.tsx`).
- **Date Range Selector**: Allows users to dynamically select date ranges seamlessly (`RangeSelector.tsx`).
- **Dynamic Theme Engine**: A unique system (`lib/theme-engine.ts`) that adapts UI colors contextually reflecting monthly aesthetics.
- **Persistent Notes System**: Integrated notes management locally persisting user notes per day (`NotesPanel.tsx`).
- **Rich Holiday Dataset**: Full integration of 2026 Indian holidays (`lib/holidays.ts`), featuring semantic classifications (public, restricted, religious) visualized via smart, auto-positioning hover tooltips and emojis.

## Project Structure

- `src/components/` - Core UI blocks (`DayCell`, `CalendarGrid`, `NotesPanel`, etc.)
- `src/lib/` - Utilities and domain logic (`date-utils.ts`, `holidays.ts`, `theme-engine.ts`)
- `src/app/` - Next.js App Router entry points

## How to Run Locally

Prerequisites: Make sure you have Node.js (version 20 or higher recommended) installed.

1. **Install dependencies:**
   In the root of the project directory, run:
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **View the application:**
   Open your browser and navigate to `http://localhost:3000`. 
   The page will auto-reload as you make modifications to the code.
