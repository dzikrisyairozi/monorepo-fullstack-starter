import { type Conversation } from './chat-types';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const now = Date.now();
const iso = (offsetMs: number) => new Date(now - offsetMs).toISOString();

export const conversations: Conversation[] = [
  {
    id: 'deploy-pipeline',
    title: 'Deploy pipeline review',
    avatarLabel: 'DP',
    lastMessagePreview: 'Rolled out to production, all checks green.',
    messages: [
      {
        id: 'dp-1',
        role: 'user',
        createdAt: iso(DAY + 3 * HOUR),
        segments: [
          {
            type: 'text',
            text: 'Can you look into why the deploy pipeline has been flaky this week?',
          },
        ],
      },
      {
        id: 'dp-2',
        role: 'assistant',
        createdAt: iso(DAY + 2 * HOUR + 55 * 60 * 1000),
        segments: [
          {
            type: 'text',
            text: "Sure, let me dig into the recent runs and see what's going on.",
          },
        ],
      },
      {
        id: 'dp-3',
        role: 'user',
        createdAt: iso(2 * HOUR),
        segments: [{ type: 'text', text: 'Any update on the flaky pipeline?' }],
      },
      {
        id: 'dp-4',
        role: 'assistant',
        createdAt: iso(1 * HOUR + 50 * 60 * 1000),
        segments: [
          {
            type: 'thinking',
            durationLabel: '6.4s',
            steps: [
              { id: '1', label: 'Read recent CI run logs' },
              { id: '2', label: 'Compare failing vs passing runs' },
              { id: '3', label: 'Narrow down to the flaky step' },
            ],
            reasoning:
              'The failures cluster around the integration test stage, which suggests a timing issue rather than a code regression.',
            searchResults: [
              { id: '1', label: 'CI run #4821 (failed)' },
              { id: '2', label: 'CI run #4819 (passed)' },
            ],
          },
          {
            type: 'tools',
            messageCount: 3,
            invocations: [
              { id: '1', name: 'read_ci_logs', status: 'done' },
              { id: '2', name: 'diff_runs', status: 'done' },
              { id: '3', name: 'run_tests_locally', status: 'running' },
              { id: '4', name: 'open_pr', status: 'pending' },
            ],
          },
          {
            type: 'tasks',
            tasks: [
              {
                id: '1',
                title: 'Reproduce the timeout locally',
                status: 'done',
                elapsedLabel: '1m 12s',
              },
              {
                id: '2',
                title: 'Increase test DB connection timeout',
                status: 'running',
                elapsedLabel: '32s',
              },
              {
                id: '3',
                title: 'Re-run the suite 10x to confirm the fix',
                status: 'queued',
              },
            ],
          },
          {
            type: 'approval',
            question:
              'I found the fix - bump the test DB connection timeout from 2s to 8s. Want me to open a PR?',
            options: [
              { id: 'yes', label: 'Yes, open the PR' },
              { id: 'no', label: 'No, let me review first' },
            ],
          },
          {
            type: 'streamed',
            text: "The pipeline was flaky because the integration test suite's database connection timeout (2s) was too aggressive under load - CI runners occasionally take longer than that just to establish the connection, causing spurious failures unrelated to the actual code. Bumping the timeout to 8s and adding a retry resolved it across 10 consecutive local runs.",
            sources: [
              { id: '1', label: 'ci-logs/run-4821.txt' },
              { id: '2', label: 'ci-logs/run-4819.txt' },
              { id: '3', label: 'postgres.org/docs/timeouts' },
            ],
            followUps: [
              'Open the PR now',
              'Show me the diff',
              'Any other flaky tests?',
            ],
          },
        ],
      },
      {
        id: 'dp-5',
        role: 'user',
        createdAt: iso(20 * 60 * 1000),
        segments: [
          { type: 'text', text: 'Great catch, go ahead and ship it.' },
        ],
      },
      {
        id: 'dp-6',
        role: 'assistant',
        createdAt: iso(10 * 60 * 1000),
        segments: [
          {
            type: 'text',
            text: 'Rolled out to production, all checks green.',
          },
        ],
      },
    ],
  },
  {
    id: 'onboarding-copy',
    title: 'Onboarding email copy',
    avatarLabel: 'OC',
    lastMessagePreview: "Here's a friendlier version of the welcome email.",
    messages: [
      {
        id: 'oc-1',
        role: 'user',
        createdAt: iso(3 * DAY),
        segments: [
          {
            type: 'text',
            text: 'Our welcome email feels too formal, can you loosen it up?',
          },
        ],
      },
      {
        id: 'oc-2',
        role: 'assistant',
        createdAt: iso(3 * DAY - 30 * 60 * 1000),
        segments: [
          {
            type: 'text',
            text: "Here's a friendlier version of the welcome email.",
          },
        ],
      },
    ],
  },
  {
    id: 'pricing-page',
    title: 'Pricing page redesign',
    avatarLabel: 'PP',
    lastMessagePreview: 'Added the annual/monthly toggle you asked for.',
    messages: [
      {
        id: 'pp-1',
        role: 'user',
        createdAt: iso(5 * DAY),
        segments: [
          {
            type: 'text',
            text: 'Can we add a monthly/annual toggle to the pricing page?',
          },
        ],
      },
      {
        id: 'pp-2',
        role: 'assistant',
        createdAt: iso(5 * DAY - 45 * 60 * 1000),
        segments: [
          {
            type: 'text',
            text: 'Added the annual/monthly toggle you asked for.',
          },
        ],
      },
    ],
  },
  {
    id: 'weekly-digest',
    title: 'Weekly digest automation',
    avatarLabel: 'WD',
    lastMessagePreview: "It's scheduled to send every Monday at 9am.",
    messages: [
      {
        id: 'wd-1',
        role: 'user',
        createdAt: iso(6 * DAY),
        segments: [
          {
            type: 'text',
            text: 'Set up a weekly digest email for active users.',
          },
        ],
      },
      {
        id: 'wd-2',
        role: 'assistant',
        createdAt: iso(6 * DAY - 15 * 60 * 1000),
        segments: [
          {
            type: 'text',
            text: "It's scheduled to send every Monday at 9am.",
          },
        ],
      },
    ],
  },
  {
    id: 'support-triage',
    title: 'Support ticket triage',
    avatarLabel: 'ST',
    lastMessagePreview: 'Tagged and routed the backlog to the right teams.',
    messages: [
      {
        id: 'st-1',
        role: 'user',
        createdAt: iso(8 * DAY),
        segments: [
          {
            type: 'text',
            text: 'Can you help triage the support ticket backlog?',
          },
        ],
      },
      {
        id: 'st-2',
        role: 'assistant',
        createdAt: iso(8 * DAY - 20 * 60 * 1000),
        segments: [
          {
            type: 'text',
            text: 'Tagged and routed the backlog to the right teams.',
          },
        ],
      },
    ],
  },
];
