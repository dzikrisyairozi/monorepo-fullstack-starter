import { createFileRoute } from '@tanstack/react-router';
import { Forbidden } from '../../features/errors/forbidden';

export const Route = createFileRoute('/(errors)/403')({
  component: Forbidden,
});
