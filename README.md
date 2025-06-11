# Bike Shop Web App – Solution Summary

## Overview

This project is a full-stack web application for a customizable bicycle shop, allowing users to browse, customize, and purchase bikes and related products. The app supports user authentication, admin dashboards, product/category management, and a dynamic cart system.

---

## Technologies Utilized

- **Next.js (App Router):** Main framework for SSR/SSG and routing.
- **React 19:** UI components and client-side interactivity.
- **TypeScript:** Type safety across the codebase.
- **Tailwind CSS:** Utility-first CSS for styling (`src/app/globals.css`).
- **NextAuth.js v5:** Authentication and session management (`src/app/api/auth/[...nextauth]/auth.ts`).
- **React Hook Form:** Form state management and validation.
- **Zod:** Schema validation for forms and API requests (`src/app/lib/validation/`).
- **React Icons:** Iconography.
- **use-debounce:** Debounced input handling for search.

---

## Authentication & Authorization

- **Authentication:**  
  - Handled via NextAuth.js with a custom credentials provider.
  - On login, credentials are validated and exchanged for a JWT (`access_token`) from the backend API.
  - The JWT is stored in the session and used for authenticated API requests.
  - Session data is enriched with user profile info fetched from the backend (`src/app/api/auth/[...nextauth]/auth.ts`).

- **Authorization Guards:**  
  - Middleware (`src/middleware.ts`) restricts access to `/dashboard` routes to admin users only, using `withAdmin`.
  - `withUser` can be used for user-level protection.
  - Guards check the session and user roles, redirecting unauthorized users to `/login` or `/`.

---

## Request & Schema Validation

- **Form Validation:**  
  - All forms use React Hook Form with Zod schemas for validation (e.g., `signUpSchema`, `signInSchema`, `createCategorySchema`).
  - Validation errors are displayed inline using components like `ErrorCard`.

- **API Request Validation:**  
  - Before sending data to the backend, forms are validated against Zod schemas.
  - Server actions (e.g., `createCategory`, `signUp`) parse and validate input before making API calls.

---

## Features & Structure

- **Product & Category Management:**  
  - Admin dashboard for CRUD operations on products and categories.
  - Product types: master, variant, composed (with dynamic combinations and stock management).
  - Category and product search with debounced input.

- **Cart & Checkout:**  
  - Authenticated users can add/remove products to/from their cart.
  - Cart state is synced with the backend and session.
  - Price calculation supports composed products and dynamic combinations (`calculateCartProductPrice`).

- **UI/UX:**  
  - Responsive, modern UI with Tailwind CSS.
  - Components for forms, tables, search, and product customization.

---

## Security

- **Session Management:**  
  - JWT tokens are stored in secure, HTTP-only cookies.
  - All sensitive API requests include the bearer token for authorization.

- **Input Validation:**  
  - All user input is validated both client-side and server-side before processing.

---

## Extensibility

- The system is designed to support new product types and categories, with flexible schema definitions and dynamic UI components.