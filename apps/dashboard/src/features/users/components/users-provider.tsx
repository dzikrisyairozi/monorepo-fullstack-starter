import { createContext, useContext, useState, type ReactNode } from 'react';
import { useDialogState } from '../../../hooks/use-dialog-state';
import { type User } from '../data/schema';

export type UsersDialogType = 'add' | 'edit' | 'delete' | 'invite';

type UsersContextValue = {
  open: UsersDialogType | null;
  setOpen: (dialog: UsersDialogType | null) => void;
  currentRow: User | null;
  setCurrentRow: (row: User | null) => void;
};

const UsersContext = createContext<UsersContextValue | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useDialogState<UsersDialogType>();
  const [currentRow, setCurrentRow] = useState<User | null>(null);

  return (
    <UsersContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}
