# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/shopify
   ```
   Or use MongoDB Atlas:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopify
   ```

3. **Seed Sample Products (Optional)**
   ```bash
   npm run seed
   ```
   This will add 6 sample products to your database.

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features

### Shopping Cart
- Add products to cart from the home page
- View cart with all items
- Update item quantities
- Remove items from cart
- See total price calculation

### Wishlist
- Add products to wishlist (heart icon)
- View all wishlisted items
- Remove items from wishlist
- Quick add to cart from wishlist

### Navigation
- Sticky navigation bar
- Real-time cart and wishlist count badges
- Quick access to cart and wishlist pages

## Architecture

### SOLID Principles Implementation

1. **Single Responsibility Principle (SRP)**
   - Each repository handles one entity type
   - Server actions are separated by domain (cart, wishlist, product)
   - Components have single, focused responsibilities

2. **Open/Closed Principle (OCP)**
   - Repository pattern allows extension without modification
   - Component composition enables flexible UI

3. **Liskov Substitution Principle (LSP)**
   - Repository interfaces can be swapped with different implementations
   - Component props follow consistent interfaces

4. **Interface Segregation Principle (ISP)**
   - Focused interfaces for each concern
   - Models are specific to their use cases

5. **Dependency Inversion Principle (DIP)**
   - High-level modules depend on abstractions (repositories)
   - Dependencies are injected through constructors

## File Structure

```
├── app/
│   ├── actions/              # Server Actions (not API routes)
│   │   ├── cart.actions.ts
│   │   ├── wishlist.actions.ts
│   │   └── product.actions.ts
│   ├── cart/                 # Cart page
│   │   └── page.tsx
│   ├── wishlist/             # Wishlist page
│   │   └── page.tsx
│   ├── layout.tsx            # Root layout with navigation
│   ├── page.tsx              # Home page with products
│   └── globals.css           # Global styles with color scheme
├── components/
│   ├── ui/                   # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── toast.tsx
│   ├── ProductCard.tsx       # Product display component
│   ├── CartItem.tsx          # Cart item component
│   ├── WishlistItem.tsx      # Wishlist item component
│   └── Navigation.tsx        # Navigation bar
├── lib/
│   ├── db/
│   │   ├── models/           # TypeScript interfaces
│   │   │   ├── product.model.ts
│   │   │   ├── cart.model.ts
│   │   │   └── wishlist.model.ts
│   │   └── repositories/     # Data access layer
│   │       ├── product.repository.ts
│   │       ├── cart.repository.ts
│   │       └── wishlist.repository.ts
│   ├── mongodb.ts            # MongoDB connection
│   └── utils.ts              # Utility functions
├── hooks/
│   └── use-toast.ts          # Toast notification hook
└── scripts/
    └── seed-products.ts      # Database seeding script
```

## Color Scheme

The application uses a blue, gray, and black color scheme:
- **Primary**: Blue (`hsl(217, 91%, 60%)`)
- **Secondary**: Gray (`hsl(0, 0%, 96%)`)
- **Background**: White/Black (light/dark mode support)
- **Foreground**: Black/White (text colors)

## Database Collections

### Products
```typescript
{
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Carts
```typescript
{
  userId: string;
  items: Array<{
    productId: ObjectId;
    quantity: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
```

### Wishlists
```typescript
{
  userId: string;
  productIds: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
```

## Notes

- Currently uses a static `userId` for demo purposes (`'user-1'`)
- In production, integrate with authentication (NextAuth.js, Clerk, etc.)
- Image URLs should be valid or the component will show a placeholder
- All server actions use `'use server'` directive
- No API routes - everything uses Server Actions


