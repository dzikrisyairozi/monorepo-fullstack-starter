import { createContext, useContext, useState, type ReactNode } from 'react';
import { useDialogState } from '../../../hooks/use-dialog-state';
import { type Task } from '../data/schema';

export type TasksDialogType = 'create' | 'edit' | 'delete' | 'import';

type TasksContextValue = {
  open: TasksDialogType | null;
  setOpen: (dialog: TasksDialogType | null) => void;
  currentRow: Task | null;
  setCurrentRow: (row: Task | null) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useDialogState<TasksDialogType>();
  const [currentRow, setCurrentRow] = useState<Task | null>(null);

  return (
    <TasksContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </TasksContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
