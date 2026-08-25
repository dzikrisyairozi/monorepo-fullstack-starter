import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useChatReplay } from './use-chat-replay';
import { type ChatMessage } from '../data/chat-types';

// A stable reference, matching real usage - a caller passes a conversation's
// existing messages array, not a fresh literal recreated on every render
// (which would make useChatReplay's conversation-switch effect fire
// spuriously on unrelated re-renders, e.g. the ones send() itself triggers).
const NO_MESSAGES: ChatMessage[] = [];

describe('useChatReplay', () => {
  it('starts with the initial messages and no extra state beyond messages/send', () => {
    const { result } = renderHook(() => useChatReplay(NO_MESSAGES));
    expect(result.current.messages).toEqual([]);
    expect(Object.keys(result.current)).toEqual(['messages', 'send']);
  });

  it('appends the user message immediately and the scripted assistant reply after the timers run', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useChatReplay(NO_MESSAGES));

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

  it('generates message ids without crypto.randomUUID, which throws outside a secure context', () => {
    const original = crypto.randomUUID;
    // Simulating an insecure context (plain http:// on a LAN IP), where
    // crypto.randomUUID is unavailable and throws.
    crypto.randomUUID = () => {
      throw new DOMException('insecure context', 'NotSupportedError');
    };

    try {
      const { result } = renderHook(() => useChatReplay(NO_MESSAGES));
      act(() => {
        result.current.send('hello');
      });
      const ids = result.current.messages.map((message) => message.id);
      expect(ids).toHaveLength(2);
      expect(new Set(ids).size).toBe(2);
    } finally {
      crypto.randomUUID = original;
    }
  });

  it('clears pending replay timers when the conversation changes mid-reply', () => {
    vi.useFakeTimers();
    const conversationA: ChatMessage[] = [];
    const conversationB: ChatMessage[] = [];

    const { result, rerender } = renderHook(
      ({ initialMessages }) => useChatReplay(initialMessages),
      { initialProps: { initialMessages: conversationA } },
    );

    act(() => {
      result.current.send('hello');
    });
    // The three staged reveal timers (thinking/tools/streamed) are pending.
    expect(vi.getTimerCount()).toBe(3);

    // Switch conversations before they fire - this should cancel them
    // immediately, not just leave them to fire uselessly later.
    act(() => {
      rerender({ initialMessages: conversationB });
    });

    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });
});
