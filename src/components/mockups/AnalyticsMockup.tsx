export function AnalyticsMockup() {
  const bars = [40, 65, 45, 80, 55, 90, 70];

  return (
    <div className="overflow-hidden rounded-xl border border-orange/10 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold">Analitica semanal</p>
        <span className="rounded-full bg-orange-container px-2 py-0.5 text-[10px] font-semibold text-orange-dark">
          +34%
        </span>
      </div>
      <div className="flex h-28 items-end justify-between gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full rounded-t bg-orange" style={{ height: `${h}%` }} />
            <span className="text-[8px] text-on-surface-variant">
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-orange-light p-2">
          <p className="text-[9px] text-on-surface-variant">Ingresos</p>
          <p className="text-sm font-bold text-orange">$48.2k</p>
        </div>
        <div className="rounded-lg bg-primary-fixed/20 p-2">
          <p className="text-[9px] text-on-surface-variant">Retencion</p>
          <p className="text-sm font-bold text-primary">68%</p>
        </div>
      </div>
    </div>
  );
}
