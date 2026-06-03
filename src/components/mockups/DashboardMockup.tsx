export function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-orange/15 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-orange/10 bg-orange-light px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-error/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-orange" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary-fixed-dim" />
        </div>
        <span className="ml-2 text-xs font-semibold text-orange-dark">Tabi OS — Dashboard</span>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4">
        <div className="col-span-3 space-y-1.5">
          {['Reservas', 'Mesas', 'Clientes', 'Analitica'].map((item, i) => (
            <div
              key={item}
              className={`rounded-lg px-2.5 py-2 text-[11px] font-medium ${i === 0 ? 'bg-orange text-white' : 'text-on-surface-variant'}`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="col-span-9 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Hoy', value: '47' },
              { label: 'Ocupacion', value: '87%' },
              { label: 'Ingresos', value: '$12.4k' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-orange-light p-2.5">
                <p className="text-[10px] text-on-surface-variant">{stat.label}</p>
                <p className="font-display text-base font-bold text-orange">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-surface-variant p-3">
            <p className="mb-2 text-[10px] font-semibold text-on-surface-variant">Reservas de hoy</p>
            <div className="space-y-1.5">
              {[
                { time: '19:00', name: 'Ana R.', guests: 4, status: 'Confirmada' },
                { time: '19:30', name: 'Carlos M.', guests: 2, status: 'En camino' },
              ].map((r) => (
                <div key={r.time} className="flex items-center justify-between rounded-md bg-white px-2 py-1.5 text-[10px]">
                  <span className="font-semibold text-orange">{r.time}</span>
                  <span>{r.name}</span>
                  <span className="rounded-full bg-orange-container px-2 py-0.5 text-orange-dark">{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
