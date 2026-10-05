import React, { useState } from 'react'
import { MapPin, Navigation, Compass, CheckCircle2, Crosshair } from 'lucide-react'
import { motion } from 'framer-motion'

interface FakeMapPickerProps {
  selectedAddress: string
  onSelectAddress: (address: string) => void
}

interface MapLocation {
  id: string
  name: string
  district: string
  x: number // percentage
  y: number // percentage
  address: string
}

const PRESET_LOCATIONS: MapLocation[] = [
  {
    id: 'chilonzor',
    name: 'Chilonzor 9-mavze',
    district: 'Chilonzor tumani',
    x: 32,
    y: 68,
    address: "Toshkent sh., Chilonzor tumani, 9-mavze, 24-uy, 15-xonadon",
  },
  {
    id: 'yunusobod',
    name: 'Yunusobod 4-mavze',
    district: 'Yunusobod tumani',
    x: 60,
    y: 26,
    address: "Toshkent sh., Yunusobod tumani, 4-mavze, Amir Temur ko'chasi, 8-uy",
  },
  {
    id: 'mirzo',
    name: "Mirzo Ulug'bek / TTZ",
    district: "Mirzo Ulug'bek tumani",
    x: 78,
    y: 40,
    address: "Toshkent sh., Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li ko'chasi, 112-uy",
  },
  {
    id: 'chorsu',
    name: 'Shayxontohur / Chorsu',
    district: 'Shayxontohur tumani',
    x: 42,
    y: 44,
    address: "Toshkent sh., Shayxontohur tumani, Zarqaynar ko'chasi, 14-uy",
  },
  {
    id: 'yakkasaroy',
    name: 'Yakkasaroy / Rustaveli',
    district: 'Yakkasaroy tumani',
    x: 48,
    y: 62,
    address: "Toshkent sh., Yakkasaroy tumani, Shota Rustaveli ko'chasi, 53-uy",
  },
  {
    id: 'mirobod',
    name: 'Mirobod / Oybek',
    district: 'Mirobod tumani',
    x: 58,
    y: 56,
    address: "Toshkent sh., Mirobod tumani, Oybek ko'chasi, 28-uy",
  },
]

