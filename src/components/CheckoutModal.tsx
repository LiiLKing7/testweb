import React, { useState } from 'react'
import {
  X,
  ShoppingBag,
  User,
  Phone,
  Tag,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  ShieldCheck,
  Check,
  Plus,
  Minus
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/context/CartContext'
import FakeMapPicker from './FakeMapPicker'
import QuyoshLogo, { QuyoshFlower } from './QuyoshLogo'

interface CheckoutModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const PAYMENT_METHODS = [
  { id: 'payme', name: 'Payme', icon: CreditCard, color: 'text-cyan-500' },
  { id: 'click', name: 'Click', icon: CreditCard, color: 'text-blue-500' },
  { id: 'uzum', name: 'Uzum Pay', icon: CreditCard, color: 'text-purple-500' },
  { id: 'cash', name: 'Yetkazilganda naqd', icon: Banknote, color: 'text-emerald-500' },
]

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('+998 ')
  const [address, setAddress] = useState('')
  const [extraDetails, setExtraDetails] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null)
  const [promoError, setPromoError] = useState('')
  const [selectedPayment, setSelectedPayment] = useState('payme')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  if (!isOpen || !product) return null

  const unitPrice = product.price
  const subtotal = unitPrice * quantity
  const discountRate = appliedPromo ? appliedPromo.discountPercent / 100 : 0
  const discountAmount = Math.round(subtotal * discountRate)
  const deliveryFee = subtotal > 500000 || appliedPromo?.code === 'BEPUL' ? 0 : 25000
  const totalAmount = subtotal - discountAmount + deliveryFee

  const handleApplyPromo = () => {
    setPromoError('')
    const clean = promoCode.trim().toUpperCase()
    if (!clean) {
      setPromoError("Promo-kodni kiriting")
      return
    }

    if (clean === 'QUYOSH20') {
      setAppliedPromo({ code: clean, discountPercent: 20 })
    } else if (clean === 'BAHOR10') {
      setAppliedPromo({ code: clean, discountPercent: 10 })
    } else if (clean === 'BEPUL') {
      setAppliedPromo({ code: clean, discountPercent: 0 })
    } else {
      setPromoError("Noto'g'ri promo-kod! Sinab ko'ring: QUYOSH20")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim()) {
      alert("Iltimos, ism va familiyangizni kiriting!")
      return
    }
    if (!address.trim()) {
      alert("Iltimos, yetkazib berish manzilini xaritadan tanlang yoki qo'lda yozing!")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      const randomOrder = 'QSH-' + Math.floor(100000 + Math.random() * 900000)
      setOrderNumber(randomOrder)
      setIsSuccess(true)
    }, 1200)
  }

  const handleResetAndClose = () => {
    setIsSuccess(false)
    setQuantity(1)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative w-full max-w-3xl bg-white dark:bg-[#150a24] rounded-3xl shadow-2xl border border-purple-200 dark:border-purple-800/80 overflow-hidden my-auto"
      >
        {/* Modal Top Bar */}
        <div className="relative px-6 py-4 bg-gradient-to-r from-[#6b21a8] via-[#7e22ce] to-[#581c87] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <QuyoshFlower className="w-8 h-8 text-amber-300" />
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">
                Sotib Olish & Buyurtma
              </h2>
              <p className="text-xs text-purple-200">
                QUYOSH rasmiy do'koni orqali xavfsiz xarid
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xl"
            >
              <Check className="w-10 h-10 stroke-[3]" />
            </motion.div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-[#6b21a8] dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                Buyurtma Qabul Qilindi
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                Xaridingiz uchun rahmat, {firstName}! 🎉
              </h3>
              <p className="text-sm text-gray-600 dark:text-purple-200/80 max-w-md mx-auto">
                Buyurtmangiz raqami: <strong className="text-[#6b21a8] dark:text-purple-300">{orderNumber}</strong>.
                Kuryerimiz tez orada siz bilan bog'lanadi.
              </p>
            </div>

            {/* Order details preview box */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800 text-left text-xs space-y-2 text-gray-700 dark:text-purple-200">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-purple-400">Mahsulot:</span>
                <span className="font-semibold">{product.name} ({quantity} dona)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-purple-400">Yetkazish manzili:</span>
                <span className="font-semibold text-right max-w-[240px] truncate">{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-purple-400">To'lov miqdori:</span>
                <span className="font-bold text-[#6b21a8] dark:text-amber-400 text-sm">{totalAmount.toLocaleString()} so'm</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6b21a8] to-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Xaridni davom ettirish
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Selected Product Card */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-xl border border-purple-200 dark:border-purple-700 bg-white"
              />
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[11px] font-bold text-[#6b21a8] dark:text-purple-400 uppercase tracking-wider">
                  {product.category}
                </span>
                <h4 className="font-bold text-gray-900 dark:text-white text-base leading-snug">
                  {product.name}
                </h4>
                <div className="text-sm font-black text-[#6b21a8] dark:text-amber-400 mt-1">
                  {product.price.toLocaleString()} so'm / dona
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-2 bg-white dark:bg-purple-900/60 border border-purple-200 dark:border-purple-700 rounded-xl p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 text-gray-700 dark:text-purple-200 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 text-gray-700 dark:text-purple-200 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Recipient Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-[#6b21a8] dark:text-purple-400" />
                Qabul qiluvchi ma'lumotlari
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-purple-300 mb-1">
                    Ismingiz *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sardor"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-purple-300 mb-1">
                    Familiyangiz *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Karimov"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-purple-300 mb-1">
                  Telefon raqam *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                  />
                </div>
              </div>
            </div>

            {/* Address Selection with Fake Map & Manual Fallback */}
            <div className="space-y-3 pt-2 border-t border-purple-100 dark:border-purple-900/40">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#6b21a8] dark:text-purple-400" />
                  Yetkazib berish manzili
                </h3>
                <span className="text-[11px] text-purple-600 dark:text-purple-300 font-medium">
                  Xarita orqali yoki qo'lda
                </span>
              </div>

              {/* Fake Map Component */}
              <FakeMapPicker
                selectedAddress={address}
                onSelectAddress={(addr) => setAddress(addr)}
              />

              {/* Manual Address Input Box */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-purple-200">
                    Aniq manzil (qo'lda yozing yoki xaritadan tanlang) *
                  </label>
                  {address && (
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Tanlandi
                    </span>
                  )}
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder="Agar xaritadan tanlanmagan bo'lsa, manzilni bu yerga to'liq qo'lda yozing (Shahar, tuman, ko'cha, uy)..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-purple-300 mb-1">
                  Qo'shimcha eslatma (ixtiyoriy)
                </label>
                <input
                  type="text"
                  placeholder="Masalan: 3-podyezd, 4-qavat, domofon kodi 45K"
                  value={extraDetails}
                  onChange={(e) => setExtraDetails(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                />
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="space-y-2 pt-2 border-t border-purple-100 dark:border-purple-900/40">
              <label className="block text-xs font-bold text-gray-700 dark:text-purple-200 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#6b21a8] dark:text-purple-400" />
                Promo-kod bormi?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masalan: QUYOSH20"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs font-semibold text-gray-900 dark:text-white uppercase focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 rounded-xl bg-[#6b21a8] text-white text-xs font-bold hover:bg-purple-800 transition-colors cursor-pointer"
                >
                  Qo'llash
                </button>
              </div>

              {appliedPromo && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    <strong>{appliedPromo.code}</strong> qo'llandi! {appliedPromo.discountPercent}% chegirma berildi.
                  </span>
                </div>
              )}

              {promoError && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>{promoError}</span>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-2 pt-2 border-t border-purple-100 dark:border-purple-900/40">
              <label className="block text-xs font-bold text-gray-700 dark:text-purple-200">
                To'lov usuli:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PAYMENT_METHODS.map((pm) => {
                  const isSelected = selectedPayment === pm.id
                  const Icon = pm.icon
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setSelectedPayment(pm.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#6b21a8] bg-purple-50 dark:bg-purple-900/40 ring-2 ring-[#6b21a8]'
                          : 'border-purple-200/70 dark:border-purple-800/60 bg-white dark:bg-purple-950/60 hover:bg-purple-50/50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1 ${pm.color}`} />
                      <span className="text-xs font-bold text-gray-800 dark:text-purple-100">
                        {pm.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price Breakdown Calculation */}
            <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/80 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600 dark:text-purple-300">
                <span>Mahsulot narxi ({quantity} dona):</span>
                <span>{subtotal.toLocaleString()} so'm</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Promo-kod chegirmasi:</span>
                  <span>-{discountAmount.toLocaleString()} so'm</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600 dark:text-purple-300">
                <span>Yetkazib berish xizmati:</span>
                <span>{deliveryFee === 0 ? 'Bepul' : `${deliveryFee.toLocaleString()} so'm`}</span>
              </div>
              <div className="pt-2 border-t border-purple-200 dark:border-purple-800 flex justify-between items-baseline text-gray-900 dark:text-white">
                <span className="text-sm font-bold">JAMI TO'LOV:</span>
                <span className="text-xl font-black text-[#6b21a8] dark:text-amber-400">
                  {totalAmount.toLocaleString()} so'm
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#6b21a8] via-purple-700 to-[#581c87] text-white font-black text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Rasmiylashtirilmoqda...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Buyurtmani tasdiqlash ({totalAmount.toLocaleString()} so'm)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-gray-500 dark:text-purple-400/80 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                100% xavfsiz to'lov va kafolatlangan yetkazib berish
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default CheckoutModal
