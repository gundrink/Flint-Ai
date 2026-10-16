"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
const FRAME_MS = 42;

type ScrambleTextProps = {
  text: string;
  className?: string;
  duration?: number;
};

export function ScrambleText({ text, className = "", duration = 900 }: ScrambleTextProps) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const totalFrames = Math.max(1, Math.round(duration / FRAME_MS));
    let frame = 0;

    const intervalId = window.setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / totalFrames) * text.length);
      setOutput(
        Array.from(text, (char, index) =>
          char === " " || char === "·" || index < revealed
            ? char
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!,
        ).join(""),
      );
      if (frame >= totalFrames) {
        window.clearInterval(intervalId);
        setOutput(text);
      }
    }, FRAME_MS);

    return () => window.clearInterval(intervalId);
  }, [text, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
