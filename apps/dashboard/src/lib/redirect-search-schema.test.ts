import { describe, expect, it } from 'vitest';
import { redirectSearchSchema } from './redirect-search-schema';

describe('redirectSearchSchema', () => {
  it('accepts a plain relative path', () => {
    expect(redirectSearchSchema.parse({ redirect: '/tasks' })).toEqual({
      redirect: '/tasks',
    });
  });

  it('leaves redirect undefined when omitted', () => {
    expect(redirectSearchSchema.parse({}).redirect).toBeUndefined();
  });

  it('falls back to undefined for a protocol-relative URL, instead of throwing', () => {
    expect(
      redirectSearchSchema.parse({ redirect: '//evil.com' }).redirect,
    ).toBeUndefined();
  });

  it('falls back to undefined for an absolute URL, instead of throwing', () => {
    expect(
      redirectSearchSchema.parse({ redirect: 'https://evil.com' }).redirect,
    ).toBeUndefined();
  });

  it('falls back to undefined for a non-path scheme, instead of throwing', () => {
    expect(
      redirectSearchSchema.parse({ redirect: 'javascript:alert(1)' }).redirect,
    ).toBeUndefined();
  });
});
