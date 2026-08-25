import { createFileRoute } from '@tanstack/react-router';
import { SignIn2 } from '../../features/auth/sign-in/sign-in-2';
import { redirectSearchSchema } from '../../lib/redirect-search-schema';

export const Route = createFileRoute('/(auth)/sign-in-2')({
  validateSearch: redirectSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  return <SignIn2 redirectTo={redirect} />;
}
