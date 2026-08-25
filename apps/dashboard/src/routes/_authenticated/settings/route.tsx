import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppHeader } from '../../../components/layout/app-header';
import { Main } from '../../../components/layout/main';
import { SettingsLayout } from '../../../features/settings';

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsRoute,
});

function SettingsRoute() {
  return (
    <>
      <AppHeader />
      <Main>
        <SettingsLayout>
          <Outlet />
        </SettingsLayout>
      </Main>
    </>
  );
}
