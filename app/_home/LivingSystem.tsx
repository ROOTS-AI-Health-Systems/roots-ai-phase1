'use client';

/**
 * Living Biological Intelligence System™ — orbital expression.
 *
 * Composition (per the reference image supplied on 10 Sep 2026): a navy panel with a
 * faint perspective grid, two slowly turning teal orbits, the Biological State core
 * inside an orange ring and gold ring, and the seven domains as haloed nodes.
 * Colours are approved tokens only.
 *
 * Interaction: hover or keyboard focus previews a domain; a click or tap pins it.
 * The pinned or previewed domain opens a card beside its node with the governed name
 * and description from the content contract (Z05). Escape or a click outside closes it.
 *
 * Motion: the wake sequence (core, orbits, nodes) runs on load or on scroll into view.
 * The orbit rotation is ambient and switches off under prefers-reduced-motion.
 *
 * Each node is driven by a real <button> laid over it: Safari ignores tabindex on SVG
 * elements, and the buttons keep a 44px target at every size.
 */

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import styles from '../page.module.css';
import { CORE, DOMAINS, type Domain } from './content';

const VIEW = { x: -280, y: -280, w: 560, h: 560 };
const CORE_Y = -20;
const NODE_R = 26;

/** Node placement and ring colour per domain code (approved palette only). */
const LAYOUT: Record<string, { x: number; y: number; ring: string }> = {
  MR: { x: -172, y: -146, ring: '#4F8F86' }, // Metabolic Resistance
  HS: { x: -42, y: -204, ring: '#C7A45B' }, // Hunger & Satiety Signals
  SR: { x: 155, y: -169, ring: '#D1D5DB' }, // Sleep Recovery Index
  CH: { x: 189, y: -26, ring: '#4F8F86' }, // Circadian Health Score
  SL: { x: 141, y: 142, ring: '#E67E22' }, // Stress Load
  IB: { x: -27, y: 170, ring: '#C7A45B' }, // Inflammation Burden Index
  BS: { x: -176, y: 132, ring: '#27AE60' }, // Biological Safety Signals
};

/** Perspective floor: horizontals get further apart towards the viewer. */
const GRID_Y0 = 70;
const GRID_H = [70, 92, 118, 150, 188, 232, 280];
const VANISH_Y = -60;
const GRID_V = [-640, -480, -320, -160, 0, 160, 320, 480, 640].map((xb) => {
  const t = (GRID_Y0 - VANISH_Y) / (280 - VANISH_Y);
  return { x1: xb * t, y1: GRID_Y0, x2: xb, y2: 280 };
});

const pct = (v: number, min: number, size: number) => ((v - min) / size) * 100;

type FocusState = 'rest' | 'active' | 'dim';

