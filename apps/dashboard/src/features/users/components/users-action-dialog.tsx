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
import { PasswordInput } from '../../../components/password-input';
import { SelectDropdown } from '../../../components/select-dropdown';
import { showSubmittedData } from '../../../lib/show-submitted-data';
import { USER_ROLES, USER_STATUSES, type User } from '../data/schema';

export function UsersActionDialog({
  open,
  onOpenChange,
  currentRow,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User | null;
}) {
  const { t } = useTranslation('dashboard');
  const isEdit = !!currentRow;

  const schema = useMemo(
    () =>
      z
        .object({
          username: z.string().min(1, t('validation.usernameRequired')),
          name: z.string().min(1, t('validation.nameRequired')),
          email: z
            .string()
            .min(1, t('validation.emailRequired'))
            .email(t('validation.emailInvalid')),
          phone: z.string().min(1, t('validation.phoneRequired')),
          role: z.enum(USER_ROLES, { message: t('validation.roleRequired') }),
          status: z.enum(USER_STATUSES, {
            message: t('validation.statusRequired'),
          }),
          password: isEdit
            ? z.string()
            : z.string().min(8, t('validation.passwordMinLength')),
          confirmPassword: isEdit
            ? z.string()
            : z.string().min(1, t('validation.passwordRequired')),
        })
        .refine(
          (values) => isEdit || values.password === values.confirmPassword,
          {
            message: t('validation.passwordsDoNotMatch'),
            path: ['confirmPassword'],
          },
        ),
    [t, isEdit],
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: currentRow?.username ?? '',
      name: currentRow?.name ?? '',
      email: currentRow?.email ?? '',
      phone: currentRow?.phone ?? '',
      role: currentRow?.role,
      status: currentRow?.status,
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        form.reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t('users.editUser') : t('users.addUser')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('users.editUserDescription')
              : t('users.addUserDescription')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="user-action-form"
            onSubmit={form.handleSubmit((values) => {
              showSubmittedData(
                values,
                isEdit ? t('users.editUser') : t('users.addUser'),
              );
              form.reset();
              onOpenChange(false);
            })}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('users.columns.username')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('users.columns.name')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('users.columns.email')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('users.columns.phone')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('users.columns.status')}</FormLabel>
                    <SelectDropdown
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('users.columns.status')}
                      items={USER_STATUSES.map((status) => ({
                        label: t(`users.status.${status}`),
                        value: status,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!isEdit && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('signIn.password')}</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('signUp.confirmPassword')}</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="user-action-form">
            {t('users.saveChanges')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
