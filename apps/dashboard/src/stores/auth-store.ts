import { create } from 'zustand';
import { getCookie, removeCookie, setCookie } from '../lib/cookies';

export const AUTH_TOKEN_COOKIE_NAME = 'auth_token';
const AUTH_USER_COOKIE_NAME = 'auth_user';
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export type AuthUser = {
  email: string;
  name: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  signIn: (user: AuthUser, accessToken: string) => void;
  signOut: () => void;
};

function readPersistedUser(): AuthUser | null {
  const raw = getCookie(AUTH_USER_COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      typeof (parsed as AuthUser).name === 'string' &&
      typeof (parsed as AuthUser).email === 'string'
    ) {
      return parsed as AuthUser;
    }
  } catch {
    // fall through to null below
  }
  return null;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: readPersistedUser(),
  accessToken: getCookie(AUTH_TOKEN_COOKIE_NAME),
  signIn: (user, accessToken) => {
    setCookie(AUTH_TOKEN_COOKIE_NAME, accessToken, AUTH_COOKIE_MAX_AGE);
    setCookie(AUTH_USER_COOKIE_NAME, JSON.stringify(user), AUTH_COOKIE_MAX_AGE);
    set({ user, accessToken });
  },
  signOut: () => {
    removeCookie(AUTH_TOKEN_COOKIE_NAME);
    removeCookie(AUTH_USER_COOKIE_NAME);
    set({ user: null, accessToken: null });
  },
}));
