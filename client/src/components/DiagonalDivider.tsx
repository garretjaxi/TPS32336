/*
   DiagonalDivider — Smooth SVG diagonal transitions between sections
   ============================================================= */

interface DiagonalDividerProps {
  direction?: "down" | "up";
  color1?: string;
  color2?: string;
  height?: number;
  className?: string;
}

export default function DiagonalDivider({
  direction = "down",
  color1 = "oklch(0.97 0.01 75)",
  color2 = "oklch(0.92 0.008 80)",
  height = 80,
  className = "",
}: DiagonalDividerProps) {
  const viewBox = `0 0 1200 ${height}`;
  
  // Create a diagonal path based on direction
  const pathData = direction === "down" 
    ? `M 0 0 L 1200 ${height} L 1200 0 Z`
    : `M 0 ${height} L 1200 0 L 1200 ${height} Z`;

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={`w-full block ${className}`}
      style={{ height: `${height}px` }}
    >
      <defs>
        <linearGradient id="diagonalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`var(--color-${color1})`} style={{ stopColor: `hsl(${color1})` }} />
          <stop offset="100%" stopColor={`var(--color-${color2})`} style={{ stopColor: `hsl(${color2})` }} />
        </linearGradient>
      </defs>
      <path d={pathData} fill={`hsl(${color1})`} />
    </svg>
  );
}
