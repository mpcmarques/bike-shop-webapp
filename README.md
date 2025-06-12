# Bike Shop Web App 

## Solution Analysis: Data Model, User Actions, and Workflows

### 1. Data Model

Better described in the Backend API project : https://github.com/mpcmarques/demo-bike-shop-api

This application uses a **document-based (MongoDB/Mongoose)** data model, with the following main entities:

#### Category

- **Fields:**  
  - `name` (string): Unique name of the category (e.g., "bicycles").
  - `label` (string): Display label.
  - `description` (string): Description for UI.
  - `showInMenu` (boolean): Whether to show in navigation.

#### Product

- **Fields:**  
  - `sku` (UUID): Unique product identifier.
  - `name` (string): Unique product name.
  - `label` (string): Display label.
  - `description` (string): Product description.
  - `image` (string): Image URL.
  - `category` (ObjectId): Reference to a Category.
  - `variationAttributes` (array): List of attributes (e.g., color, finish, size) and their values.
  - `listPrice` (number): Base price.
  - `salesPrice` (number): Discounted price.
  - `stock` (number): Inventory count.
  - `productType` (enum): `'master'`, `'variant'`, or `'composed'`.
  - `masterProduct` (ObjectId): Reference to the master product (for variants).
  - `variants` (array): References to variant products.
  - `composed` (array): For composed products, a 2D array of `{ category, product }` objects.

#### User

- **Fields:**  
  - `firstName`, `lastName`, `address`, `floor`, `door`, `postalCode`, `city`, `email`, `password`, `salt`
  - `roles` (array): User roles (`user`, `admin`)
  - `cart`:
    - `items`: Array of cart items:
      - `product`: Reference to Product
      - `quantity`: Number
      - `combination`: Array of Product references (for composed/custom builds)
    - `total`: Cart total price

---

### 2. Main User Actions

#### a. Browsing Products

- Users can browse categories and products.
- Products are fetched with their variants and available options.

#### b. Viewing a Product Page

- The UI displays:
  - Product image, label, description, price.
  - Customization options (e.g., frame type, finish, wheels, rim color, chain).
  - Out of stock options shows as not selectable.
  - Prohibited combinations are filtered out (handled in business logic/UI).

- **Available options** are determined by:
  - Filtering variants and composed options by stock and business rules.
  - Excluding combinations that are not possible (e.g., mountain wheels only with full-suspension).

- **Price calculation**:
  - Sum the prices of all selected parts/options.
  - If the product is composed, the price is the sum of all selected variant parts (ex: variant: Full-suspension Matte Finish, master: Full-Suspension).

#### c. Adding to Cart

- When "Add to Cart" is clicked:
  - The selected product/variant/composed combination and quantity are sent to the backend.
  - The backend validates stock and business rules.
  - The user's cart is updated:
    - Adds a new item with the product, quantity, and combination.
    - Recalculates the cart total.
  - Cart is persisted in the user's document in the database.

#### d. Checkout

- User reviews cart.

---

### 3. Administrative Workflows

#### a. New Product Creation

- Marcus (admin) uses an admin UI to create a new product.
- Required information:
  - Name, label, description, image, category, price(s), stock, product type, variation attributes, composed parts (if any).
- The product is saved in the database.
- If it's a variant, it's linked to its master product.
- If it's composed, references to its parts are stored.
- All master products should have at least 1 default variant.

#### b. Adding a New Part Choice (e.g., Rim Color)

- Marcus adds a new variant:
  - In the UI, Marcus selects the master product (e.g., a bike) and adds a new variant (e.g., rim color "green").
  - The new variant is created as a Product document with the appropriate variation attribute.
  - The master product's `variants` array is updated to include the new variant.

- Marcus adds a new combination to a composed product:
  - In the UI, Marcus chooses the categories and master products of a new available combination.
  - The composed product's `composed` array is updated to include the new possible combination.

#### c. Setting Prices

- Marcus can update the price of a master, variant or composed product via the admin UI.
- To specify special pricing for combinations:
  - Marcus creates or updates a variant included in a combined product.
  - The UI allows Marcus to specify which combinations are possible on a combined product.

---

### 4. UI and Backend Logic

#### Product Page UI

- Shows all available options (filtered by stock and business rules).
- Disables or hides prohibited combinations.
- Dynamically updates price as the user selects options.

#### Calculating Available Options

- The backend provides all variants/combinations.
- The frontend filters out-of-stock and prohibited combinations.
- The backend can also enforce these rules for security.

#### Calculating Price

- The backend calculates the price using the selected product and combination:
  - For composed products, sums the prices of all selected parts (based on selected variant prices).
  - For variants, uses the variant's price.

---

### 5. Security, Validation, and Technology

#### Backend:

- **Authentication:** JWT-based, with login and protected endpoints.
- **Authorization:** Role-based, using guards and decorators.
- **Validation:** All DTOs use `class-validator` for request validation; Mongoose schemas enforce required fields and types.
- **Tech Stack:** NestJS, Mongoose, TypeScript, bcrypt, JWT, class-validator, event-driven updates.

#### Frontend:
- **Next.js (App Router):** Main framework for SSR/SSG and routing.
- **React 19:** UI components and client-side interactivity.
- **TypeScript:** Type safety across the codebase.
- **Tailwind CSS:** Utility-first CSS for styling.
- **NextAuth.js v5:** Authentication and session management.
- **React Hook Form:** Form state management and validation.
- **Zod:** Schema validation for forms and API requests.
- **React Icons:** Iconography.
- **use-debounce:** Debounced input handling for search.

---

### 6. Summary Table of Main Collections

| Collection | Key Fields | Relationships | Purpose |
|------------|------------|---------------|---------|
| Category   | name, label, description, showInMenu | Has many Products | Organize products |
| Product    | sku, name, label, description, image, category, variationAttributes, listPrice, salesPrice, stock, productType, masterProduct, variants, composed | Belongs to Category, may have variants, may be composed | Sellable items and their options |
| User       | firstName, lastName, address, email, password, roles, cart | Cart references Products | Customers/admins, shopping cart |

---

**This model supports customizable products, variant management, composed builds, stock and price management, and secure, validated user actions.**
