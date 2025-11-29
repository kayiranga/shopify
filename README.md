# Shopify E-commerce Store

A modern e-commerce application built with Next.js 14, MongoDB, and shadcn/ui components.

## Features

- 🛒 Shopping cart functionality
- ❤️ Wishlist management
- ➕ Product creation with image upload (Cloudinary)
- 🎨 Modern UI with shadcn/ui components
- 🎯 Server Actions (no API routes)
- 📦 MongoDB database integration
- 🏗️ SOLID principles architecture

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Color Scheme**: Blue, Gray, and Black

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

See [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md) for detailed Cloudinary setup instructions.

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

The application uses MongoDB collections:
- `products` - Product catalog
- `carts` - User shopping carts
- `wishlists` - User wishlists

### Sample Product Document

```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Electronics",
  "stock": 10,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Project Structure

```
├── app/
│   ├── actions/          # Server actions
│   ├── cart/             # Cart page
│   ├── wishlist/         # Wishlist page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── ProductCard.tsx
│   ├── CartItem.tsx
│   ├── WishlistItem.tsx
│   └── Navigation.tsx
├── lib/
│   ├── db/               # Database models and repositories
│   ├── mongodb.ts        # MongoDB connection
│   └── utils.ts          # Utility functions
└── hooks/                # React hooks
```

## Architecture

The codebase follows SOLID principles:

- **Single Responsibility**: Each repository handles one entity type
- **Open/Closed**: Extensible through interfaces
- **Liskov Substitution**: Repository pattern allows easy swapping
- **Interface Segregation**: Focused interfaces for each concern
- **Dependency Inversion**: Dependencies injected through constructors

## Features in Detail

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- View cart total

### Wishlist
- Add products to wishlist
- Remove from wishlist
- Quick add to cart from wishlist

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## License

MIT


