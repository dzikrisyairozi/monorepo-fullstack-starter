import { createFileRoute } from '@tanstack/react-router';
import { AppHeader } from '../../../components/layout/app-header';
import { Main } from '../../../components/layout/main';
import { Apps } from '../../../features/apps';

export const Route = createFileRoute('/_authenticated/apps/')({
  component: AppsPage,
});

function AppsPage() {
  return (
    <>
      <AppHeader />
      <Main>
        <Apps />
      </Main>
    </>
  );
}
