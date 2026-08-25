import { createFileRoute } from '@tanstack/react-router';
import { SignIn } from '../../features/auth/sign-in';
import { redirectSearchSchema } from '../../lib/redirect-search-schema';

export const Route = createFileRoute('/(auth)/sign-in')({
  validateSearch: redirectSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  return <SignIn redirectTo={redirect} />;
}
