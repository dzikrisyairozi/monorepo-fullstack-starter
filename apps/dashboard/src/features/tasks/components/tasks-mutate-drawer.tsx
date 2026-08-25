import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@repo/ui/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { SelectDropdown } from '../../../components/select-dropdown';
import { showSubmittedData } from '../../../lib/show-submitted-data';
import {
  TASK_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
} from '../data/schema';

export function TasksMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Task | null;
}) {
  const { t } = useTranslation('dashboard');
  const isEdit = !!currentRow;

  const schema = useMemo(
    () =>
      z.object({
        title: z.string().min(1, t('validation.titleRequired')),
        status: z.enum(TASK_STATUSES, {
          message: t('validation.statusRequired'),
        }),
        label: z.enum(TASK_LABELS, { message: t('validation.labelRequired') }),
        priority: z.enum(TASK_PRIORITIES, {
          message: t('validation.priorityRequired'),
        }),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: currentRow?.title ?? '',
      status: currentRow?.status,
      label: currentRow?.label,
      priority: currentRow?.priority,
    },
  });

  return (
    <Drawer
      open={open}
      onOpenChange={(next) => {
        form.reset();
        onOpenChange(next);
      }}
      direction="right"
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {isEdit ? t('tasks.editTask') : t('tasks.createTask')}
          </DrawerTitle>
          <DrawerDescription>
            {isEdit
              ? t('tasks.editTaskDescription')
              : t('tasks.createTaskDescription')}
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            id="task-mutate-form"
            onSubmit={form.handleSubmit((values) => {
              showSubmittedData(
                values,
                isEdit ? t('tasks.editTask') : t('tasks.createTask'),
              );
              form.reset();
              onOpenChange(false);
            })}
            className="flex-1 space-y-4 overflow-y-auto px-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tasks.columns.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tasks.columns.status')}</FormLabel>
                  <SelectDropdown
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder={t('tasks.columns.status')}
                    items={TASK_STATUSES.map((status) => ({
                      label: t(`tasks.status.${status}`),
                      value: status,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tasks.label.label')}</FormLabel>
                  <SelectDropdown
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder={t('tasks.label.label')}
                    items={TASK_LABELS.map((label) => ({
                      label: t(`tasks.label.${label}`),
                      value: label,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tasks.columns.priority')}</FormLabel>
                  <SelectDropdown
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder={t('tasks.columns.priority')}
                    items={TASK_PRIORITIES.map((priority) => ({
                      label: t(`tasks.priority.${priority}`),
                      value: priority,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DrawerFooter>
          <Button type="submit" form="task-mutate-form">
            {t('users.saveChanges')}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">{t('confirmDialog.cancel')}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
