import { z } from 'zod';

/**
 * Shared validateSearch schema for the sign-in routes' `redirect` param.
 * Not currently exploitable as an open redirect - this router's default
 * history has no configured rewrite, so `navigate({ to })` always resolves
 * `to` as a path against the route tree rather than treating it as an
 * external URL. Still constrained to a same-origin relative path, since
 * that stays true only as long as nobody adds a rewrite or reaches for
 * window.location instead of the router.
 */
export const redirectSearchSchema = z.object({
  redirect: z
    .string()
    .regex(/^\/(?!\/)/, 'must be a relative path')
    .optional()
    .catch(undefined),
});
