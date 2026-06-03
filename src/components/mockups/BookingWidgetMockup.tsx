export function BookingWidgetMockup() {
  return (
    <div className="mx-auto max-w-xs overflow-hidden rounded-xl border border-orange/15 bg-white shadow-sm">
      <div className="bg-orange px-4 py-3">
        <p className="text-xs font-bold text-white">Reserva tu mesa</p>
        <p className="text-[10px] text-white/80">Veridian Restaurant</p>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <label className="mb-1 block text-[9px] font-semibold text-on-surface-variant">Fecha</label>
          <div className="rounded-lg border border-orange/20 px-3 py-2 text-[10px]">15 Jun 2026</div>
        </div>
        <div>
          <label className="mb-1 block text-[9px] font-semibold text-on-surface-variant">Hora</label>
          <div className="flex flex-wrap gap-1">
            {['19:00', '19:30', '20:00', '20:30'].map((t, i) => (
              <span
                key={t}
                className={`rounded-md px-2 py-1 text-[9px] font-medium ${
                  i === 2 ? 'bg-orange text-white' : 'bg-orange-light text-on-surface-variant'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <button type="button" className="w-full rounded-lg bg-orange py-2 text-[10px] font-semibold text-white">
          Confirmar reserva
        </button>
      </div>
    </div>
  );
}
