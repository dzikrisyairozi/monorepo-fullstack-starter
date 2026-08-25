import { afterEach, describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurrentUser } from './use-current-user';
import { sidebarData } from '../components/layout/data/sidebar-data';
import { useAuthStore } from '../stores/auth-store';

afterEach(() => {
  useAuthStore.getState().signOut();
});

describe('useCurrentUser', () => {
  it('falls back to the sidebar fixture when nobody is signed in', () => {
    const { result } = renderHook(() => useCurrentUser());
    expect(result.current).toEqual(sidebarData.user);
  });

  it('overrides name and email with the signed-in user, keeping the fixture avatar', () => {
    useAuthStore
      .getState()
      .signIn({ name: 'Alice Example', email: 'alice@corp.com' }, 'tok_1');

    const { result } = renderHook(() => useCurrentUser());
    expect(result.current).toEqual({
      name: 'Alice Example',
      email: 'alice@corp.com',
      avatar: sidebarData.user.avatar,
    });
  });
});
