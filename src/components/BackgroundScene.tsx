/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

/**
 * BackgroundScene
 *
 * Maps each of the 5 portfolio sections to its own background image folder (1–5),
 * each containing 300 frames. As the user scrolls through a section, the frames
 * for that section play. Sections are separated cleanly with no bleed.
 *
 * Section → Folder mapping:
 *   Journey     (#top)                → /1/  (frames 001–300)
 *   Experience  (#experience-section) → /2/  (frames 001–300)
 *   Projects    (#projects-section)   → /3/  (frames 001–300)
 *   Designs     (#designs-section)    → /4/  (frames 001–300)
 *   About       (#epilogue-section)   → /5/  (frames 001–300)
 */

const SECTION_IDS = [
  'top',
  'experience-section',
  'projects-section',
  'designs-section',
  'epilogue-section',
] as const;

const FRAMES_PER_SECTION = 300;

export const BackgroundScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Helpers ────────────────────────────────────────────────────────────────

    /** True absolute top of element relative to document (ignoring current scroll) */
    const getAbsoluteTop = (el: HTMLElement): number => {
      let top = 0;
      let node: HTMLElement | null = el;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return top;
    };

    // ── Canvas size ────────────────────────────────────────────────────────────

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      recomputeBoundaries();
      renderCurrent();
    };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', resize, { passive: true });

    // ── Section boundaries (absolute document positions) ──────────────────────

    interface Boundary { top: number; height: number }
    let boundaries: Boundary[] = [];

    const recomputeBoundaries = () => {
      boundaries = SECTION_IDS.map(id => {
        const el = document.getElementById(id);
        if (!el) return { top: 0, height: 0 };
        return { top: getAbsoluteTop(el), height: el.offsetHeight };
      });
    };

    // Compute once after first paint; sections need to be in DOM
    // We defer slightly so React has finished laying out
    const initTimer = setTimeout(() => recomputeBoundaries(), 300);

    // ── Image cache: cache[folder][frame] ──────────────────────────────────────

    type Cache = Record<number, Record<number, HTMLImageElement>>;
    const cache: Cache = {};
    for (let f = 1; f <= 5; f++) cache[f] = {};

    const getPath = (folder: number, frame: number) =>
      `/${folder}/ezgif-frame-${frame.toString().padStart(3, '0')}.jpg`;

    // ── Render ─────────────────────────────────────────────────────────────────

    let currentFolder = 1;
    let currentFrame = 1;

    const drawImage = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const cr = cw / ch;
      const ir = img.naturalWidth / img.naturalHeight;
      let w: number, h: number, x: number, y: number;
      if (cr > ir) {
        w = cw; h = cw / ir; x = 0; y = (ch - h) / 2;
      } else {
        w = ch * ir; h = ch; x = (cw - w) / 2; y = 0;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    };

    const renderFrame = (folder: number, frame: number) => {
      const img = cache[folder]?.[frame];
      if (img?.complete && img.naturalWidth > 0) {
        currentFolder = folder;
        currentFrame = frame;
        drawImage(img);
      } else if (!cache[folder]?.[frame]) {
        const newImg = new Image();
        newImg.src = getPath(folder, frame);
        if (!cache[folder]) cache[folder] = {};
        cache[folder][frame] = newImg;
        newImg.onload = () => {
          // Only paint if this is still the active frame
          if (currentFolder === folder && currentFrame === frame) {
            drawImage(newImg);
          }
        };
      }
    };

    const renderCurrent = () => renderFrame(currentFolder, currentFrame);

    // ── Preload all sections lazily ────────────────────────────────────────────

    const preloadAll = async () => {
      for (let folder = 1; folder <= 5; folder++) {
        for (let frame = 1; frame <= FRAMES_PER_SECTION; frame++) {
          if (!cache[folder]?.[frame]) {
            const img = new Image();
            img.src = getPath(folder, frame);
            cache[folder][frame] = img;
          }
          if (frame % 30 === 0) {
            await new Promise<void>(r => setTimeout(r, 5));
          }
        }
      }
    };

    // Boot: show frame 1/1 immediately then preload everything
    const boot = new Image();
    boot.src = getPath(1, 1);
    boot.onload = () => {
      cache[1][1] = boot;
      drawImage(boot);
      preloadAll();
    };

    // ── Scroll mapping ─────────────────────────────────────────────────────────

    const frameForScroll = (scrollY: number): { folder: number; frame: number } => {
      if (!boundaries.length) return { folder: 1, frame: 1 };

      for (let i = 0; i < boundaries.length; i++) {
        const { top, height } = boundaries[i];
        const bottom = top + height;

        // We're inside this section if scrollY hasn't yet reached the bottom of this section
        if (scrollY < bottom || i === boundaries.length - 1) {
          // Map progress based on the section's travel through the viewport
          // Starts when section top hits viewport bottom (scrollY = top - windowHeight)
          // Ends when section bottom hits viewport top (scrollY = top + height)
          const windowHeight = window.innerHeight;
          const startScroll = Math.max(0, top - windowHeight);
          const endScroll = bottom;
          const scrollable = endScroll - startScroll;
          
          let progress = 0;
          if (scrollable > 0) {
             progress = Math.max(0, Math.min(1, (scrollY - startScroll) / scrollable));
          }
          const frame = Math.max(1, Math.min(FRAMES_PER_SECTION, Math.floor(progress * FRAMES_PER_SECTION) + 1));
          return { folder: i + 1, frame };
        }
      }

      return { folder: 5, frame: FRAMES_PER_SECTION };
    };

    // ── Eased scroll animation loop ────────────────────────────────────────────

    let targetScroll = window.scrollY;
    let easedScroll = window.scrollY;
    const EASE = 0.08;
    let raf: number;

    window.addEventListener('scroll', () => { targetScroll = window.scrollY; }, { passive: true });

    const tick = () => {
      easedScroll += (targetScroll - easedScroll) * EASE;
      const { folder, frame } = frameForScroll(easedScroll);
      renderFrame(folder, frame);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ── Cleanup ────────────────────────────────────────────────────────────────

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none select-none bg-black"
      aria-hidden="true"
    >
      {/* 
        Slightly scale and shift the canvas to push the ezgif watermark 
        at the bottom right completely out of the visible viewport. 
      */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block scale-[1.06] origin-center translate-x-[1.5%] translate-y-[1.5%]" 
      />
    </div>
  );
};
