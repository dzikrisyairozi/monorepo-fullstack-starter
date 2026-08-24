import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from '@repo/i18n';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@repo/ui/components/ui/alert-dialog';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { cn } from '@repo/ui/lib/utils';

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description: ReactNode;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onConfirm: () => void;
  /** When set, Confirm stays disabled until the input matches this value exactly. */
  confirmationValue?: string;
  confirmationLabel?: string;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText,
  destructive,
  onConfirm,
  confirmationValue,
  confirmationLabel,
}: ConfirmDialogProps) {
  const { t } = useTranslation('dashboard');
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!open) {
      // Deferred to a microtask so this doesn't call setState
      // synchronously as the first statement of the effect body.
      queueMicrotask(() => setTyped(''));
    }
  }, [open]);

  const isConfirmDisabled =
    confirmationValue !== undefined && typed !== confirmationValue;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {confirmationValue !== undefined && (
          <div className="space-y-2">
            <Label htmlFor="confirm-dialog-input">
              {confirmationLabel ??
                t('confirmDialog.typeToConfirm', {
                  value: confirmationValue,
                })}
            </Label>
            <Input
              id="confirm-dialog-input"
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              autoComplete="off"
            />
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>
            {cancelText ?? t('confirmDialog.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            className={cn(
              destructive &&
                'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            )}
          >
            {confirmText ?? t('confirmDialog.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
