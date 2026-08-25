import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@repo/ui/hooks/use-prefers-reduced-motion';
import { type ChatMessage, type ChatMessageSegment } from '../data/chat-types';
import {
  scriptedStreamed,
  scriptedThinking,
  scriptedTools,
} from '../data/scripted-reply';

function makeMessage(
  role: ChatMessage['role'],
  segments: ChatMessageSegment[],
): ChatMessage {
  return {
    id: crypto.randomUUID(),
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

    const assistantId = crypto.randomUUID();
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
