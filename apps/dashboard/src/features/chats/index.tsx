import { useState } from 'react';
import { ChatRail } from './components/chat-rail';
import { ChatThread } from './components/chat-thread';
import { conversations } from './data/conversations';

export function Chats() {
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const selected =
    conversations.find((conversation) => conversation.id === selectedId) ??
    conversations[0];

  return (
    <div className="flex h-full">
      <ChatRail
        conversations={conversations}
        selectedId={selected.id}
        onSelect={setSelectedId}
        className="w-72 shrink-0"
      />
      <ChatThread conversation={selected} className="flex-1" />
    </div>
  );
}
