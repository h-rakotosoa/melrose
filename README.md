# Melrose - Enterprise React Application

A modern, scalable React application built with a feature-first architecture and ready for micro-frontend evolution.

## Tech Stack

- **Framework**: React 18 + TypeScript (strict mode)
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **HTTP Client**: Axios with interceptors
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Architecture Overview

### Shell + Modules Pattern

This application follows a **Shell + Modules** architecture that enables:

- **Modular development**: Each feature is isolated in its own module
- **Scalability**: Easy to add new modules without affecting existing ones
- **MFE-ready**: Modules can be extracted into micro-frontends later
- **Team autonomy**: Different teams can work on different modules independently

### Directory Structure

```
src/
├── applications/          # Shell (shared infrastructure)
│   ├── components/
│   │   ├── ui/           # UI component library
│   │   └── common/       # Common components (ProtectedRoute, ErrorBoundary)
│   ├── layouts/          # Layout components (AppLayout, AuthLayout)
│   ├── contracts/        # Stable contracts for modules
│   ├── hooks/            # Shared hooks
│   ├── utils/            # Utilities (axios, storage, jwt, moduleRegistry)
│   ├── config/           # Configuration (env, federation)
│   └── provider/         # App providers
├── core/                 # Core business logic
│   └── auth/            # Authentication (store, service, hooks)
├── modules/              # Feature modules
│   ├── auth/            # Auth module (login)
│   ├── dashboard/       # Dashboard module
│   └── users/           # Users module
└── routes/              # Central routing
```

### Key Principles

1. **Feature-First**: Organize by features, not by technical layers
2. **Module Independence**: Modules don't depend on each other
3. **Stable Contracts**: Modules only consume shell contracts
4. **Mobile-First**: All UI is responsive and touch-friendly
5. **Type Safety**: Strict TypeScript with no `any` types

## Authentication System

### JWT Token Flow

The app implements a robust JWT authentication system with automatic token refresh:

1. **Login**: User provides credentials → receives `accessToken` + `refreshToken`
2. **Storage**: Tokens stored in localStorage
3. **Auto-refresh**: Token automatically refreshed 30s before expiration
4. **Interceptors**: Axios interceptors handle 401 errors and retry requests
5. **Logout**: Clears tokens and redirects to login

### Refresh Token Queue

When multiple requests fail with 401:
- Only one refresh request is made
- Other requests wait in a queue
- All queued requests retry after successful refresh
- If refresh fails, user is logged out

## Mobile-First Design

### Principles

1. **Touch targets**: Minimum 44px for all interactive elements
2. **Breakpoints**:
   - Mobile: default (320px+)
   - Tablet: md (768px+)
   - Desktop: lg (1024px+)
3. **No hover dependence**: All interactions work on touch
4. **Responsive navigation**:
   - Mobile: Hamburger menu → Drawer
   - Desktop: Fixed sidebar

### DataTable Component

The `DataTable` component is fully responsive:

- **Desktop**: Traditional table with columns
- **Mobile (default)**: Card-based layout with label/value pairs
- **Mobile (scroll)**: Horizontal scrollable table

```tsx
<DataTable
  columns={columns}
  data={data}
  keyExtractor={(item) => item.id}
  mobileVariant="cards" // or "scroll"
/>
```

## Module System

### Module Registry

The `moduleRegistry` manages all modules and provides:

- Registration of local modules
- Route aggregation
- (Future) Remote module loading for MFE

### Creating a New Module

1. Create module directory: `src/modules/my-module/`

2. Create routes with metadata:

```typescript
// src/modules/my-module/routes/my-module.routes.ts
import { RouteObject } from 'react-router-dom';
import { MyModulePage } from '../pages/MyModulePage';
import { RouteMeta } from '@app/contracts/types.contract';

export const myModuleRoutes: RouteObject[] = [
  {
    path: '/my-module',
    element: <MyModulePage />,
    meta: {
      title: 'My Module',
      icon: 'Box', // Lucide icon name
      requiresAuth: true,
      showInMenu: true,
      order: 10,
    } as RouteMeta,
  },
];
```

3. Create module definition:

```typescript
// src/modules/my-module/index.ts
import { ModuleDefinition } from '@app/utils/moduleRegistry';
import { myModuleRoutes } from './routes/my-module.routes';

export const myModule: ModuleDefinition = {
  name: 'my-module',
  routes: myModuleRoutes,
};
```

4. Register in router:

```typescript
// src/routes/router.tsx
import { myModule } from '@modules/my-module';

moduleRegistry.registerLocalModule('my-module', myModule);
```

