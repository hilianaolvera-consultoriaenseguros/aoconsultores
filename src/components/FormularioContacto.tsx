import { useState, useEffect } from 'react'

const VERDE = '#1a4731'
const FONDO = '#f0f7f2'

const servicios = [
  "Selecciona un servicio",
  "Seguro de Vida",
  "Seguro de Gastos Médicos Mayores",
  "Seguro de Retiro",
  "Responsabilidad Civil Profesional",
  "Seguro para tu Hogar",
  "Seguro para Mascotas",
]

interface Props {
  servicioSeleccionado?: string
  onClose?: () => void
}

export default function FormularioContacto({ servicioSeleccionado }: Props) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [servicio, setServicio] = useState(servicioSeleccionado || servicios[0])

  useEffect(() => {
    if (servicioSeleccionado) setServicio(servicioSeleccionado)
  }, [servicioSeleccionado])
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const CALENDLY = 'https://calendly.com/aoconsultores/30min'

  const handleSubmit = async () => {
    if (!nombre || !email || !telefono || servicio === servicios[0]) {
      setError('Por favor completa todos los campos.')
      return
    }
    setError('')

    // Abrir Calendly con datos pre-llenados
    const url = `${CALENDLY}?name=${encodeURIComponent(nombre)}&email=${encodeURIComponent(email)}&a1=${encodeURIComponent(telefono)}&a2=${encodeURIComponent(servicio)}`
    window.open(url, '_blank')
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="text-center py-10 px-6">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold mb-2" style={{color: VERDE}}>¡Gracias {nombre}!</h3>
        <p className="text-gray-600 text-sm mb-6">Te hemos redirigido a nuestra agenda. Elige el horario que mejor te convenga.</p>
        <button onClick={() => { setEnviado(false); setNombre(''); setEmail(''); setTelefono(''); setServicio(servicios[0]) }} className="font-semibold px-6 py-2 rounded-full text-white text-sm hover:opacity-90 transition" style={{backgroundColor: VERDE}}>
          Nuevo contacto
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1" style={{color: VERDE}}>Nombre completo *</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
            style={{backgroundColor: FONDO}}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{color: VERDE}}>Email *</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
            style={{backgroundColor: FONDO}}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{color: VERDE}}>Teléfono *</label>
          <input
            type="tel"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            placeholder="+52 55 0000 0000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
            style={{backgroundColor: FONDO}}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" style={{color: VERDE}}>Servicio de interés *</label>
          <select
            value={servicio}
            onChange={e => setServicio(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
            style={{backgroundColor: FONDO}}
          >
            {servicios.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full font-semibold py-3 rounded-full text-white hover:opacity-90 transition mt-2"
          style={{backgroundColor: VERDE}}
        >
          Agendar cita →
        </button>
        <p className="text-xs text-gray-400 text-center">Serás redirigido a nuestra agenda en Calendly para elegir tu horario.</p>
      </div>
    </div>
  )
}
