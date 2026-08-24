import { Outlet, createRootRoute, Link } from '@tanstack/react-router';
import { NavigationProgress } from '../components/navigation-progress';

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col font-sans antialiased">
      <NavigationProgress />
      <Outlet />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        {error instanceof Error
          ? error.message
          : 'An unexpected error occurred.'}
      </p>
      <Link to="/" className="text-sm font-medium text-primary hover:underline">
        Back to home
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="text-sm font-medium text-primary hover:underline">
        Back to home
      </Link>
    </div>
  ),
});
