import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useChatReplay } from './use-chat-replay';

describe('useChatReplay', () => {
  it('starts with the initial messages and no extra state beyond messages/send', () => {
    const { result } = renderHook(() => useChatReplay([]));
    expect(result.current.messages).toEqual([]);
    expect(Object.keys(result.current)).toEqual(['messages', 'send']);
  });

  it('appends the user message immediately and the scripted assistant reply after the timers run', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useChatReplay([]));

    act(() => {
      result.current.send('hello');
    });
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0]).toMatchObject({
      role: 'user',
      segments: [{ type: 'text', text: 'hello' }],
    });
    expect(result.current.messages[1].segments).toEqual([{ type: 'loader' }]);

    act(() => {
      vi.advanceTimersByTime(3400);
    });
    const assistantSegments = result.current.messages[1].segments;
    expect(assistantSegments.map((segment) => segment.type)).toEqual([
      'thinking',
      'tools',
      'streamed',
    ]);

    vi.useRealTimers();
  });
});
