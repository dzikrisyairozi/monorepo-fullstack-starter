import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Ban,
  CircleCheck,
  CircleDashed,
  CircleDotDashed,
  Timer,
} from 'lucide-react';
import {
  TASK_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type TaskLabel,
  type TaskPriority,
  type TaskStatus,
} from './schema';

const statusIcons: Record<TaskStatus, typeof CircleCheck> = {
  backlog: CircleDashed,
  todo: CircleDotDashed,
  'in-progress': Timer,
  done: CircleCheck,
  canceled: Ban,
};

const priorityIcons: Record<TaskPriority, typeof ArrowUp> = {
  low: ArrowDown,
  medium: ArrowRight,
  high: ArrowUp,
};

export const taskStatusOptions = TASK_STATUSES.map((value) => ({
  value,
  icon: statusIcons[value],
}));

export const taskPriorityOptions = TASK_PRIORITIES.map((value) => ({
  value,
  icon: priorityIcons[value],
}));

export const taskLabelValues: readonly TaskLabel[] = TASK_LABELS;
