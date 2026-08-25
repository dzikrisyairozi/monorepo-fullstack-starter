import { useMemo, useState } from 'react';
import { useTranslation } from '@repo/i18n';
import { Avatar, AvatarFallback } from '@repo/ui/components/ui/avatar';
import { Input } from '@repo/ui/components/ui/input';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { cn } from '@repo/ui/lib/utils';
import { type Conversation } from '../data/chat-types';

export function ChatRail({
  conversations,
  selectedId,
  onSelect,
  className,
}: {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  const { t } = useTranslation('dashboard');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return conversations;
    return conversations.filter((conversation) =>
      conversation.title.toLowerCase().includes(query),
    );
  }, [conversations, search]);

  return (
    <div className={cn('flex h-full flex-col border-r', className)}>
      <div className="border-b p-3">
        <Input
          placeholder={t('chats.searchPlaceholder')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-9"
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filtered.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() => onSelect(conversation.id)}
              aria-current={conversation.id === selectedId}
              className={cn(
                'flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-muted',
                conversation.id === selectedId && 'bg-muted',
              )}
            >
              <Avatar>
                <AvatarFallback>{conversation.avatarLabel}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {conversation.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {conversation.lastMessagePreview}
                </p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="p-3 text-center text-sm text-muted-foreground">
              {t('chats.noResults')}
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
