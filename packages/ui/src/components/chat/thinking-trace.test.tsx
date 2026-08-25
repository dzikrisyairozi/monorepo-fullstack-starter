import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThinkingTrace } from './thinking-trace';

const steps = [
  { id: '1', label: 'Read the file' },
  { id: '2', label: 'Search the docs' },
];

describe('ThinkingTrace', () => {
  it('is collapsed by default, hiding step content', () => {
    render(<ThinkingTrace steps={steps} durationLabel="4.2s" />);

    expect(screen.getByText('2 steps')).toBeTruthy();
    expect(screen.getByText('4.2s')).toBeTruthy();
    expect(screen.queryByText('Read the file')).toBeNull();
  });

  it('expands to reveal step content, then collapses again on a second click', async () => {
    const user = userEvent.setup();
    render(<ThinkingTrace steps={steps} durationLabel="4.2s" />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Read the file')).toBeTruthy();

    await user.click(screen.getByRole('button'));
    expect(screen.queryByText('Read the file')).toBeNull();
  });

  it('shows placeholder copy for empty reasoning and search tabs, and has no coding tab', async () => {
    const user = userEvent.setup();
    render(<ThinkingTrace steps={steps} durationLabel="1.0s" />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('tab', { name: 'Reasoning' }));
    expect(screen.getByText('No reasoning recorded.')).toBeTruthy();

    await user.click(screen.getByRole('tab', { name: 'Search' }));
    expect(screen.getByText('No search results.')).toBeTruthy();

    expect(screen.queryByRole('tab', { name: 'Coding' })).toBeNull();
  });

  it('lets a caller override every label, so a consumer can localize it', async () => {
    const user = userEvent.setup();
    render(
      <ThinkingTrace
        steps={steps}
        durationLabel="4.2s"
        stepsLabel="2 langkah"
        stepsTabLabel="Langkah"
        reasoningTabLabel="Alasan"
        searchTabLabel="Pencarian"
        noReasoningLabel="Tidak ada alasan yang tercatat."
        noSearchResultsLabel="Tidak ada hasil pencarian."
      />,
    );

    expect(screen.getByText('2 langkah')).toBeTruthy();
    expect(screen.queryByText('2 steps')).toBeNull();

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('tab', { name: 'Langkah' })).toBeTruthy();

    await user.click(screen.getByRole('tab', { name: 'Alasan' }));
    expect(screen.getByText('Tidak ada alasan yang tercatat.')).toBeTruthy();

    await user.click(screen.getByRole('tab', { name: 'Pencarian' }));
    expect(screen.getByText('Tidak ada hasil pencarian.')).toBeTruthy();
  });
});
