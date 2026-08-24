import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@repo/ui/components/ui/input-otp';

const OTP_LENGTH = 6;

export function OtpForm() {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = (_code: string) => {
    setIsSubmitting(true);
    // Mock verification - no network call, any 6-digit code succeeds.
    navigate({ to: '/sign-in' });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <InputOTP
        maxLength={OTP_LENGTH}
        value={value}
        onChange={setValue}
        onComplete={handleComplete}
        disabled={isSubmitting}
      >
        <InputOTPGroup>
          {Array.from({ length: OTP_LENGTH }, (_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">{t('otp.autoSubmitHint')}</p>
    </div>
  );
}
