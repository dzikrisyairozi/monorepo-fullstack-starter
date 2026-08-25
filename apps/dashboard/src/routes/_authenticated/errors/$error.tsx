import { createFileRoute } from '@tanstack/react-router';
import { UnauthorizedError } from '../../../features/errors/unauthorized-error';
import { Forbidden } from '../../../features/errors/forbidden';
import { NotFoundError } from '../../../features/errors/not-found-error';
import { GeneralError } from '../../../features/errors/general-error';
import { MaintenanceError } from '../../../features/errors/maintenance-error';

const ERROR_COMPONENTS = {
  '401': UnauthorizedError,
  '403': Forbidden,
  '404': NotFoundError,
  '500': GeneralError,
  '503': MaintenanceError,
} as const;

export const Route = createFileRoute('/_authenticated/errors/$error')({
  component: RouteComponent,
});

function RouteComponent() {
  const { error } = Route.useParams();
  const ErrorComponent =
    ERROR_COMPONENTS[error as keyof typeof ERROR_COMPONENTS] ?? NotFoundError;

  return <ErrorComponent />;
}