export default function LivingSystem({
  /** 'load' wakes on first paint; 'view' wakes when its section scrolls in. */
  wake,
}: {
  wake: 'load' | 'view';
}) {
  const [previewed, setPreviewed] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const clipId = `lbis-clip-${uid}`;
  const tipId = `lbis-tip-${uid}`;

  const activeCode = pinned ?? previewed;
  const active: Domain | undefined = DOMAINS.find((d) => d.code === activeCode);

  const stateOf = (code: string): FocusState =>
    activeCode === null ? 'rest' : activeCode === code ? 'active' : 'dim';

  // A click or tap outside the system closes a pinned card.
  useEffect(() => {
    if (!pinned) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setPinned(null);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [pinned]);

  const tip = (() => {
    if (!active) return null;
    const p = LAYOUT[active.code];
    const x = pct(p.x, VIEW.x, VIEW.w);
    const y = pct(p.y, VIEW.y, VIEW.h);
    // Top-half nodes open the card below (clear of the label); bottom-half nodes open it above.
    const below = p.y < CORE_Y;
    const offset = ((below ? NODE_R + 30 : NODE_R + 10) / VIEW.h) * 100;
    // '--x' is a CSS custom property, which CSSProperties does not list.
    const style = {
      '--x': `${x}%`,
      ...(below ? { top: `calc(${y}% + ${offset}%)` } : { bottom: `calc(${100 - y}% + ${offset}%)` }),
    } as unknown as CSSProperties;
    return { style, below };
  })();

  return (
    <div
      ref={containerRef}
      className={styles.system}
      data-wake={wake}
      role="group"
      aria-label={CORE.label}
    >
      <svg
        className={styles.systemSvg}
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} rx={16} />
          </clipPath>
        </defs>

        {/* Panel */}
        <rect
          x={VIEW.x}
          y={VIEW.y}
          width={VIEW.w}
          height={VIEW.h}
          rx={16}
          fill="#1A2A4A"
          stroke="#2A4060"
          strokeWidth={1.5}
        />

        <g clipPath={`url(#${clipId})`}>
          {/* Perspective floor */}
          <g className={`${styles.wakeBundle} ${styles.orbitGrid}`}>
            {GRID_H.map((y) => (
              <line key={`h${y}`} x1={VIEW.x} y1={y} x2={VIEW.x + VIEW.w} y2={y} />
            ))}
            {GRID_V.map((l) => (
              <line key={`v${l.x2}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </g>

          {/* Two orbits, turning slowly in opposite directions */}
          <g className={styles.wakeBundle}>
            <g className={styles.orbitA}>
              <ellipse cx={0} cy={CORE_Y} rx={215} ry={118} transform={`rotate(-24 0 ${CORE_Y})`} />
            </g>
            <g className={styles.orbitB}>
              <ellipse cx={0} cy={CORE_Y} rx={178} ry={140} transform={`rotate(-48 0 ${CORE_Y})`} />
            </g>
          </g>
        </g>

        {/* Core — Biological State */}
        <g className={styles.wakeCore} style={{ transformOrigin: `0px ${CORE_Y}px` }}>
          <circle cx={0} cy={CORE_Y} r={108} fill="none" stroke="#E67E22" strokeWidth={1.25} opacity={0.75} />
          <circle cx={0} cy={CORE_Y} r={84} fill="#FFFFFF" opacity={0.05} />
          <circle cx={0} cy={CORE_Y} r={70} fill="#1A2A4A" stroke="#C7A45B" strokeWidth={2.5} />
          {/* Sizes come from CSS so each line is at least 12px on screen; the reading is
              set on two lines so it stays inside the gold ring at that size. */}
          <text
            x={0}
            y={CORE_Y - 30}
            className={styles.lbisCoreEyebrow}
            fontWeight={700}
            fill="#D8DEE8"
            textAnchor="middle"
          >
            BIOLOGICAL
          </text>
          <text x={0} y={CORE_Y - 2} className={styles.lbisCoreTitle} fontWeight={700} fill="#FFFFFF" textAnchor="middle">
            STATE
          </text>
          {CORE.reading.split(' · ').map((line, i) => (
            <text
              key={line}
              x={0}
              y={CORE_Y + 24 + i * 22}
              className={styles.lbisCoreReading}
              fontWeight={600}
              fill="#C7A45B"
              textAnchor="middle"
            >
              {line}
            </text>
          ))}
        </g>

        {/* Seven domains */}
        {DOMAINS.map((d, i) => {
          const p = LAYOUT[d.code];
          const state = stateOf(d.code);
          return (
            <g key={d.code} className={styles.wakeNode} style={{ '--i': i } as CSSProperties}>
              <g
                className={styles.nodeMark}
                data-state={state}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              >
                <circle className={styles.nodeHalo} cx={p.x} cy={p.y} r={NODE_R + 7} fill="#FFFFFF" opacity={0.08} />
                <circle cx={p.x} cy={p.y} r={NODE_R} fill="#FFFFFF" stroke={p.ring} strokeWidth={3} />
                <text
                  x={p.x}
                  y={p.y}
                  className={styles.lbisCode}
                  fontWeight={700}
                  fill="#1A2A4A"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {d.code}
                </text>
                <text
                  x={p.x}
                  y={p.y + NODE_R + 7}
                  className={styles.lbisLabel}
                  fontWeight={600}
                  fill="#D8DEE8"
                  textAnchor="middle"
                  dominantBaseline="hanging"
                >
                  {d.label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Control layer: real buttons, natively focusable, 44px minimum. */}
      <div className={styles.systemControls}>
        {DOMAINS.map((d) => {
          const p = LAYOUT[d.code];
          return (
            <button
              key={d.code}
              type="button"
              className={styles.domainControl}
              style={{ left: `${pct(p.x, VIEW.x, VIEW.w)}%`, top: `${pct(p.y, VIEW.y, VIEW.h)}%` }}
              aria-label={`${d.name}: ${d.body}`}
              aria-pressed={pinned === d.code}
              aria-controls={tipId}
              onMouseEnter={() => setPreviewed(d.code)}
              onMouseLeave={() => setPreviewed(null)}
              onFocus={() => setPreviewed(d.code)}
              onBlur={() => setPreviewed(null)}
              onClick={() => {
                // A second click closes the card, even while the node keeps focus or hover.
                if (pinned === d.code) {
                  setPinned(null);
                  setPreviewed(null);
                } else {
                  setPinned(d.code);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setPinned(null);
                  setPreviewed(null);
                }
              }}
            />
          );
        })}
      </div>

      {/* Domain card: the governed name and description (contract Z05). */}
      {active && tip && (
        <div
          id={tipId}
          key={active.code}
          className={styles.domainTip}
          data-placement={tip.below ? 'below' : 'above'}
          style={tip.style}
          aria-hidden="true"
        >
          <p className={styles.domainTipCode}>
            {active.code} · {active.label}
          </p>
          <p className={styles.domainTipName}>{active.name}</p>
          <p className={styles.domainTipBody}>{active.body}</p>
        </div>
      )}
    </div>
  );
}
