# EzTraveler Convex Setup Plan

## Current State Analysis
- ✅ React + Vite + TypeScript project already created
- ✅ Convex package already installed (v1.25.4)
- 🔄 Need to integrate Convex with React app
- 🔄 Need to set up Convex backend

## Setup Plan

### Phase 1: Convex Development Environment Setup
1. **Initialize Convex development environment**
   - Run `pnpm convex:dev` to create Convex project and dev deployment
   - This will create the `convex/` folder for backend functions
   - Will prompt for GitHub login and project creation

2. **Update package.json scripts**
   - Add convenient Convex scripts (`pnpm convex:dev`, `pnpm convex:deploy`)
   - Keep development workflow simple: separate terminals for frontend and backend

### Phase 2: Sample Data and Schema Setup
3. **Create sample data structure**
   - Create `sampleData.jsonl` with travel-related sample data
   - Focus on travel planning tasks/itinerary items

4. **Define database schema**
   - Create `convex/schema.ts` with proper TypeScript types
   - Define tables for travel-related entities (tasks, trips, etc.)

5. **Import sample data**
   - Use `pnpm dlx convex import` to populate database with sample data

### Phase 3: Backend API Functions
6. **Create Convex query functions**
   - Create `convex/tasks.ts` (or travel-specific functions)
   - Export query functions for data retrieval
   - Follow Convex best practices from guidelines

### Phase 4: Frontend Integration
7. **Set up Convex React Provider**
   - Update `src/main.tsx` to include ConvexProvider
   - Configure ConvexReactClient with environment variables

8. **Update App component**
   - Replace default Vite React app with Convex-connected travel app
   - Use `useQuery` hook to fetch data from Convex backend
   - Create basic travel planning interface

### Phase 5: Environment Configuration
9. **Environment variables setup**
   - Ensure `.env.local` is properly configured
   - Add Convex URL to environment variables

10. **Development workflow optimization**
    - Terminal 1: `pnpm convex:dev` (Convex backend)
    - Terminal 2: `pnpm dev` (Vite frontend)
    - Test the two-terminal development workflow

## Expected Outcome
- Fully functional React + Convex travel planning app
- Clean development experience with two-terminal workflow
- Proper TypeScript integration and type safety
- Sample travel data populated in database
- Foundation for building EzTraveler features

## Risk Mitigation
- Keep backup of current working state
- Test each phase incrementally
- Ensure proper error handling and validation
- Follow Convex best practices throughout

## Next Steps After Setup
- Design travel-specific data models
- Implement user authentication
- Add real-time collaboration features
- Build out travel planning UI components