export const FakeMapPicker: React.FC<FakeMapPickerProps> = ({
  selectedAddress,
  onSelectAddress,
}) => {
  const [pinPosition, setPinPosition] = useState<{ x: number; y: number } | null>(() => {
    // Default to Mirobod/Center
    return { x: 50, y: 50 }
  })
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100))

    setPinPosition({ x, y })
    setActiveLocationId(null)

    // Generate smart address based on map coordinates
    let district = "Chilonzor tumani"
    if (y < 40 && x > 40) district = "Yunusobod tumani"
    else if (x > 65) district = "Mirzo Ulug'bek tumani"
    else if (x < 45 && y < 55) district = "Shayxontohur tumani"
    else if (y > 55 && x > 45) district = "Mirobod tumani"

    const houseNumber = Math.floor((x * y) % 80) + 1
    const blockNumber = Math.floor(x % 12) + 1
    const generatedAddress = `Toshkent sh., ${district}, ${blockNumber}-mavze, ${houseNumber}-uy`
    onSelectAddress(generatedAddress)
  }

  const handleSelectPreset = (loc: MapLocation) => {
    setPinPosition({ x: loc.x, y: loc.y })
    setActiveLocationId(loc.id)
    onSelectAddress(loc.address)
  }

  const handleFindMyLocation = () => {
    setIsLocating(true)
    setTimeout(() => {
      setPinPosition({ x: 52, y: 54 })
      setActiveLocationId('mirobod')
      onSelectAddress("Toshkent sh., Mirobod tumani, Oybek ko'chasi, 28-uy (GPS aniqlandi)")
      setIsLocating(false)
    }, 600)
  }

  return (
    <div className="w-full space-y-3">
      {/* Map Header with GPS button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#6b21a8] dark:text-purple-400" />
          <span className="text-xs font-bold text-gray-700 dark:text-purple-200">
            Xaritadan manzilni belgilang
          </span>
        </div>
        <button
          type="button"
          onClick={handleFindMyLocation}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[#6b21a8] dark:text-purple-300 bg-purple-50 dark:bg-purple-900/40 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200/60 dark:border-purple-800"
        >
          <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? 'Aniqlanmoqda...' : 'Joylashuvim'}</span>
        </button>
      </div>

      {/* Interactive Map Canvas */}
      <div
        onClick={handleMapClick}
        className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden border-2 border-purple-200 dark:border-purple-800/80 cursor-crosshair select-none shadow-inner bg-[#f6f3fc] dark:bg-[#1a0e2e]"
      >
        {/* Stylized Vector Grid & Road Map Background */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle grid lines */}
          <defs>
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-purple-200/40 dark:text-purple-900/30" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />

          {/* Anhor Canal / River curve */}
          <path
            d="M 50 0 C 65 60, 40 120, 30 200 C 25 240, 20 280, 15 320"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="7"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />

          {/* Major Avenues (Amir Temur, Bunyodkor, Navoiy) */}
          <path d="M 0 130 Q 150 140 400 120" stroke="#cbd5e1" className="dark:stroke-purple-900/60" strokeWidth="6" strokeLinecap="round" />
          <path d="M 120 0 L 160 300" stroke="#cbd5e1" className="dark:stroke-purple-900/60" strokeWidth="5" />
          <path d="M 220 0 Q 240 150 280 300" stroke="#cbd5e1" className="dark:stroke-purple-900/60" strokeWidth="6" />
          <path d="M 50 220 L 350 180" stroke="#e2e8f0" className="dark:stroke-purple-950" strokeWidth="4" />

          {/* Tashkent Ring Road (M39 Ring) */}
          <ellipse
            cx="50%"
            cy="50%"
            rx="46%"
            ry="42%"
            fill="none"
            stroke="#a855f7"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeOpacity="0.4"
          />

          {/* Landmarks */}
          <circle cx="50%" cy="50%" r="18" fill="#6b21a8" fillOpacity="0.08" stroke="#6b21a8" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>

        {/* District Labels */}
        <div className="absolute top-3 left-4 text-[11px] font-bold text-purple-700/60 dark:text-purple-300/40 uppercase tracking-widest pointer-events-none">
          Yunusobod
        </div>
        <div className="absolute bottom-4 left-6 text-[11px] font-bold text-purple-700/60 dark:text-purple-300/40 uppercase tracking-widest pointer-events-none">
          Chilonzor
        </div>
        <div className="absolute top-8 right-6 text-[11px] font-bold text-purple-700/60 dark:text-purple-300/40 uppercase tracking-widest pointer-events-none">
          M. Ulug'bek
        </div>
        <div className="absolute bottom-6 right-8 text-[11px] font-bold text-purple-700/60 dark:text-purple-300/40 uppercase tracking-widest pointer-events-none">
          Mirobod
        </div>

        {/* Center Ring Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-white/70 dark:bg-purple-900/70 backdrop-blur-sm text-[10px] font-bold text-[#6b21a8] dark:text-purple-200 border border-purple-200 dark:border-purple-700 pointer-events-none">
          Markaz (Amir Temur hiyoboni)
        </div>

        {/* Preset Location Dots */}
        {PRESET_LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleSelectPreset(loc)
            }}
            title={loc.name}
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform ${
              activeLocationId === loc.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-colors ${
              activeLocationId === loc.id
                ? 'bg-[#6b21a8] ring-4 ring-purple-400/40'
                : 'bg-purple-500/80 group-hover:bg-[#6b21a8]'
            }`} />
          </button>
        ))}

        {/* Current Active Pin with Bounce Animation */}
        {pinPosition && (
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            style={{ left: `${pinPosition.x}%`, top: `${pinPosition.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-30"
          >
            <div className="relative flex flex-col items-center">
              {/* Pin Icon */}
              <div className="p-1.5 rounded-full bg-[#6b21a8] text-white shadow-xl shadow-purple-900/40 ring-4 ring-white dark:ring-purple-950 animate-bounce">
                <MapPin className="w-5 h-5 fill-white" />
              </div>
              {/* Ripple animation underneath */}
              <div className="w-3 h-1.5 rounded-full bg-[#6b21a8]/40 blur-[1px] mt-0.5 animate-ping" />
            </div>
          </motion.div>
        )}

        {/* Instruction overlay watermark */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-purple-950/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-medium text-gray-600 dark:text-purple-300 shadow-sm border border-purple-100 dark:border-purple-800 pointer-events-none">
          👆 Xarita ustiga bosing yoki tumanlarni tanlang
        </div>
      </div>

      {/* Quick Select Preset Pills */}
      <div>
        <p className="text-[11px] font-semibold text-gray-500 dark:text-purple-400 mb-1.5">
          Mashhur manzillar (bosing):
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_LOCATIONS.map((loc) => {
            const isSelected = activeLocationId === loc.id
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => handleSelectPreset(loc)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#6b21a8] text-white shadow-sm scale-105'
                    : 'bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-800/50 border border-purple-200/50 dark:border-purple-800/60'
                }`}
              >
                {loc.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FakeMapPicker
