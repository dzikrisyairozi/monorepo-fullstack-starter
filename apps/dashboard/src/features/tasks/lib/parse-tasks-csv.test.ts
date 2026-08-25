import { describe, expect, it } from 'vitest';
import { parseTasksCsv } from './parse-tasks-csv';

describe('parseTasksCsv', () => {
  it('parses a well-formed CSV into the expected rows', () => {
    const csv = [
      'title,status,label,priority',
      'Fix the login bug,todo,bug,high',
      'Write API docs,backlog,documentation,low',
    ].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: true,
      rows: [
        {
          title: 'Fix the login bug',
          status: 'todo',
          label: 'bug',
          priority: 'high',
        },
        {
          title: 'Write API docs',
          status: 'backlog',
          label: 'documentation',
          priority: 'low',
        },
      ],
    });
  });

  it('accepts status/label/priority values in any casing', () => {
    const csv = [
      'title,status,label,priority',
      'Ship it,Done,Feature,HIGH',
    ].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: true,
      rows: [
        {
          title: 'Ship it',
          status: 'done',
          label: 'feature',
          priority: 'high',
        },
      ],
    });
  });

  it('rejects an empty file', () => {
    expect(parseTasksCsv('')).toEqual({ ok: false, error: { code: 'empty' } });
    expect(parseTasksCsv('   \n  \n')).toEqual({
      ok: false,
      error: { code: 'empty' },
    });
  });

  it('rejects a file missing a required column', () => {
    const csv = ['title,status,priority', 'Fix it,todo,high'].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: false,
      error: { code: 'missingColumns', columns: 'label' },
    });
  });

  it('rejects a header-only file with no data rows', () => {
    const csv = 'title,status,label,priority';

    const result = parseTasksCsv(csv);

    expect(result).toEqual({ ok: false, error: { code: 'noDataRows' } });
  });

  it('rejects a row with the wrong number of columns', () => {
    const csv = ['title,status,label,priority', 'Fix it,todo,bug'].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: false,
      error: { code: 'columnCountMismatch', row: 2, expected: 4, found: 3 },
    });
  });

  it('rejects a row with an empty title', () => {
    const csv = ['title,status,label,priority', ',todo,bug,high'].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: false,
      error: { code: 'titleRequired', row: 2 },
    });
  });

  it('rejects a row with an invalid status', () => {
    const csv = [
      'title,status,label,priority',
      'Fix it,not-a-status,bug,high',
    ].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: false,
      error: { code: 'invalidStatus', row: 2, value: 'not-a-status' },
    });
  });

  it('rejects a row with an invalid label', () => {
    const csv = [
      'title,status,label,priority',
      'Fix it,todo,not-a-label,high',
    ].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: false,
      error: { code: 'invalidLabel', row: 2, value: 'not-a-label' },
    });
  });

  it('rejects a row with an invalid priority', () => {
    const csv = [
      'title,status,label,priority',
      'Fix it,todo,bug,not-a-priority',
    ].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: false,
      error: { code: 'invalidPriority', row: 2, value: 'not-a-priority' },
    });
  });

  it('parses a quoted field containing a comma', () => {
    const csv = [
      'title,status,label,priority',
      '"Fix the bug, again",todo,bug,high',
    ].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: true,
      rows: [
        {
          title: 'Fix the bug, again',
          status: 'todo',
          label: 'bug',
          priority: 'high',
        },
      ],
    });
  });

  it('unescapes a doubled quote inside a quoted field', () => {
    const csv = [
      'title,status,label,priority',
      '"Say ""hello""",todo,bug,high',
    ].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: true,
      rows: [
        {
          title: 'Say "hello"',
          status: 'todo',
          label: 'bug',
          priority: 'high',
        },
      ],
    });
  });

  it('handles a quoted field that is not the last column', () => {
    const csv = [
      'title,status,label,priority',
      '"Ship it, finally",done,feature,high',
    ].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: true,
      rows: [
        {
          title: 'Ship it, finally',
          status: 'done',
          label: 'feature',
          priority: 'high',
        },
      ],
    });
  });

  it('reports the correct row number for an error past the first data row', () => {
    const csv = [
      'title,status,label,priority',
      'Fix it,todo,bug,high',
      'Also fix it,todo,bug,not-a-priority',
    ].join('\n');

    const result = parseTasksCsv(csv);

    expect(result).toEqual({
      ok: false,
      error: { code: 'invalidPriority', row: 3, value: 'not-a-priority' },
    });
  });
});
