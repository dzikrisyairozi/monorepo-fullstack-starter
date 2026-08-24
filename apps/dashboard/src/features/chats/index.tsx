import { useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { ChatRail } from './components/chat-rail';
import { ChatThread } from './components/chat-thread';
import { conversations } from './data/conversations';

type MobileView = 'rail' | 'thread';

export function Chats() {
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const [mobileView, setMobileView] = useState<MobileView>('rail');
  const selected =
    conversations.find((conversation) => conversation.id === selectedId) ??
    conversations[0];

  return (
    <div className="flex h-full min-h-0">
      <div
        className={cn(
          'h-full min-h-0 w-full shrink-0 md:block md:w-72',
          mobileView === 'thread' ? 'hidden' : 'block',
        )}
      >
        <ChatRail
          conversations={conversations}
          selectedId={selected.id}
          onSelect={(id) => {
            setSelectedId(id);
            setMobileView('thread');
          }}
          className="h-full"
        />
      </div>
      <div
        className={cn(
          'h-full min-h-0 flex-1 md:block',
          mobileView === 'rail' ? 'hidden' : 'block',
        )}
      >
        <ChatThread
          conversation={selected}
          onBack={() => setMobileView('rail')}
          className="h-full min-h-0"
        />
      </div>
    </div>
  );
}
