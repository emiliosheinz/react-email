# React Email Hydration Issue Reproduction

This repository demonstrates the hydration marker issue with `@react-email/render` in Next.js 15.4+ with React 19.

## Issue

When rendering emails in Next.js 15.4+ app directory, React adds hydration markers (scripts, comments, hidden divs) that break email rendering.

## Setup

```bash
# Install dependencies
pnpm install

# Run tests
node test.mjs  # Test outside Next.js
pnpm dev             # Start Next.js server (in another terminal: curl http://localhost:3000/api/test)
```

## Files

- `src/emails/large-email.tsx` - Email template using React Email components
- `test.mjs` - Standalone test showing baseline issue
- `src/app/api/test/route.ts` - API route showing worse issue in Next.js app directory

## Results

### Outside Next.js
- 1 React comment (`<!--$-->`)

### Inside Next.js App Directory  
- React comments
- Script tags with hydration functions ($RT, $RB, $RV, $RC)
- Hidden divs with IDs

This confirms the issue is related to streaming APIs + Suspense wrapper causing hydration markers.
