import { z } from 'zod';

export const TASK_STATUSES = [
  'backlog',
  'todo',
  'in-progress',
  'done',
  'canceled',
] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_LABELS = ['bug', 'feature', 'documentation'] as const;
export type TaskLabel = (typeof TASK_LABELS)[number];

export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(TASK_STATUSES),
  label: z.enum(TASK_LABELS),
  priority: z.enum(TASK_PRIORITIES),
});

export type Task = z.infer<typeof taskSchema>;

export const taskListSchema = z.array(taskSchema);
