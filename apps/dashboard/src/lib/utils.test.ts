import { describe, expect, it } from 'vitest';
import { getInitials } from './utils';

describe('getInitials', () => {
  it('takes the first letter of the first two words, uppercased', () => {
    expect(getInitials('Dzikri Syairozi')).toBe('DS');
  });

  it('handles a single word', () => {
    expect(getInitials('Madonna')).toBe('M');
  });

  it('ignores repeated spaces between words', () => {
    expect(getInitials('John  Doe')).toBe('JD');
  });

  it('ignores leading and trailing spaces', () => {
    expect(getInitials('  Jane Smith  ')).toBe('JS');
  });

  it('returns an empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });
});
