import { toast } from 'sonner';
import { i18n } from '@repo/i18n';

function extractMessage(error: unknown): string | undefined {
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }
  return undefined;
}

function extractStatus(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null) {
    return undefined;
  }
  const candidate = error as { status?: unknown; statusCode?: unknown };
  const status = candidate.status ?? candidate.statusCode;
  return typeof status === 'number' ? status : undefined;
}

export function handleServerError(error: unknown) {
  const status = extractStatus(error);

  if (status === 401) {
    toast.error(i18n.t('errors.sessionExpired'));
    return;
  }

  const message = extractMessage(error);
  toast.error(message || i18n.t('errors.genericFallback'));
}
