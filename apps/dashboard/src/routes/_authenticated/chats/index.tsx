import { createFileRoute } from '@tanstack/react-router';
import { AppHeader } from '../../../components/layout/app-header';
import { Main } from '../../../components/layout/main';
import { Chats } from '../../../features/chats';

export const Route = createFileRoute('/_authenticated/chats/')({
  component: ChatsPage,
});

function ChatsPage() {
  return (
    <>
      <AppHeader />
      <Main fixed>
        <Chats />
      </Main>
    </>
  );
}
