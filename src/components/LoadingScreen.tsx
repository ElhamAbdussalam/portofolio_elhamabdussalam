"use client";

import { useState, useEffect, useRef } from "react";
import { Rocket, Package, Palette, Sparkles, Check } from "lucide-react";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
];

const TICKS = 60;

// Timeline (ms)
const DURATION = 2800; // 0 -> 100%
const HOLD = 450; // tahan napas sebelum meledak
const T_BURST = DURATION + HOLD;
const T_EXIT = T_BURST + 1500; // curtain mulai terbuka
const T_DONE = T_BURST + 2600; // unmount

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Pseudo-random deterministik (aman untuk SSR / hydration)
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Percikan api memanjang (streak)
const SPARKS = Array.from({ length: 44 }).map((_, i) => ({
  a: (i / 44) * 360 + rnd(i + 1) * 9,
  d: 180 + rnd(i * 2.1 + 3) * 340,
  len: 12 + Math.round(rnd(i * 3.3 + 5) * 18),
  dur: 0.7 + rnd(i * 4.7 + 7) * 0.7,
  delay: rnd(i * 5.9 + 2) * 0.1,
}));

// Serpihan yang terlempar lalu jatuh
const DEBRIS = Array.from({ length: 22 }).map((_, i) => {
  const angle = (i / 22) * Math.PI * 2 + rnd(i * 1.7 + 4) * 0.4;
  const dist = 90 + rnd(i * 2.9 + 8) * 230;
  return {
    dx: `${Math.cos(angle) * dist}px`,
    dy: `${Math.sin(angle) * dist}px`,
    size: 4 + Math.round(rnd(i * 3.1 + 6) * 7),
    rot: `${(rnd(i * 4.3 + 9) - 0.5) * 720}deg`,
    fall: `${60 + rnd(i * 5.3 + 1) * 170}px`,
    dur: `${1 + rnd(i * 6.1 + 3) * 0.8}s`,
    tone: i % 3,
  };
});

// Bara yang melayang naik setelah ledakan
const EMBERS = Array.from({ length: 14 }).map((_, i) => ({
  dx: `${(rnd(i * 2.3 + 1) - 0.5) * 360}px`,
  dy: `${(rnd(i * 3.7 + 2) - 0.5) * 200}px`,
  size: 2 + Math.round(rnd(i * 4.1 + 5) * 3),
  dur: `${1.6 + rnd(i * 5.5 + 7) * 1}s`,
  delay: `${0.15 + rnd(i * 6.7 + 4) * 0.4}s`,
}));

