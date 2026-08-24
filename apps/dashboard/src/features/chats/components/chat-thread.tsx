import { Fragment } from 'react';
import { format, isSameDay, isToday, isYesterday } from 'date-fns';
import { useTranslation } from '@repo/i18n';
import {
  ApprovalCard,
  MessageBubble,
  StreamingText,
  TaskRow,
  ThinkingTrace,
  ToolChip,
} from '@repo/ui/components/chat';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { type ChatMessage, type Conversation } from '../data/chat-types';

function dateSeparatorLabel(date: Date, t: (key: string) => string) {
  if (isToday(date)) return t('chats.today');
  if (isYesterday(date)) return t('chats.yesterday');
  return format(date, 'MMMM d, yyyy');
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

export function ChatThread({
  conversation,
  className,
}: {
  conversation: Conversation;
  className?: string;
}) {
  const { t } = useTranslation('dashboard');
  const groups = groupByDay(conversation.messages);

  return (
    <ScrollArea className={className}>
      <div className="space-y-6 p-4">
        {groups.map((group) => (
          <Fragment key={group.date.toISOString()}>
            <div className="flex items-center justify-center">
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {dateSeparatorLabel(group.date, t)}
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
                    if (segment.type === 'thinking') {
                      return (
                        <ThinkingTrace
                          key={index}
                          steps={segment.steps}
                          durationLabel={segment.durationLabel}
                          reasoning={segment.reasoning}
                          searchResults={segment.searchResults}
                          code={segment.code}
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
                      />
                    );
                  })}
                </MessageBubble>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
