import {
  TASK_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
  type TaskLabel,
  type TaskPriority,
  type TaskStatus,
} from '../data/schema';

const REQUIRED_COLUMNS = ['title', 'status', 'label', 'priority'] as const;

export type ParseTasksCsvError =
  | { code: 'empty' }
  | { code: 'missingColumns'; columns: string }
  | { code: 'noDataRows' }
  | {
      code: 'columnCountMismatch';
      row: number;
      expected: number;
      found: number;
    }
  | { code: 'titleRequired'; row: number }
  | { code: 'invalidStatus'; row: number; value: string }
  | { code: 'invalidLabel'; row: number; value: string }
  | { code: 'invalidPriority'; row: number; value: string };

export type ParseTasksCsvResult =
  | { ok: true; rows: Omit<Task, 'id'>[] }
  | { ok: false; error: ParseTasksCsvError };

function isTaskStatus(value: string): value is TaskStatus {
  return (TASK_STATUSES as readonly string[]).includes(value);
}

function isTaskLabel(value: string): value is TaskLabel {
  return (TASK_LABELS as readonly string[]).includes(value);
}

function isTaskPriority(value: string): value is TaskPriority {
  return (TASK_PRIORITIES as readonly string[]).includes(value);
}

export function parseTasksCsv(content: string): ParseTasksCsvResult {
  const lines = content
    .split(/\r\n|\n/)
    .filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    return { ok: false, error: { code: 'empty' } };
  }

  const header = lines[0].split(',').map((cell) => cell.trim().toLowerCase());
  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => !header.includes(column),
  );
  if (missingColumns.length > 0) {
    return {
      ok: false,
      error: { code: 'missingColumns', columns: missingColumns.join(', ') },
    };
  }

  const dataLines = lines.slice(1);
  if (dataLines.length === 0) {
    return { ok: false, error: { code: 'noDataRows' } };
  }

  const rows: Omit<Task, 'id'>[] = [];

  for (let i = 0; i < dataLines.length; i++) {
    const row = i + 2;
    const cells = dataLines[i].split(',').map((cell) => cell.trim());

    if (cells.length !== header.length) {
      return {
        ok: false,
        error: {
          code: 'columnCountMismatch',
          row,
          expected: header.length,
          found: cells.length,
        },
      };
    }

    const record: Record<string, string> = {};
    header.forEach((column, index) => {
      record[column] = cells[index];
    });

    if (!record.title) {
      return { ok: false, error: { code: 'titleRequired', row } };
    }

    const status = record.status.toLowerCase();
    if (!isTaskStatus(status)) {
      return {
        ok: false,
        error: { code: 'invalidStatus', row, value: record.status },
      };
    }

    const label = record.label.toLowerCase();
    if (!isTaskLabel(label)) {
      return {
        ok: false,
        error: { code: 'invalidLabel', row, value: record.label },
      };
    }

    const priority = record.priority.toLowerCase();
    if (!isTaskPriority(priority)) {
      return {
        ok: false,
        error: { code: 'invalidPriority', row, value: record.priority },
      };
    }

    rows.push({ title: record.title, status, label, priority });
  }

  return { ok: true, rows };
}
