import { afterEach, describe, expect, it } from 'vitest';
import { AUTH_TOKEN_COOKIE_NAME, useAuthStore } from './auth-store';
import { getCookie } from '../lib/cookies';

afterEach(() => {
  useAuthStore.getState().signOut();
});

describe('useAuthStore', () => {
  it('starts signed out', () => {
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().accessToken).toBeNull();
  });

  it('signIn sets user, accessToken, and the auth cookie', () => {
    useAuthStore
      .getState()
      .signIn(
        { name: 'Dzikri Syairozi', email: 'hello@example.com' },
        'tok_123',
      );

    expect(useAuthStore.getState().user?.name).toBe('Dzikri Syairozi');
    expect(useAuthStore.getState().accessToken).toBe('tok_123');
    expect(getCookie(AUTH_TOKEN_COOKIE_NAME)).toBe('tok_123');
  });

  it('signOut clears user, accessToken, and the auth cookie', () => {
    useAuthStore
      .getState()
      .signIn(
        { name: 'Dzikri Syairozi', email: 'hello@example.com' },
        'tok_123',
      );

    useAuthStore.getState().signOut();

    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().accessToken).toBeNull();
    expect(getCookie(AUTH_TOKEN_COOKIE_NAME)).toBeNull();
  });
});
