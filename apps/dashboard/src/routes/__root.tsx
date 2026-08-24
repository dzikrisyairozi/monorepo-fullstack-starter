import { Outlet, createRootRoute } from '@tanstack/react-router';
import { NavigationProgress } from '../components/navigation-progress';
import { GeneralError } from '../features/errors/general-error';
import { NotFoundError } from '../features/errors/not-found-error';

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col font-sans antialiased">
      <NavigationProgress />
      <Outlet />
    </div>
  ),
  errorComponent: GeneralError,
  notFoundComponent: NotFoundError,
});
