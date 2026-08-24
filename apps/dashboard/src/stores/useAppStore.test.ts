import { describe, expect, it } from 'vitest';
import { useAppStore } from './useAppStore';

describe('useAppStore', () => {
  it('starts with the sidebar closed', () => {
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });

  it('toggleSidebar flips sidebarOpen', () => {
    const { toggleSidebar } = useAppStore.getState();

    toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(true);

    toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });

  it('setSidebarOpen sets the value directly', () => {
    useAppStore.getState().setSidebarOpen(true);
    expect(useAppStore.getState().sidebarOpen).toBe(true);

    useAppStore.getState().setSidebarOpen(false);
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });
});
