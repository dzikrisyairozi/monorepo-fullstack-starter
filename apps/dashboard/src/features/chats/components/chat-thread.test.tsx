import { describe, expect, it } from 'vitest';
import { dateSeparatorLabel } from './chat-thread';

const t = (key: string) => key;

describe('dateSeparatorLabel', () => {
  it('uses the today/yesterday translation keys, ignoring locale', () => {
    const today = new Date();
    expect(dateSeparatorLabel(today, t, 'id')).toBe('chats.today');

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(dateSeparatorLabel(yesterday, t, 'id')).toBe('chats.yesterday');
  });

  it('formats older dates using the given locale, not always English', () => {
    const date = new Date('2026-08-20T00:00:00Z');
    expect(dateSeparatorLabel(date, t, 'en')).toBe('August 20, 2026');
    expect(dateSeparatorLabel(date, t, 'id')).toBe('20 Agustus 2026');
  });
});
