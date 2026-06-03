export function CalendarMockup() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const booked = [3, 5, 8, 12, 15, 19, 22, 26];

  return (
    <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-4 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold text-on-surface">Junio 2026</p>
        <div className="flex gap-1">
          <button type="button" className="rounded px-2 py-0.5 text-[10px] text-on-surface-variant">
            &lt;
          </button>
          <button type="button" className="rounded px-2 py-0.5 text-[10px] text-on-surface-variant">
            &gt;
          </button>
        </div>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[8px] font-semibold text-on-surface-variant">
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day}
            className={`flex h-7 items-center justify-center rounded-md text-[10px] ${
              booked.includes(day)
                ? 'bg-orange text-white font-semibold'
                : day === 15
                  ? 'ring-2 ring-orange bg-orange-light font-semibold text-orange-dark'
                  : 'text-on-surface-variant'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1">
        {['19:00 — 4 personas', '20:30 — 2 personas'].map((slot) => (
          <div key={slot} className="rounded-lg bg-surface-container-low px-2 py-1 text-[9px] text-on-surface">
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
}
