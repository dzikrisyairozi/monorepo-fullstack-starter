import { useState, type Dispatch, type SetStateAction } from 'react';

/**
 * Tracks which single dialog (by name) is open at a time - common for
 * tables that need separate create/edit/delete/invite dialogs where
 * only one should ever be open.
 */
export function useDialogState<T extends string>(
  initialValue: T | null = null,
): [T | null, Dispatch<SetStateAction<T | null>>] {
  return useState<T | null>(initialValue);
}
