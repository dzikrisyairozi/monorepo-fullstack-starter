import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { SelectDropdown } from '../../../components/select-dropdown';
import { showSubmittedData } from '../../../lib/show-submitted-data';
import { USER_ROLES } from '../data/schema';

export function UsersInviteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation('dashboard');

  const schema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, t('validation.emailRequired'))
          .email(t('validation.emailInvalid')),
        role: z.enum(USER_ROLES, { message: t('validation.roleRequired') }),
        message: z.string(),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', role: undefined, message: '' },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        form.reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('users.inviteUser')}</DialogTitle>
          <DialogDescription>
            {t('users.inviteUserDescription')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="user-invite-form"
            onSubmit={form.handleSubmit((values) => {
              showSubmittedData(values, t('users.inviteUser'));
              form.reset();
              onOpenChange(false);
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('users.columns.email')}</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('users.columns.role')}</FormLabel>
                  <SelectDropdown
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder={t('users.columns.role')}
                    items={USER_ROLES.map((role) => ({
                      label: t(`users.role.${role}`),
                      value: role,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('users.inviteMessage')}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder={t('users.inviteMessagePlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="user-invite-form">
            {t('users.inviteUser')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
