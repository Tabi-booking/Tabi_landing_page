export function WebAppMockup() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-[10px] text-gray-500">
          tabiapp.tech/reservar
        </div>
      </div>

      <div className="gradient-brand px-5 py-5">
        <p className="text-sm font-bold text-white">¡Hola, María!</p>
        <p className="text-xs text-white/85">¿Dónde quieres cenar hoy en Medellín?</p>
      </div>

      <div className="space-y-2.5 bg-white p-4">
        <div className="rounded-lg border border-blue/15 bg-blue-light px-3 py-2 text-[11px] text-gray-600">
          Buscar restaurantes...
        </div>
        {[
          { name: 'Restaurante El Cielo', meta: 'Cocina de autor • El Poblado', rating: '4.8', action: 'Reservar' },
          { name: "Mondongo's", meta: 'Comida típica • Laureles', rating: '4.6', action: 'Ver' },
        ].map((r) => (
          <div key={r.name} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-gray-900">{r.name}</p>
                <p className="text-[10px] text-gray-600">{r.meta}</p>
              </div>
              <span className="text-[10px] font-bold text-orange">{r.rating}</span>
            </div>
            <button type="button" className="gradient-orange mt-2 w-full rounded-md py-1.5 text-[10px] font-semibold text-white">
              {r.action}
            </button>
          </div>
        ))}
        <div className="rounded-lg border border-green/30 bg-green/10 p-3 text-center">
          <p className="text-[10px] font-semibold text-green">Reserva Confirmada ✓</p>
          <p className="text-[9px] text-gray-600">Hoy 8:00 PM • Mesa para 2</p>
        </div>
      </div>
    </div>
  );
}
