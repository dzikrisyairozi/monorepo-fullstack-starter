import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { getCookie, setCookie } from '../lib/cookies';

// eslint-disable-next-line react-refresh/only-export-components
export const FONTS = ['outfit', 'inter', 'system'] as const;
export type Font = (typeof FONTS)[number];

const FONT_COOKIE_NAME = 'dashboard_font';
const FONT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const DEFAULT_FONT: Font = 'outfit';

type FontContextType = {
  font: Font;
  setFont: (font: Font) => void;
};

const FontContext = createContext<FontContextType | null>(null);

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, _setFont] = useState<Font>(() => {
    const saved = getCookie(FONT_COOKIE_NAME);
    return FONTS.includes(saved as Font) ? (saved as Font) : DEFAULT_FONT;
  });

  useEffect(() => {
    const root = document.documentElement;
    FONTS.forEach((f) => root.classList.remove(`font-${f}`));
    root.classList.add(`font-${font}`);
  }, [font]);

  const setFont = (next: Font) => {
    _setFont(next);
    setCookie(FONT_COOKIE_NAME, next, FONT_COOKIE_MAX_AGE);
  };

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFont() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}