// Retakan yang muncul di lingkaran saat mau meledak
const CRACKS = Array.from({ length: 9 }).map((_, i) => {
  let a = (i / 9) * Math.PI * 2 + rnd(i * 5.1 + 2) * 0.5;
  let r = 14;
  let d = "";
  for (let s = 0; s < 5; s++) {
    const x = 80 + Math.cos(a) * r;
    const y = 80 + Math.sin(a) * r;
    d += `${s === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
    r += 11 + rnd(s * 7.1 + i * 3.3) * 7;
    a += (rnd(s * 3.7 + i * 1.9) - 0.5) * 0.55;
  }
  return d;
});

export default function LoadingScreen() {
  // progress: 0..1 (float, diperbarui tiap frame -> animasi halus)
  const [progress, setProgress] = useState(0);
  const [isBurst, setIsBurst] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Elemen yang dianimasikan langsung lewat ref (tanpa re-render)
  const screenRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowWRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  // Satu timeline rAF: progress, getaran, glow, burst, exit
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const motion = reduce ? 0 : 1;

    const start = performance.now();
    let last = start;
    let phase = 0;
    let burstFired = false;
    let exitFired = false;
    let raf = 0;

    const tick = (now: number) => {
      const t = now - start;
      const dt = Math.min(now - last, 50) / 1000;
      last = now;

      // Progress: cepat di awal, merayap di akhir (menambah ketegangan)
      const raw = clamp(t / DURATION);
      const p = 1 - Math.pow(1 - raw, 2.6);
      setProgress(p);

      // Intensitas getaran: kontinu dari charge -> hold -> ledakan -> meredam
      const charge = clamp((p - 0.5) / 0.5);
      const inHold = t >= DURATION && t < T_BURST;
      const afterBurst = t >= T_BURST;
      const holdT = clamp((t - DURATION) / HOLD);
      const s = Math.max(0, (t - T_BURST) / 1000);

      let I = charge * charge;
      if (inHold) I = 1 + 0.6 * holdT * holdT;
      if (afterBurst) I = 4.2 * Math.exp(-s * 4.2);

      // Fase getar diakumulasi -> frekuensi bisa naik tanpa lonjakan
      phase += dt * (24 + I * 22);
      const x = (Math.sin(phase) + 0.55 * Math.sin(phase * 2.3 + 1.1)) * 0.65;
      const y =
        (Math.cos(phase * 1.13) + 0.55 * Math.sin(phase * 1.9 + 0.7)) * 0.65;
      const r = Math.sin(phase * 1.7 + 2) * 0.35;

      if (screenRef.current) {
        screenRef.current.style.transform = `translate3d(${(x * I * 4.5 * motion).toFixed(2)}px, ${(y * I * 4.5 * motion).toFixed(2)}px, 0) rotate(${(r * I * 0.5 * motion).toFixed(3)}deg)`;
      }
      if (circleRef.current) {
        const m = afterBurst ? 0.3 : 1;
        circleRef.current.style.transform = `translate3d(${(x * I * 8 * m * motion).toFixed(2)}px, ${(y * I * 8 * m * motion).toFixed(2)}px, 0)`;
      }

      // Skala ring (berdenyut halus saat hold), dilepas ke CSS saat meledak
      if (ringRef.current) {
        ringRef.current.style.transform = afterBurst
          ? ""
          : `scale(${(1 + charge * 0.045 + (inHold ? 0.03 * Math.sin(phase * 2) * holdT : 0)).toFixed(4)})`;
      }

      // Glow & vignette
      let glowA = charge * 0.9;
      let glowW = 0;
      let vig = charge * 0.9;
      if (inHold) {
        glowA = lerp(0.9, 1, holdT);
        glowW = holdT * holdT * 0.85;
        vig = lerp(0.9, 1, holdT);
      }
      if (afterBurst) {
        glowA = Math.exp(-s * 6);
        glowW = 0.85 * Math.exp(-s * 7);
        vig = Math.exp(-s * 3.5);
      }
      if (glowARef.current) glowARef.current.style.opacity = glowA.toFixed(3);
      if (glowWRef.current) glowWRef.current.style.opacity = glowW.toFixed(3);
      if (vignetteRef.current)
        vignetteRef.current.style.opacity = vig.toFixed(3);

      // Event
      if (!burstFired && t >= T_BURST) {
        burstFired = true;
        setIsBurst(true);
      }
      if (!exitFired && t >= T_EXIT) {
        exitFired = true;
        setIsExiting(true);
      }
      if (t >= T_DONE) {
        setIsLoading(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Rotate roles
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 600);
    return () => clearInterval(roleTimer);
  }, []);

  if (!isLoading) return null;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const pct = Math.round(progress * 100);

  const burst = isBurst;
  const heat = clamp((progress - 0.7) / 0.3); // 0 -> 1 mendekati 100%
  const crackProgress = clamp((progress - 0.72) / 0.28);

  const progressColor = `rgb(${Math.round(lerp(251, 253, heat))}, ${Math.round(
    lerp(191, 230, heat),
  )}, ${Math.round(lerp(36, 138, heat))})`;
  const numberColor = `rgb(${Math.round(lerp(245, 254, heat))}, ${Math.round(
    lerp(245, 243, heat),
  )}, ${Math.round(lerp(244, 199, heat))})`;

  const stage =
    pct < 25
      ? { Icon: Rocket, text: "Initializing..." }
      : pct < 50
        ? { Icon: Package, text: "Loading components..." }
        : pct < 75
          ? { Icon: Palette, text: "Preparing UI..." }
          : !burst
            ? { Icon: Sparkles, text: "Almost ready..." }
            : { Icon: Check, text: "Welcome!" };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
        isExiting ? "pointer-events-none" : ""
      }`}
    >
      {/* Curtain panels */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-stone-950 border-b border-stone-800/60 transition-transform duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-stone-950 border-t border-stone-800/60 transition-transform duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${
          isExiting ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Vignette panas */}
      <div
        ref={vignetteRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(251,191,36,0.22) 100%)",
        }}
      />

      {/* Flash cahaya dari pusat ledakan (mekar lalu memudar pelan) */}
      {burst && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 animate-screen-flash"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(255,251,235,0.95) 0%, rgba(254,243,199,0.8) 35%, rgba(253,230,138,0.45) 70%, rgba(251,191,36,0.2) 100%)",
          }}
        />
      )}

      {/* Wrapper exit (fade + sedikit zoom) */}
      <div
        className={`absolute inset-0 animate-enter transition-[opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isExiting ? "opacity-0 scale-[1.06]" : "opacity-100 scale-100"
        }`}
      >
        {/* Layer yang bergetar seperti layar */}
        <div
          ref={screenRef}
          className="absolute inset-0 flex items-center justify-center will-change-transform"
        >
          {/* Dot grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(rgba(168,162,158,0.18) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 60% 55% at 50% 50%, black 25%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 55% at 50% 50%, black 25%, transparent 100%)",
            }}
          />

          {/* Soft glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-3xl animate-float-delayed" />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center px-4">
            {/* Circular progress */}
            <div
              ref={circleRef}
              className="relative mb-10 will-change-transform"
            >
              <div className="absolute inset-4 rounded-full bg-amber-400/10 blur-2xl animate-pulse-glow" />

              {/* Glow panas (amber -> putih) */}
              <div
                ref={glowARef}
                className="absolute -inset-4 rounded-full blur-3xl"
                style={{ opacity: 0, background: "rgba(252,211,77,0.32)" }}
              />
              <div
                ref={glowWRef}
                className="absolute -inset-4 rounded-full blur-3xl"
                style={{ opacity: 0, background: "rgba(254,243,199,0.6)" }}
              />

              {/* Ring + retakan */}
              <div
                ref={ringRef}
                className={`relative will-change-transform ${
                  burst ? "animate-ring-burst" : ""
                }`}
              >
                <svg
                  className="transform -rotate-90 w-60 h-60"
                  viewBox="0 0 160 160"
                >
                  {/* Tick marks (menyala halus satu per satu) */}
                  {Array.from({ length: TICKS }).map((_, i) => {
                    const angle = (i / TICKS) * Math.PI * 2;
                    const long = i % 5 === 0;
                    const lit = clamp(progress * TICKS - i);
                    const r = Math.round(lerp(120, 251, lit));
                    const g = Math.round(lerp(113, 191, lit));
                    const b = Math.round(lerp(108, 36, lit));
                    const a = lerp(0.35, 0.9, lit).toFixed(2);
                    return (
                      <line
                        key={i}
                        x1={80 + Math.cos(angle) * 75}
                        y1={80 + Math.sin(angle) * 75}
                        x2={80 + Math.cos(angle) * (long ? 79 : 77.5)}
                        y2={80 + Math.sin(angle) * (long ? 79 : 77.5)}
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        stroke={`rgba(${r},${g},${b},${a})`}
                      />
                    );
                  })}

                  {/* Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="rgba(120, 113, 108, 0.2)"
                    strokeWidth="3"
                    fill="none"
                  />

                  {/* Progress */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke={progressColor}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>

                {/* Retakan */}
                <svg
                  aria-hidden
                  className="pointer-events-none absolute inset-0 w-60 h-60"
                  viewBox="0 0 160 160"
                >
                  {CRACKS.map((d, i) => (
                    <path
                      key={i}
                      d={d}
                      pathLength={1}
                      fill="none"
                      stroke="rgba(254,240,138,0.95)"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={1}
                      strokeDashoffset={1 - crackProgress}
                      style={{
                        filter: "drop-shadow(0 0 2px rgba(251,191,36,0.9))",
                      }}
                    />
                  ))}
                </svg>
              </div>

              {/* LEDAKAN */}
              {burst && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                >
                  {/* Bola api */}
                  <div
                    className="absolute -inset-24 rounded-full animate-flash"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,251,235,1) 0%, rgba(253,230,138,0.85) 22%, rgba(251,191,36,0.35) 45%, transparent 70%)",
                    }}
                  />

                  {/* Gelombang kejut */}
                  <div
                    className="absolute inset-0 rounded-full border-4 border-amber-300 animate-shockwave"
                    style={{ "--s": "6" } as React.CSSProperties}
                  />
                  <div
                    className="absolute inset-0 rounded-full border-2 border-stone-100/70 animate-shockwave"
                    style={
                      {
                        "--s": "8.5",
                        animationDelay: "90ms",
                      } as React.CSSProperties
                    }
                  />
                  <div
                    className="absolute inset-0 rounded-full border border-amber-400/60 animate-shockwave"
                    style={
                      {
                        "--s": "11",
                        animationDelay: "200ms",
                      } as React.CSSProperties
                    }
                  />

                  {/* Percikan memanjang */}
                  {SPARKS.map((s, i) => (
                    <span
                      key={`s${i}`}
                      className="absolute left-1/2 top-1/2 w-[2px] rounded-full bg-gradient-to-t from-transparent to-amber-200 animate-spark"
                      style={
                        {
                          height: s.len,
                          "--a": `${s.a}deg`,
                          "--d": `${s.d}px`,
                          animationDuration: `${s.dur}s`,
                          animationDelay: `${s.delay}s`,
                        } as React.CSSProperties
                      }
                    />
                  ))}

                  {/* Serpihan */}
                  {DEBRIS.map((p, i) => (
                    <span
                      key={`d${i}`}
                      className={`absolute left-1/2 top-1/2 rounded-[2px] animate-debris ${
                        p.tone === 0
                          ? "bg-amber-400"
                          : p.tone === 1
                            ? "bg-amber-200"
                            : "bg-stone-300"
                      }`}
                      style={
                        {
                          width: p.size,
                          height: p.size,
                          "--dx": p.dx,
                          "--dy": p.dy,
                          "--rot": p.rot,
                          "--fall": p.fall,
                          animationDuration: p.dur,
                        } as React.CSSProperties
                      }
                    />
                  ))}

                  {/* Bara melayang */}
                  {EMBERS.map((e, i) => (
                    <span
                      key={`e${i}`}
                      className="absolute left-1/2 top-1/2 rounded-full bg-amber-300 shadow-[0_0_8px_2px_rgba(251,191,36,0.7)] animate-ember"
                      style={
                        {
                          width: e.size,
                          height: e.size,
                          "--dx": e.dx,
                          "--dy": e.dy,
                          animationDuration: e.dur,
                          animationDelay: e.delay,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              )}

              {/* Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className={`flex items-start font-mono tabular-nums ${
                    burst ? "animate-number-pop" : "animate-number-pulse"
                  }`}
                  style={{ color: numberColor }}
                >
                  <span className="text-6xl font-bold leading-none">{pct}</span>
                  <span className="mt-1 ml-0.5 text-lg text-amber-400">%</span>
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="text-center animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight text-stone-100">
                M Elham <span className="text-amber-400">Abdussalam</span>
              </h1>

              <div className="h-6 overflow-hidden mb-3">
                <p
                  key={currentRoleIndex}
                  className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500 animate-role-slide"
                >
                  {roles[currentRoleIndex]}
                </p>
              </div>

              <div
                key={stage.text}
                className="flex items-center justify-center gap-2 text-stone-400 text-sm font-medium animate-stage"
              >
                <stage.Icon className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>{stage.text}</span>
              </div>
            </div>

            {/* Segment indicators */}
            <div className="flex gap-3 mt-6">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-700 ease-out ${
                    pct > index * 33 ? "w-12 bg-amber-400" : "w-8 bg-stone-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes enter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes stage {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        @keyframes number-pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }

        @keyframes role-slide {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        /* Cahaya mekar cepat lalu memudar panjang */
        @keyframes screen-flash {
          0% {
            opacity: 0;
          }
          9% {
            opacity: 1;
          }
          32% {
            opacity: 0.45;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes ring-burst {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          12% {
            transform: scale(0.92);
            opacity: 1;
          }
          45% {
            opacity: 0.9;
          }
          100% {
            transform: scale(2.1);
            opacity: 0;
          }
        }

        @keyframes shockwave {
          0% {
            transform: scale(0.4);
            opacity: 0.95;
          }
          100% {
            transform: scale(var(--s));
            opacity: 0;
          }
        }

        @keyframes flash {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          18% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(2.4);
          }
        }

        @keyframes spark {
          0% {
            transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)
              scaleY(0.4);
            opacity: 1;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--a))
              translateY(calc(var(--d) * -1)) scaleY(0.3);
            opacity: 0;
          }
        }

        @keyframes debris {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg)
              scale(1);
            opacity: 1;
          }
          55% {
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy))
              rotate(var(--rot)) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%)
              translate(calc(var(--dx) * 1.12), calc(var(--dy) + var(--fall)))
              rotate(calc(var(--rot) * 1.6)) scale(0.4);
            opacity: 0;
          }
        }

        @keyframes ember {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 0;
          }
          12% {
            opacity: 0.95;
          }
          100% {
            transform: translate(-50%, -50%)
              translate(var(--dx), calc(var(--dy) - 130px)) scale(0);
            opacity: 0;
          }
        }

        @keyframes number-pop {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-enter {
          animation: enter 0.6s ease-out both;
        }

        .animate-stage {
          animation: stage 0.35s ease-out both;
        }

        .animate-screen-flash {
          animation: screen-flash 1.3s cubic-bezier(0.2, 0.6, 0.3, 1) both;
        }

        .animate-ring-burst {
          animation: ring-burst 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-shockwave {
          animation: shockwave 1.2s cubic-bezier(0.15, 0.6, 0.3, 1) both;
        }

        .animate-flash {
          animation: flash 0.9s ease-out both;
        }

        .animate-spark {
          animation: spark 0.9s cubic-bezier(0.1, 0.7, 0.3, 1) both;
        }

        .animate-debris {
          animation: debris 1.2s cubic-bezier(0.15, 0.7, 0.35, 1) both;
        }

        .animate-ember {
          animation: ember 1.8s ease-out both;
        }

        .animate-number-pop {
          animation: number-pop 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-number-pulse {
          animation: number-pulse 2s ease-in-out infinite;
        }

        .animate-role-slide {
          animation: role-slide 600ms ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-float-delayed,
          .animate-pulse-glow,
          .animate-screen-flash,
          .animate-number-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
