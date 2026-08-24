import { useState, type ComponentProps } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Input } from '@repo/ui/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from '@repo/ui/components/ui/input-group';

export function PasswordInput({
  className,
  ...props
}: Omit<ComponentProps<typeof Input>, 'type'>) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation('dashboard');

  return (
    <InputGroup className={className}>
      <Input {...props} type={visible ? 'text' : 'password'} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff /> : <Eye />}
          <span className="sr-only">
            {visible ? t('passwordInput.hide') : t('passwordInput.show')}
          </span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
