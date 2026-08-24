import { create } from 'zustand';
import { getCookie, removeCookie, setCookie } from '../lib/cookies';

export const AUTH_TOKEN_COOKIE_NAME = 'auth_token';
const AUTH_TOKEN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: getCookie(AUTH_TOKEN_COOKIE_NAME),
  signIn: (user, accessToken) => {
    setCookie(AUTH_TOKEN_COOKIE_NAME, accessToken, AUTH_TOKEN_COOKIE_MAX_AGE);
    set({ user, accessToken });
  },
  signOut: () => {
    removeCookie(AUTH_TOKEN_COOKIE_NAME);
    set({ user: null, accessToken: null });
  },
}));
