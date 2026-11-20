import { useCallback, useEffect, useRef, useState } from 'react';

export interface ShadeOption {
  name: string;
  color: string;
  afterSrc: string;
  price?: number;
}

interface LipstickComparisonProps {
  beforeSrc: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
  shade?: string;
  shades?: ShadeOption[];
}

export default function LipstickComparison({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Natural bare lips — before lipstick',
  afterAlt = 'Lipstick applied — after',
  shade = 'Velours Nuit',
  shades,
}: LipstickComparisonProps) {
  const [position, setPosition] = useState(50); // 0–100%
  const [dragging, setDragging] = useState(false);
  const [activeShadeIndex, setActiveShadeIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentShade = shades && shades.length > 0 ? shades[activeShadeIndex] : null;
  const currentAfterSrc = currentShade ? currentShade.afterSrc : (beforeSrc);
  const currentBeforeSrc = afterSrc || beforeSrc;
  const currentShadeName = currentShade ? currentShade.name : shade;
  const currentPrice = currentShade?.price ?? 48;

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPosition(pct);
  }, []);

  /* ── Mouse ── */
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    updatePosition(e.clientX);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => updatePosition(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging, updatePosition]);

  /* ── Touch ── */
  const onTouchStart = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: TouchEvent) => {
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    };
    const onEnd = () => setDragging(false);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [dragging, updatePosition]);

  /* ── Click anywhere on container ── */
  const onContainerClick = (e: React.MouseEvent) => {
    if (!dragging) updatePosition(e.clientX);
  };

  return (
    <section className="comparison-section">
      {/* Shade Heading & Rectangle Color */}
      <div className="comparison-header">
        <h2 className="serif comparison-shade-heading">{currentShadeName}</h2>
        <div className="comparison-shade-rectangles">
          {shades && shades.length > 0 ? (
            shades.map((s, idx) => (
              <button
                key={s.name}
                type="button"
                className={`comparison-shade-rect ${idx === activeShadeIndex ? 'is-active' : ''}`}
                style={{ backgroundColor: s.color }}
                title={s.name}
                aria-label={`Select ${s.name}`}
                onClick={() => setActiveShadeIndex(idx)}
              />
            ))
          ) : (
            <div
              className="comparison-shade-rect is-active"
              style={{ backgroundColor: '#5a1724' }}
            />
          )}
        </div>
      </div>

      {/* Slider wrapper */}
      <div
        ref={containerRef}
        className={`comparison-wrap${dragging ? ' is-dragging' : ''}`}
        onClick={onContainerClick}
        aria-label="Before and after lipstick comparison. Drag slider to compare."
        role="img"
      >
        {/* Base layer */}
        <img
          src={currentAfterSrc}
          alt={beforeAlt}
          className="comparison-img comparison-img--before"
          draggable={false}
        />

        {/* Clipped overlay */}
        <div
          className="comparison-after-wrap"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={currentBeforeSrc}
            alt={afterAlt}
            className="comparison-img comparison-img--after"
            draggable={false}
          />
        </div>

        {/* Labels */}
        <span className="comparison-label comparison-label--before">Before</span>
        <span className="comparison-label comparison-label--after">After</span>

        {/* Divider line */}
        <div
          className="comparison-divider"
          style={{ left: `${position}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          role="slider"
          aria-label="Comparison slider"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 2));
            if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 2));
          }}
        >
          {/* Handle circle */}
          <div className="comparison-handle">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="10.5" fill="white" stroke="rgba(0,0,0,0.12)" />
              {/* Left arrow */}
              <path d="M8 11L5.5 11M5.5 11L7.5 9M5.5 11L7.5 13" stroke="#800020" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Right arrow */}
              <path d="M14 11L16.5 11M16.5 11L14.5 9M16.5 11L14.5 13" stroke="#800020" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
