import { Fragment, useEffect, useRef, useState } from 'react';
import { isSameDay, isToday, isYesterday } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import {
  AgentLoader,
  ApprovalCard,
  MessageBubble,
  PromptBar,
  StreamingText,
  TaskRow,
  ThinkingTrace,
  ToolChip,
} from '@repo/ui/components/chat';
import { Button } from '@repo/ui/components/ui/button';
import { type ChatMessage, type Conversation } from '../data/chat-types';
import { useChatReplay } from './use-chat-replay';

// eslint-disable-next-line react-refresh/only-export-components
export function dateSeparatorLabel(
  date: Date,
  t: (key: string) => string,
  language: string,
) {
  if (isToday(date)) return t('chats.today');
  if (isYesterday(date)) return t('chats.yesterday');
  return new Intl.DateTimeFormat(language, { dateStyle: 'long' }).format(date);
}

function groupByDay(messages: ChatMessage[]) {
  const groups: { date: Date; messages: ChatMessage[] }[] = [];
  for (const message of messages) {
    const date = new Date(message.createdAt);
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && isSameDay(lastGroup.date, date)) {
      lastGroup.messages.push(message);
    } else {
      groups.push({ date, messages: [message] });
    }
  }
  return groups;
}

// How close to the bottom (in px) counts as "already at the bottom" - the
// thread only auto-scrolls to new content when the user hasn't scrolled
// away from it.
const AUTO_SCROLL_THRESHOLD = 80;

export function ChatThread({
  conversation,
  onBack,
  className,
}: {
  conversation: Conversation;
  onBack?: () => void;
  className?: string;
}) {
  const { t, i18n } = useTranslation('dashboard');
  const { messages, send } = useChatReplay(conversation.messages);
  const [promptValue, setPromptValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickToBottomRef = useRef(true);

  const groups = groupByDay(messages);

  // A ResizeObserver on the content (rather than a useEffect keyed on
  // `messages`) catches growth from both new messages AND StreamingText's
  // own character-by-character reveal, which doesn't touch `messages` at
  // all - it's internal state on the StreamingText instance.
  useEffect(() => {
    const container = scrollRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const observer = new ResizeObserver(() => {
      if (stickToBottomRef.current) {
        container.scrollTop = container.scrollHeight;
      }
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickToBottomRef.current = distanceFromBottom < AUTO_SCROLL_THRESHOLD;
  }

  function handleSend(text: string) {
    stickToBottomRef.current = true;
    send(text);
    setPromptValue('');
  }

  return (
    <div className={className}>
      <div className="flex h-full min-h-0 flex-col">
        {onBack && (
          <div className="border-b p-2 md:hidden">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft />
              {t('chats.back')}
            </Button>
          </div>
        )}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div ref={contentRef} className="space-y-6 p-4">
            {groups.map((group) => (
              <Fragment key={group.date.toISOString()}>
                <div className="flex items-center justify-center">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                    {dateSeparatorLabel(group.date, t, i18n.language)}
                  </span>
                </div>
                <div className="space-y-4">
                  {group.messages.map((message) => (
                    <MessageBubble key={message.id} role={message.role}>
                      {message.segments.map((segment, index) => {
                        if (segment.type === 'text') {
                          return (
                            <p key={index} className="whitespace-pre-wrap">
                              {segment.text}
                            </p>
                          );
                        }
                        if (segment.type === 'loader') {
                          return <AgentLoader key={index} />;
                        }
                        if (segment.type === 'thinking') {
                          return (
                            <ThinkingTrace
                              key={index}
                              steps={segment.steps}
                              durationLabel={segment.durationLabel}
                              reasoning={segment.reasoning}
                              searchResults={segment.searchResults}
                            />
                          );
                        }
                        if (segment.type === 'tools') {
                          return (
                            <ToolChip
                              key={index}
                              invocations={segment.invocations}
                              messageCount={segment.messageCount}
                            />
                          );
                        }
                        if (segment.type === 'tasks') {
                          return (
                            <div
                              key={index}
                              className="space-y-2 rounded-md border bg-background p-3"
                            >
                              {segment.tasks.map((task) => (
                                <TaskRow
                                  key={task.id}
                                  title={task.title}
                                  status={task.status}
                                  elapsedLabel={task.elapsedLabel}
                                />
                              ))}
                            </div>
                          );
                        }
                        if (segment.type === 'approval') {
                          return (
                            <ApprovalCard
                              key={index}
                              question={segment.question}
                              options={segment.options}
                            />
                          );
                        }
                        return (
                          <StreamingText
                            key={index}
                            text={segment.text}
                            sources={segment.sources}
                            followUps={segment.followUps}
                            onFollowUpSelect={handleSend}
                          />
                        );
                      })}
                    </MessageBubble>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="border-t p-3">
          <PromptBar
            value={promptValue}
            onValueChange={setPromptValue}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}
