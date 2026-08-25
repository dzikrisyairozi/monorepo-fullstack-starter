import { describe, expect, it } from 'vitest';
import en from './locales/en.json';
import id from './locales/id.json';

function flattenKeys(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) {
    return [prefix];
  }
  return Object.entries(obj).flatMap(([key, value]) =>
    flattenKeys(value, prefix ? `${prefix}.${key}` : key),
  );
}

describe('locale parity', () => {
  it('en and id expose the exact same set of keys', () => {
    const enKeys = new Set(flattenKeys(en));
    const idKeys = new Set(flattenKeys(id));

    const missingFromId = [...enKeys].filter((k) => !idKeys.has(k));
    const missingFromEn = [...idKeys].filter((k) => !enKeys.has(k));

    expect(
      missingFromId,
      'keys present in en.json but missing from id.json',
    ).toEqual([]);
    expect(
      missingFromEn,
      'keys present in id.json but missing from en.json',
    ).toEqual([]);
  });
});
