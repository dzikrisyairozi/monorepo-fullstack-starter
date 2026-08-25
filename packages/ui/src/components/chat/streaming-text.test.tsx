import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StreamingText } from './streaming-text';

const defaultMatchMedia = window.matchMedia;

describe('StreamingText', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    window.matchMedia = defaultMatchMedia;
  });

  it('reveals the full text once enough time has advanced', () => {
    render(
      <StreamingText text="Hello world" intervalMs={20} charsPerTick={2} />,
    );

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByText('Hello world')).toBeTruthy();
  });

  it('calls onComplete exactly once when the stream finishes', () => {
    const onComplete = vi.fn();
    render(
      <StreamingText
        text="Hi"
        intervalMs={10}
        charsPerTick={1}
        onComplete={onComplete}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('renders instantly with no caret under prefers-reduced-motion', () => {
    window.matchMedia = ((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;

    render(<StreamingText text="Instant text" />);

    expect(screen.getByText('Instant text')).toBeTruthy();
    expect(document.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('clears the interval when unmounted mid-stream', () => {
    const clearSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = render(
      <StreamingText
        text="A longer streaming message that takes a while"
        intervalMs={20}
        charsPerTick={1}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(40);
    });
    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });

  it('fades in source chips and follow-up pills only after completion', () => {
    render(
      <StreamingText
        text="Done"
        intervalMs={10}
        charsPerTick={4}
        sources={[{ id: '1', label: 'example.com' }]}
        followUps={['Tell me more']}
      />,
    );

    expect(screen.queryByText('example.com')).toBeNull();
    expect(screen.queryByText('Tell me more')).toBeNull();

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByText('example.com')).toBeTruthy();
    expect(screen.getByText('Tell me more')).toBeTruthy();
  });
});
