import { UsersActionDialog } from './users-action-dialog';
import { UsersDeleteDialog } from './users-delete-dialog';
import { UsersInviteDialog } from './users-invite-dialog';
import { useUsers } from './users-provider';

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers();

  return (
    <>
      <UsersActionDialog
        key="user-add"
        open={open === 'add'}
        onOpenChange={(next) => setOpen(next ? 'add' : null)}
        currentRow={null}
      />
      <UsersInviteDialog
        key="user-invite"
        open={open === 'invite'}
        onOpenChange={(next) => setOpen(next ? 'invite' : null)}
      />
      {currentRow && (
        <>
          <UsersActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(next) => {
              setOpen(next ? 'edit' : null);
              if (!next) {
                setTimeout(() => setCurrentRow(null), 300);
              }
            }}
            currentRow={currentRow}
          />
          <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
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
