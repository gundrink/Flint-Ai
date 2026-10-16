/**
 * Orbit mark: hub + tilted orbital rings + satellite — reads at favicon and header sizes.
 * Uses currentColor so it inherits text color in the UI.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <g transform="rotate(-18 24 12)">
        <ellipse
          cx="24"
          cy="12"
          rx="18.5"
          ry="6.5"
          stroke="currentColor"
          strokeWidth="2.15"
        />
      </g>
      <g transform="rotate(24 24 12)">
        <ellipse
          cx="24"
          cy="12"
          rx="12"
          ry="4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeOpacity="0.72"
        />
      </g>
      <circle cx="24" cy="12" r="2.35" fill="currentColor" />
      <circle cx="39.2" cy="7.6" r="1.65" fill="currentColor" />
    </svg>
  );
}

/** Square mark for favicons, app icons, and compact UI slots. */
export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <g transform="rotate(-18 16 16)">
        <ellipse
          cx="16"
          cy="16"
          rx="12.5"
          ry="4.5"
          stroke="currentColor"
          strokeWidth="2.1"
        />
      </g>
      <g transform="rotate(24 16 16)">
        <ellipse
          cx="16"
          cy="16"
          rx="8.25"
          ry="2.85"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeOpacity="0.72"
        />
      </g>
      <circle cx="16" cy="16" r="2.85" fill="currentColor" />
      <circle cx="25.8" cy="10.2" r="2" fill="currentColor" />
    </svg>
  );
}