### Menu Auto-Generation

The sidebar and mobile drawer menus are **automatically generated** from route metadata:

- Routes with `showInMenu: true` appear in navigation
- Routes are sorted by `order` field
- Icons are rendered from Lucide React icons
- Active state is automatically highlighted

## Import Aliases

Use these aliases for clean imports:

```typescript
import { Button } from '@app/components/ui/Button';
import { usersService } from '@modules/users/services/users.service';
import { useAuth } from '@core/auth/useAuth';
```

## Contracts System

Modules consume stable contracts from the shell:

### UI Contract

```typescript
import { Button, TextField, DataTable } from '@app/contracts/ui.contract';
```

### HTTP Contract

```typescript
import { httpContract } from '@app/contracts/http.contract';

const response = await httpContract.client.get('/api/data');
```

### Auth Contract

```typescript
import { createAuthContract } from '@app/contracts/auth.contract';

const authContract = createAuthContract(
  getAccessToken,
  getUser,
  isAuthenticated,
  logout
);
```

## Micro-Frontend Support

### Current State: MFE-Ready

The application is structured to support Module Federation but it's currently **disabled**.

Configuration in `src/applications/config/federation.ts`:

```typescript
export const federationEnabled = false;

export const remotes = {
  // users: 'http://localhost:3001/assets/remoteEntry.js',
};

export const shared = {
  react: { singleton: true, requiredVersion: '^18.3.1' },
  'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
  // ...
};
```

### Enabling Module Federation

1. Set `federationEnabled = true` in `federation.ts`
2. Add remote URLs in `remotes` object
3. Restart dev server
4. Modules will be loaded dynamically from remotes

### Converting a Module to Remote

1. Create new Vite project for the module
2. Configure as remote in `vite.config.ts`
3. Expose module entry point
4. Register remote URL in host app
5. Remove local module from host

## Development

### Setup

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure your API URL:

```
VITE_API_URL=http://localhost:4000/api
```

### Run Development Server

```bash
npm run dev
```

App runs on `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Demo Credentials

```
Email: admin@melrose.com
Password: password123
```

Note: Authentication requires a backend API. The app currently shows validation but won't authenticate without a proper API.

## Testing on Mobile

1. Start dev server: `npm run dev`
2. Find your local IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
3. Open `http://YOUR_IP:3000` on mobile device
4. Test all interactions and responsive behavior

## Code Style

- **No comments**: Code should be self-documenting
- **No `any` types**: Use proper TypeScript types
- **Named exports**: Prefer named over default exports
- **Barrel exports**: Use `index.ts` for clean imports
- **Component co-location**: Keep related components close

## Best Practices

### Pages and Data Fetching

- Pages use services, never direct axios calls
- Services use the `httpContract.client`
- Store data fetching logic in services or stores
- Handle loading and error states in pages

### Component Organization

- Page-specific components: `modules/<module>/pages/<page>/components/`
- Shared module components: `modules/<module>/components/`
- UI components: `applications/components/ui/`
- Common components: `applications/components/common/`

### State Management

- **Local state**: `useState` for component-specific state
- **Shared state**: Zustand stores for module-level state
- **Auth state**: Core auth store (globally accessible)
- **Form state**: React Hook Form for form state

## Security

- Tokens stored in localStorage (consider httpOnly cookies for production)
- Refresh token rotation supported
- Automatic logout on token expiration
- Protected routes check authentication
- No sensitive data in error messages

## Performance

- Code splitting with React Router
- Lazy loading ready (can add React.lazy)
- Optimized bundle with Vite
- Minimal re-renders with Zustand

## Future Enhancements

- [ ] Enable Module Federation
- [ ] Extract modules to separate apps
- [ ] Add unit tests (Vitest)
- [ ] Add E2E tests (Playwright)
- [ ] Add Storybook for components
- [ ] Implement optimistic updates
- [ ] Add offline support (PWA)
- [ ] Add i18n support

## Troubleshooting

### TypeScript Errors

- Ensure `strict: true` in `tsconfig.json`
- Run `npm run build` to check for type errors
- Check import aliases are configured correctly

### Module Not Found

- Verify path aliases in `tsconfig.json` and `vite.config.ts`
- Check module is registered in `router.tsx`
- Ensure barrel exports (`index.ts`) are created

### Authentication Issues

- Check `VITE_API_URL` in `.env`
- Verify backend API is running
- Check browser console for errors
- Clear localStorage and retry

## License

MIT

## Support

For questions or issues, please open an issue on GitHub.