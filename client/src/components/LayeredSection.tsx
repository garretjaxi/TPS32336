/*
   LayeredSection — Wrapper component for layered section transitions
   ============================================================= */

import React from "react";

interface LayeredSectionProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  zIndex?: number;
  overlap?: boolean;
  overlapAmount?: number;
  dividerColor?: string;
}

export default function LayeredSection({
  children,
  className = "",
  bgColor = "bg-white",
  zIndex = 0,
  overlap = false,
  overlapAmount = 40,
  dividerColor = "oklch(0.92 0.015 75)",
}: LayeredSectionProps) {
  return (
    <section
      className={`relative ${bgColor} ${className}`}
      style={{
        zIndex: zIndex,
        marginTop: overlap ? `-${overlapAmount}px` : "0",
        paddingTop: overlap ? `${overlapAmount + 24}px` : "0",
        boxShadow: overlap ? "0 -10px 30px rgba(0, 0, 0, 0.08)" : "none",
      }}
    >
      {children}
    </section>
  );
}
