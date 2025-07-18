# EzTraveler Development Guidelines

## Convex Development Best Practices

### Function Guidelines

#### New Function Syntax
- ALWAYS use the new function syntax for Convex functions:
```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const f = query({
    args: {},
    returns: v.null(),
    handler: async (ctx, args) => {
        // Function body
    },
});
```

#### Function Registration
- Use `query`, `mutation`, and `action` to register public functions
- Use `internalQuery`, `internalMutation`, and `internalAction` for private functions
- ALWAYS include argument and return validators for all Convex functions
- If a function doesn't return anything, include `returns: v.null()`

#### Function Calling
- Use `ctx.runQuery` to call a query from a query, mutation, or action
- Use `ctx.runMutation` to call a mutation from a mutation or action
- Use `ctx.runAction` to call an action from an action
- All calls take a `FunctionReference`, not the function directly

### Validators Guidelines
- Use `v.int64()` instead of deprecated `v.bigint()`
- Use `v.record()` for record types (not `v.map()` or `v.set()`)
- Always use `v.null()` validator when returning null values

### Schema Guidelines
- Define schema in `convex/schema.ts`
- Import schema functions from `convex/server`
- Include all index fields in the index name (e.g., "by_field1_and_field2")
- Index fields must be queried in the same order they are defined

### Query Guidelines
- Do NOT use `filter` in queries - define indexes and use `withIndex` instead
- Use `.unique()` to get a single document (throws error if multiple matches)
- Use `.order('asc')` or `.order('desc')` for explicit ordering
- For async iteration, use `for await (const row of query)` syntax

### TypeScript Guidelines
- Use `Id<'tableName'>` type for document IDs
- Be strict with types, especially around document IDs
- Always use `as const` for string literals in discriminated unions
- Add `@types/node` when using Node.js built-in modules

### Action Guidelines
- Add `"use node";` at top of files with Node.js actions
- Never use `ctx.db` inside actions (no database access)
- Actions are for external API calls and Node.js operations

### File Storage Guidelines
- Use `ctx.storage.getUrl()` for signed URLs
- Query `_storage` system table for file metadata (not deprecated `getMetadata`)
- Convert items to/from `Blob` objects for Convex storage

## EzTraveler Specific Guidelines

### Travel Data Models
- Use descriptive table names: `trips`, `itineraries`, `destinations`, `travelers`
- Include proper relationships between entities
- Use optional fields for incomplete planning data

### Real-time Features
- Leverage Convex's reactive queries for live trip collaboration
- Use mutations for trip updates that trigger real-time sync
- Implement proper error handling for offline scenarios

### API Design
- Organize functions by feature in separate files
- Use file-based routing thoughtfully (e.g., `convex/trips.ts`, `convex/itineraries.ts`)
- Group related functions together
- Keep public API minimal and focused

### Development Workflow
- Use two terminals: `pnpm convex:dev` (backend) and `pnpm dev` (frontend)
- Test with sample travel data during development
- Maintain proper TypeScript types throughout the stack
- Follow incremental development with proper testing

### Performance Considerations
- Use indexes for all query patterns
- Limit query results appropriately (pagination for large datasets)
- Optimize for common travel planning workflows
- Cache expensive computations in the database when appropriate
