import { TasksDeleteDialog } from './tasks-delete-dialog';
import { TasksImportDialog } from './tasks-import-dialog';
import { TasksMutateDrawer } from './tasks-mutate-drawer';
import { useTasks } from './tasks-provider';

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks();

  return (
    <>
      <TasksMutateDrawer
        key="task-create"
        open={open === 'create'}
        onOpenChange={(next) => setOpen(next ? 'create' : null)}
        currentRow={null}
      />
      <TasksImportDialog
        key="task-import"
        open={open === 'import'}
        onOpenChange={(next) => setOpen(next ? 'import' : null)}
      />
      {currentRow && (
        <>
          <TasksMutateDrawer
            key={`task-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(next) => {
              setOpen(next ? 'edit' : null);
              if (!next) {
                setTimeout(() => setCurrentRow(null), 300);
              }
            }}
            currentRow={currentRow}
          />
          <TasksDeleteDialog
            key={`task-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={(next) => {
              setOpen(next ? 'delete' : null);
              if (!next) {
                setTimeout(() => setCurrentRow(null), 300);
              }
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  );
}
