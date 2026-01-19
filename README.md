# E-Commerce Application with Social Timeline

A modern, full-stack e-commerce platform built with Next.js 15, featuring product management, shopping cart functionality, and an integrated social timeline for user interactions.

## 🚀 Features

### E-Commerce Functionality

- **Product Management**: Full CRUD operations for products (Create, Read, Update, Delete)
- **Shopping Cart**: Add to cart, manage quantities, and calculate totals
- **User Authentication**: Secure login/logout with JWT tokens and refresh token mechanism
- **Protected Routes**: Middleware-based route protection for authenticated users

### Social Features

- **Timeline/Feed**: Social media-style timeline for user posts
- **Post Interactions**: Like posts
- **User Posts**: Create, update, and manage personal posts
- **Real-time Updates**: React Query for optimized data fetching and caching

## 🛠️ Tech Stack

### Core Framework

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Lucide React** - Beautiful icon library

### State Management & Data Fetching

- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form validation and management

### Development Tools

- **ESLint** - Code linting with auto-import sorting
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **Jest** - Unit testing framework
- **TypeScript** - Static type checking

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (login, logout, etc.)
│   ├── (user)/            # User-facing pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── screens/           # Page-level components
│   │   ├── Timeline.tsx
│   │   ├── ProductsCart.tsx
│   │   ├── UserPosts.tsx
│   │   └── ...
│   └── ui/                # Reusable UI components
├── lib/
│   ├── axios.ts           # Axios configuration
│   ├── mutations.ts       # React Query mutations
│   └── queries.ts         # React Query queries
├── constant/              # App constants
└── styles/                # Global styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd ts-nextjs-tailwind-starter
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors and format code
pnpm typecheck    # Run TypeScript type checking
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm format       # Format code with Prettier
```

## 🔐 Authentication Flow

This application uses a JWT-based authentication system with refresh tokens:

1. **Login**: User credentials are sent to `/api/login`
2. **Token Storage**: Access token and refresh token stored in cookies
3. **Protected Routes**: Middleware checks authentication status
4. **Token Refresh**: Automatic token refresh using refresh token
5. **Logout**: Clears tokens and redirects to login

## 📊 Data Fetching Strategy

The app uses **React Query** with server-side rendering:

- **Server Components**: Prefetch data using `prefetchQuery`
- **Hydration**: Dehydrate server state and pass to client
- **Client Components**: Rehydrate and consume cached data
- **Optimistic Updates**: Immediate UI updates with background revalidation

## 🎨 Styling Approach

- **Tailwind CSS**: Utility-first styling
- **DaisyUI**: Pre-built component themes
- **CSS Variables**: Custom color schemes
- **Responsive Design**: Mobile-first approach

## 🧪 Testing

Unit tests are configured with Jest and React Testing Library:

```bash
pnpm test        # Run all tests
pnpm test:watch  # Run tests in watch mode
```

## 📝 Code Quality

- **ESLint**: Enforces code quality and consistency
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for linting and formatting
- **TypeScript**: Strict type checking
- **Conventional Commits**: Standardized commit messages

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Other Platforms

Build the production bundle:

```bash
pnpm build
pnpm start
```

## 🔄 Recent Updates

- ✅ Implemented refresh token authentication with cookies
- ✅ Fixed TypeScript type errors in Timeline and Product components
- ✅ Added React Query hydration for optimized data fetching
- ✅ Implemented CRUD operations for products and posts
- ✅ Added shopping cart with total calculation using reduce method
- ✅ Fixed token type handling across components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built on top of [ts-nextjs-tailwind-starter](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter) by Theodorus Clarence
- Icons by [Lucide](https://lucide.dev/)
- UI components by [DaisyUI](https://daisyui.com/)

---

**Note**: This is an active development project. Features and documentation are continuously being updated.
