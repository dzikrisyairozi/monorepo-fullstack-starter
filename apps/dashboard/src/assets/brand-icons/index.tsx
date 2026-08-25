import { type SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Small original abstract marks for the /apps integration grid - not
 * traced from or intended to represent any real brand's logo.
 */

export function IconChatCircles(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="9" cy="9" r="6" fill="#4A154B" />
      <circle cx="15" cy="15" r="6" fill="#36C5F0" opacity={0.85} />
    </svg>
  );
}

export function IconOctagonKnot(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="10" fill="#181717" />
      <path
        d="M12 6a6 6 0 0 0-1.9 11.7c.3.05.4-.13.4-.29v-1.15c-1.67.36-2.02-.7-2.02-.7-.27-.7-.67-.88-.67-.88-.55-.37.04-.37.04-.37.6.04.92.62.92.62.54.92 1.4.66 1.75.5.05-.39.21-.66.38-.81-1.33-.15-2.73-.67-2.73-2.95 0-.65.23-1.19.62-1.6-.06-.16-.27-.78.06-1.62 0 0 .5-.16 1.65.61a5.7 5.7 0 0 1 3 0c1.15-.77 1.65-.61 1.65-.61.33.84.12 1.46.06 1.62.39.41.62.95.62 1.6 0 2.29-1.4 2.79-2.74 2.94.22.19.41.56.41 1.13v1.67c0 .16.11.35.41.29A6 6 0 0 0 12 6Z"
        fill="#fff"
      />
    </svg>
  );
}

export function IconStackedSquares(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#000" />
      <path d="M7 7h4v4H7V7Z" fill="#fff" />
      <path d="M13 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" fill="#fff" />
      <path d="M7 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fill="#fff" />
      <path d="M13 13h4v4h-4v-4Z" fill="#fff" />
    </svg>
  );
}

export function IconPenNib(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#0ACF83" />
      <circle cx="12" cy="8" r="3" fill="#A259FF" />
      <circle cx="12" cy="14" r="3" fill="#F24E1E" />
      <circle cx="8" cy="11" r="3" fill="#FF7262" />
    </svg>
  );
}

export function IconTriangleDrop(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#0061FE" />
      <path d="M7 8l5-3 5 3-5 3-5-3Z" fill="#fff" />
      <path d="M7 14l5 3 5-3-5-3-5 3Z" fill="#fff" />
    </svg>
  );
}

export function IconTrelloBoard(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0052CC" />
      <rect x="5.5" y="5.5" width="5.5" height="9" rx="1.2" fill="#fff" />
      <rect x="13" y="5.5" width="5.5" height="6" rx="1.2" fill="#fff" />
    </svg>
  );
}

export function IconAsanaOrbits(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="7" r="3" fill="#F06A6A" />
      <circle cx="7" cy="15" r="3" fill="#F06A6A" />
      <circle cx="17" cy="15" r="3" fill="#F06A6A" />
    </svg>
  );
}

export function IconVideoCamera(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="6" width="14" height="12" rx="3" fill="#2D8CFF" />
      <path d="M16 10.5 22 7v10l-6-3.5v-3Z" fill="#2D8CFF" />
    </svg>
  );
}

export function IconStripeCard(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#635BFF" />
      <path
        d="M11.8 9.4c0-.6.5-.9 1.3-.9 1 0 2.4.3 3.4.9V6.3a9 9 0 0 0-3.4-.6c-2.8 0-4.6 1.4-4.6 3.8 0 3.7 5.1 3.1 5.1 4.7 0 .7-.6 1-1.5 1-1.1 0-2.6-.5-3.7-1.1v3.3a9.7 9.7 0 0 0 3.7.8c2.9 0 4.7-1.4 4.7-3.8 0-4-5-3.3-5-4.9Z"
        fill="#fff"
      />
    </svg>
  );
}

export function IconEnvelopeChimp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#FFE01B" />
      <rect x="6" y="8" width="12" height="8" rx="2" fill="#241C15" />
      <path d="M6 8l6 4.5L18 8" stroke="#FFE01B" strokeWidth="1.5" />
    </svg>
  );
}

export function IconGameController(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="10" fill="#5865F2" />
      <circle cx="9" cy="12" r="1.6" fill="#fff" />
      <circle cx="15" cy="12" r="1.6" fill="#fff" />
      <path
        d="M8 8.5c2.7-1 5.3-1 8 0"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconCloudDoc(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#0F9D58" />
      <path d="M8 6h5l4 4v8H8V6Z" fill="#fff" />
      <path d="M13 6v4h4" fill="#0F9D58" stroke="#0F9D58" />
    </svg>
  );
}
