import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const DEFAULT_THEME = 'dark';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
