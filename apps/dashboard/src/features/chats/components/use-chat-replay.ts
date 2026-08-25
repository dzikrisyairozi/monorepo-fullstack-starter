import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@repo/ui/hooks/use-prefers-reduced-motion';
import { type ChatMessage, type ChatMessageSegment } from '../data/chat-types';
import {
  scriptedStreamed,
  scriptedThinking,
  scriptedTools,
} from '../data/scripted-reply';

// crypto.randomUUID() requires a secure context (https, or localhost) and
// throws otherwise - e.g. demoing this over plain http:// on a LAN IP. These
// ids only need to be unique within one browser session (React keys and a
// lookup key to patch a message's segments in place), not cryptographically
// unpredictable, so a plain random string is fine.
function makeMessageId(): string {
  return Math.random().toString(36).slice(2);
}

function makeMessage(
  role: ChatMessage['role'],
  segments: ChatMessageSegment[],
): ChatMessage {
  return {
    id: makeMessageId(),
    role,
    createdAt: new Date().toISOString(),
    segments,
  };
}

export function useChatReplay(initialMessages: ChatMessage[]) {
  const [messages, setMessages] = useState(initialMessages);
  const prefersReducedMotion = usePrefersReducedMotion();
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Cancel any in-flight reply's staged reveal timers immediately - left
    // running, they'd keep firing setAssistantSegments() for an id that no
    // longer exists in the new conversation's message list.
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    // Deferred so this doesn't call setState synchronously as the first
    // statement of the effect body.
    queueMicrotask(() => {
      setMessages(initialMessages);
    });
  }, [initialMessages]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Only called after send() has already appended the assistant message
  // (with a loader segment) that this replaces the segments of.
  function setAssistantSegments(id: string, segments: ChatMessageSegment[]) {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, segments } : message,
      ),
    );
  }

  function send(text: string) {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const assistantId = makeMessageId();
    setMessages((prev) => [
      ...prev,
      makeMessage('user', [{ type: 'text', text }]),
    ]);

    if (prefersReducedMotion) {
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          createdAt: new Date().toISOString(),
          segments: [scriptedThinking, scriptedTools, scriptedStreamed],
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        createdAt: new Date().toISOString(),
        segments: [{ type: 'loader' }],
      },
    ]);

    timersRef.current = [
      setTimeout(() => {
        setAssistantSegments(assistantId, [scriptedThinking]);
      }, 1000),
      setTimeout(() => {
        setAssistantSegments(assistantId, [scriptedThinking, scriptedTools]);
      }, 2200),
      setTimeout(() => {
        setAssistantSegments(assistantId, [
          scriptedThinking,
          scriptedTools,
          scriptedStreamed,
        ]);
      }, 3400),
    ];
  }

  return { messages, send };
}
