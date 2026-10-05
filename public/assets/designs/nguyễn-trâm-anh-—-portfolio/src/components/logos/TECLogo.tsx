/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * TECLogo
 *
 * Official Tomorrow Entrepreneurs Club (TEC FTU) emblem:
 * Circular frame with the distinctive geometric sail / fin motif,
 * horizontal base slit, and Foreign Trade University club identity.
 * Replicated with exact fidelity to the uploaded asset.
 */
export const TECLogo: React.FC<LogoProps> = ({ className = '', width = 56, height = 56 }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Tomorrow Entrepreneurs Club TEC FTU Official Logo"
    >
      {/* Crisp White Circular Background */}
      <circle cx="100" cy="100" r="97" fill="#FFFFFF" />

      {/* Royal Blue Circular Outer Ring */}
      <circle
        cx="100"
        cy="100"
        r="92"
        stroke="#1A4A94"
        strokeWidth="6.5"
        fill="none"
      />

      {/* Main Triangular Sail Body (Curved Hypotenuse / Fin) */}
      {/* Base from x=45 to x=155, top apex at x=165, y=48 */}
      <path
        d="M 46 142 L 157 142 C 150 135 145 110 148 85 C 152 68 160 55 166 48 C 145 74 100 115 46 142 Z"
        fill="#1A4A94"
      />

      {/* Horizontal Slit White Space between Sail and Base Runner */}
      {/* Thin line separating base and main fin */}
      <line
        x1="45"
        y1="144"
        x2="158"
        y2="144"
        stroke="#FFFFFF"
        strokeWidth="2.5"
      />

      {/* Bottom Horizontal Base Strip / Keel */}
      <polygon
        points="38,148 164,148 158,144 44,144"
        fill="#1A4A94"
      />
    </svg>
  );
};
