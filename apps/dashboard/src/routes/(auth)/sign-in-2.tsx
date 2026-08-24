import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { SignIn2 } from '../../features/auth/sign-in/sign-in-2';

const signIn2SearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/(auth)/sign-in-2')({
  validateSearch: signIn2SearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  return <SignIn2 redirectTo={redirect} />;
}
