/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Monorepo Fullstack Starter — Shared Layout Options (Fumadocs)
 *
 * @author  Dzikri Syairozi <dzikrisyairozi@gmail.com>
 * @see     https://github.com/dzikrisyairozi/monorepo-fullstack-starter
 * @license MIT
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { i18n } from '@/lib/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { ThemeToggle } from '@/components/theme-toggle';

export const i18nUI = defineI18nUI(i18n, {
  en: {
    displayName: 'English',
  },
  id: {
    displayName: 'Bahasa Indonesia',
    search: 'Cari dokumentasi',
    searchNoResult: 'Tidak ada hasil',
    toc: 'Daftar Isi',
    lastUpdate: 'Terakhir diperbarui',
    chooseTheme: 'Pilih Tema',
    nextPage: 'Halaman Selanjutnya',
    previousPage: 'Halaman Sebelumnya',
    editOnGithub: 'Edit di GitHub',
  },
});

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    // i18n is deprecated on BaseLayoutProps as of fumadocs-ui 16 - the raw
    // I18nConfig object carries a non-serializable translations() method that
    // breaks passing it to these client layouts. RootProvider's i18nUI.provider()
    // already supplies the language switch; omit it here per the deprecation note.
    themeSwitch: {
      component: <ThemeToggle />,
    },
    nav: {
      title: (
        <span className="font-bold text-primary">
          🚀 Monorepo Fullstack Starter
        </span>
      ),
      url: `/${locale}`,
    },
    githubUrl: 'https://github.com/dzikrisyairozi/monorepo-fullstack-starter',
    links: [
      {
        text: locale === 'id' ? 'Dokumentasi' : 'Docs',
        url: `/${locale}/docs`,
        active: 'nested-url',
      },
    ],
  };
}
