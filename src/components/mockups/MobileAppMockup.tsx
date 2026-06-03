export function MobileAppMockup() {
  return (
    <div className="mx-auto w-[240px] overflow-hidden rounded-[1.75rem] border-[3px] border-gray-800 bg-white shadow-2xl">
      <div className="gradient-brand px-4 pb-3 pt-6">
        <p className="text-[10px] text-white/80">9:41</p>
        <p className="mt-2 text-sm font-bold text-white">¡Hola, María!</p>
        <p className="text-[11px] text-white/80">¿Dónde quieres cenar hoy?</p>
      </div>
      <div className="space-y-2.5 bg-white p-3">
        <div className="rounded-lg border border-blue/15 bg-blue-light px-3 py-2 text-[10px] text-gray-600">
          Buscar restaurantes en Medellín...
        </div>
        {[
          { name: 'Restaurante El Cielo', meta: 'Cocina de autor • El Poblado', rating: '4.8', action: 'Reservar' },
          { name: "Mondongo's", meta: 'Comida típica • Laureles', rating: '4.6', action: 'Ver' },
        ].map((r) => (
          <div key={r.name} className="rounded-lg border border-gray-200 bg-gray-50 p-2.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold text-gray-900">{r.name}</p>
                <p className="text-[8px] text-gray-600">{r.meta}</p>
              </div>
              <span className="text-[9px] font-bold text-orange">{r.rating}</span>
            </div>
            <button type="button" className="gradient-orange mt-2 w-full rounded-md py-1 text-[9px] font-semibold text-white">
              {r.action}
            </button>
          </div>
        ))}
        <div className="rounded-lg border border-green/30 bg-green/10 p-2.5 text-center">
          <p className="text-[9px] font-semibold text-green">Reserva Confirmada ✓</p>
          <p className="text-[8px] text-gray-600">Hoy 8:00 PM • Mesa para 2</p>
        </div>
      </div>
    </div>
  );
}
