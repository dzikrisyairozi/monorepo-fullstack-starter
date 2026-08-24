import { Mail, UserPlus } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { useUsers } from './users-provider';

export function UsersPrimaryButtons() {
  const { t } = useTranslation('dashboard');
  const { setOpen } = useUsers();

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => setOpen('invite')}>
        <Mail />
        {t('users.inviteUser')}
      </Button>
      <Button onClick={() => setOpen('add')}>
        <UserPlus />
        {t('users.addUser')}
      </Button>
    </div>
  );
}
