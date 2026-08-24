import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { SignIn } from '../../features/auth/sign-in';

const signInSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/(auth)/sign-in')({
  validateSearch: signInSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  return <SignIn redirectTo={redirect} />;
}
