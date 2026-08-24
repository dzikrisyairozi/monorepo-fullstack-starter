import { toast } from 'sonner';
import { i18n } from '@repo/i18n';

export function showSubmittedData(data: unknown, title?: string) {
  toast.message(title ?? i18n.t('showSubmittedData.title'), {
    description: (
      <pre className="mt-2 w-full max-w-sm overflow-x-auto rounded-md bg-neutral-950 p-4 text-xs text-white">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}
