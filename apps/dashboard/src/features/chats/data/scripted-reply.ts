import { type ChatMessageSegment } from './chat-types';

export const scriptedThinking: ChatMessageSegment = {
  type: 'thinking',
  durationLabel: '3.1s',
  steps: [
    { id: '1', label: 'Read the conversation so far' },
    { id: '2', label: 'Look for anything relevant on hand' },
    { id: '3', label: 'Draft a reply' },
  ],
  reasoning:
    'This is a scripted demo reply, so the same trace plays back for any message to show what a real trace would look like.',
};

export const scriptedTools: ChatMessageSegment = {
  type: 'tools',
  messageCount: 1,
  invocations: [
    { id: '1', name: 'search_knowledge_base', status: 'done' },
    { id: '2', name: 'draft_reply', status: 'done' },
  ],
};

export const scriptedStreamed: ChatMessageSegment = {
  type: 'streamed',
  text: 'This is a scripted demo reply - in a real product this would stream in from the model, but here it plays back the same fixed script every time so you can see the full sequence: loader, thinking trace, tool chips, then the streamed answer with sources and follow-ups.',
  sources: [
    { id: '1', label: 'docs.example.com' },
    { id: '2', label: 'changelog.example.com' },
  ],
  followUps: ['Tell me more', 'What else can you do?'],
};
