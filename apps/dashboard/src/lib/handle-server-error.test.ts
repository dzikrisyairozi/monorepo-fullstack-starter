import { describe, expect, it, vi } from 'vitest';
import { toast } from 'sonner';
import { handleServerError } from './handle-server-error';

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

describe('handleServerError', () => {
  it('shows a string error verbatim', () => {
    handleServerError('Network unreachable');
    expect(toast.error).toHaveBeenCalledWith('Network unreachable');
  });

  it('shows an Error instance message', () => {
    handleServerError(new Error('Boom'));
    expect(toast.error).toHaveBeenCalledWith('Boom');
  });

  it('shows a plain object with a message field', () => {
    handleServerError({ message: 'Validation failed' });
    expect(toast.error).toHaveBeenCalledWith('Validation failed');
  });

  it('shows a dedicated, translated message for a 401 status', () => {
    handleServerError({ status: 401, message: 'unauthorized' });
    expect(toast.error).toHaveBeenCalledWith(
      'Your session has expired. Please sign in again.',
    );
  });

  it('falls back to a translated generic message for an unknown shape', () => {
    handleServerError(null);
    expect(toast.error).toHaveBeenCalledWith(
      'Something went wrong. Please try again.',
    );
  });
});
