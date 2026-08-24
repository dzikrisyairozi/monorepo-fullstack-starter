import type {
  ApprovalOption,
  ChatSource,
  TaskStatus,
  ThinkingSearchResult,
  ThinkingStep,
  ToolInvocation,
} from '@repo/ui/components/chat';

export type ChatRole = 'user' | 'assistant';

export type ChatTask = {
  id: string;
  title: string;
  status: TaskStatus;
  elapsedLabel?: string;
};

export type ChatMessageSegment =
  | { type: 'text'; text: string }
  | { type: 'loader' }
  | {
      type: 'thinking';
      steps: ThinkingStep[];
      durationLabel: string;
      reasoning?: string;
      searchResults?: ThinkingSearchResult[];
      code?: string;
    }
  | { type: 'tools'; invocations: ToolInvocation[]; messageCount: number }
  | { type: 'tasks'; tasks: ChatTask[] }
  | { type: 'approval'; question: string; options: ApprovalOption[] }
  | {
      type: 'streamed';
      text: string;
      sources?: ChatSource[];
      followUps?: string[];
    };

export type ChatMessage = {
  id: string;
  role: ChatRole;
  createdAt: string;
  segments: ChatMessageSegment[];
};

export type Conversation = {
  id: string;
  title: string;
  avatarLabel: string;
  lastMessagePreview: string;
  messages: ChatMessage[];
};
