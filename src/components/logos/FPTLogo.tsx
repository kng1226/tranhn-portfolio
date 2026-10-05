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
 * FPTLogo
 *
 * Official FPT corporate mark:
 * Three distinct slanted solid leaf lozenges in official brand colors
 * (Blue #005BAA, Orange #F37021, Green #43B02A) with solid white italic
 * letterforms 'F', 'P', 'T', matching the uploaded asset with zero alteration.
 */
export const FPTLogo: React.FC<LogoProps> = ({ className = '', width = 140, height = 56 }) => {
  return (
    <svg
      viewBox="0 0 460 220"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Official FPT Logo"
    >
      {/* 1. BLUE LEAF WITH 'F' */}
      <g id="fpt-leaf-blue">
        <path
          d="M 64 36 C 85 36, 128 36, 150 36 C 162 36, 168 42, 164 56 L 124 186 C 120 198, 112 204, 98 204 L 24 204 C 10 204, 5 198, 8 186 L 36 72 C 40 46, 50 36, 64 36 Z"
          fill="#005BAA"
        />
        {/* Letter F */}
        <path
          d="M 60 76 C 68 74, 95 72, 122 72 C 134 72, 138 75, 134 85 C 130 96, 122 98, 110 98 L 90 98 L 82 122 L 105 122 C 114 122, 117 125, 114 135 C 110 144, 102 146, 92 146 L 72 146 L 56 195 C 52 202, 45 204, 36 204 C 28 204, 26 200, 29 190 L 51 98 C 54 84, 56 78, 60 76 Z"
          fill="#FFFFFF"
        />
      </g>

      {/* 2. ORANGE LEAF WITH 'P' */}
      <g id="fpt-leaf-orange">
        <path
          d="M 205 16 C 228 16, 274 16, 296 16 C 309 16, 316 22, 312 40 L 272 196 C 268 208, 258 214, 244 214 L 168 214 C 154 214, 148 208, 151 196 L 180 44 C 184 26, 192 16, 205 16 Z"
          fill="#F37021"
        />
        {/* Letter P */}
        <path
          d="M 197 74 C 208 72, 234 70, 258 70 C 276 70, 285 77, 281 95 C 275 118, 255 140, 230 140 L 208 140 L 194 195 C 190 202, 183 204, 174 204 C 166 204, 164 200, 167 190 L 190 98 C 193 84, 194 78, 197 74 Z M 216 118 L 227 118 C 240 118, 250 111, 254 98 C 256 89, 252 86, 243 86 C 236 86, 226 87, 220 88 L 216 118 Z"
          fill="#FFFFFF"
        />
      </g>

      {/* 3. GREEN LEAF WITH 'T' */}
      <g id="fpt-leaf-green">
        <path
          d="M 350 36 C 374 36, 420 36, 442 36 C 455 36, 460 42, 455 58 L 418 186 C 414 198, 404 204, 390 204 L 310 204 C 298 204, 292 198, 295 186 L 324 72 C 327 46, 337 36, 350 36 Z"
          fill="#43B02A"
        />
        {/* Letter T */}
        <path
          d="M 334 78 C 342 75, 374 72, 424 72 C 435 72, 442 76, 438 86 C 434 96, 426 98, 414 98 L 387 98 L 364 188 C 360 198, 353 202, 344 202 C 336 202, 334 198, 337 187 L 360 98 L 338 98 C 326 98, 322 94, 325 85 C 327 78, 330 78, 334 78 Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
};
