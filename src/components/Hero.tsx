import React from 'react'
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { QuyoshFlower } from '@/components/QuyoshLogo'

interface HeroProps {
  onShopNow: () => void
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  const { addToCart } = useCart()
  const featuredProduct = products[1] // MacBook

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50/70 via-white to-purple-100/40 dark:from-[#0d0517] dark:via-[#160a2b] dark:to-[#0f061d] pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6b21a8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
      {/* Floating flower */}
      <div className="absolute top-12 right-12 opacity-5 dark:opacity-10 pointer-events-none">
        <QuyoshFlower className="w-72 h-72" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-[#6b21a8] dark:text-purple-300">
                O'zbekistonning #1 online do'koni
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
              Eng yaxshi{' '}
              <span className="text-[#6b21a8] dark:text-purple-400 underline decoration-purple-300 underline-offset-8">
                mahsulotlar
              </span>
              {' '}siz uchun yetkazib beriladi
            </h1>

            <p className="text-lg text-gray-600 dark:text-purple-200 leading-relaxed max-w-lg">
              <span className="font-bold text-[#6b21a8] dark:text-purple-300">QUYOSH</span> – siz uchun keraklisi. 
              50,000+ dan ortiq original mahsulotlar, tez yetkazib berish va qulay to'lov imkoniyatlari.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onShopNow}
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#6b21a8] to-purple-700 text-white font-black shadow-xl shadow-[#6b21a8]/30 hover:shadow-[#6b21a8]/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Katalogga o'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => addToCart(featuredProduct)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-purple-950/60 border-2 border-purple-200 dark:border-purple-800 text-gray-800 dark:text-purple-200 font-bold hover:bg-purple-50 dark:hover:bg-purple-900/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>🔥 Trend mahsulot</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-purple-100 dark:border-purple-900/60">
              {[
                { value: '50K+', label: 'Mahsulotlar' },
                { value: '2M+', label: 'Xaridorlar' },
                { value: '4.9★', label: 'Mijoz bahosi' },
              ].map(stat => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-purple-300 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Featured Card */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6b21a8]/30 to-amber-500/20 rounded-3xl blur-2xl scale-95" />
            <div className="relative bg-white dark:bg-[#160a2c] rounded-3xl shadow-2xl shadow-[#6b21a8]/15 border border-purple-200 dark:border-purple-800/80 overflow-hidden p-6 backdrop-blur">
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-black shadow-md">
                🔥 Tavsiya etiladi
              </div>
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-56 object-cover rounded-2xl mb-5 shadow-sm"
              />
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#6b21a8] dark:text-purple-400 uppercase tracking-wide">
                  {featuredProduct.category}
                </span>
                <h3 className="text-xl font-black text-gray-900 dark:text-white leading-snug">
                  {featuredProduct.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-purple-300 line-clamp-2">
                  {featuredProduct.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-purple-100 dark:border-purple-900/60">
                  <div>
                    <div className="text-2xl font-black text-[#6b21a8] dark:text-amber-400">
                      {featuredProduct.price.toLocaleString()} so'm
                    </div>
                    {featuredProduct.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">
                        {featuredProduct.originalPrice.toLocaleString()} so'm
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(featuredProduct)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6b21a8] to-purple-700 text-white text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#6b21a8]/30 cursor-pointer"
                  >
                    Savatga qo'shish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
          {[
            { icon: Truck, title: "Tez yetkazib berish", desc: "1-3 kun ichida O'zbekiston bo'ylab", color: "text-[#6b21a8] dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/40" },
            { icon: ShieldCheck, title: "100% Original kafolat", desc: "Rasmiy servis markazi kafolati", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
            { icon: RefreshCw, title: "Oson qaytarish", desc: "14 kun ichida so'zsiz almashtirish", color: "text-[#6b21a8] dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/40" },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#160a2c] border border-purple-200/80 dark:border-purple-800/60 shadow-sm"
            >
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{title}</p>
                <p className="text-xs text-gray-500 dark:text-purple-300">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
