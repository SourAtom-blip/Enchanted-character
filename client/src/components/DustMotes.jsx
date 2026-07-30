import { useMemo } from 'react';

export default function DustMotes({ count = 30 }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      })),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {motes.map((m) => (
        <div
          key={m.id}
          className="mote"
          style={{
            width: `${m.size}px`,
            height: `${m.size}px`,
            left: `${m.left}vw`,
            top: `${m.top}vh`,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
