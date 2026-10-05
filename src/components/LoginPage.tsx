import React, { useState } from 'react'
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  LogIn
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import QuyoshLogo, { QuyoshFlower } from '@/components/QuyoshLogo'
import CardSplitAccordion from '@/components/watermelon/CardSplitAccordion'
import { useTheme } from '@/context/ThemeContext'

interface LoginPageProps {
  onLogin: () => void
  onClose: () => void
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onClose }) => {
  const { theme } = useTheme()
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    if (!email || !password) {
      setError("Email va parol kiritish shart!")
      return
    }
    if (isRegister && !name) {
      setError("Ism-familiyangizni kiriting!")
      return
    }
    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak!")
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSuccessMsg(isRegister ? "Ro'yxatdan o'tdingiz! Tizimga kirilmoqda..." : "Xush kelibsiz! Kirilmoqda...")
    setTimeout(() => {
      onLogin()
    }, 600)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-purple-50/40 to-purple-100/30 dark:from-[#0d0517] dark:via-[#170a2c] dark:to-[#0f061d] text-gray-900 dark:text-white flex flex-col transition-colors duration-300">
      {/* Top Bar Navigation */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-[#6b21a8] dark:text-purple-300 bg-white dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/60 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </button>

        <QuyoshLogo size="md" showText={true} />
      </header>

      {/* Main Spacious Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Showcase & Watermelon UI Accordion */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-700 text-[#6b21a8] dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              QUYOSH Ekotizimi
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Siz uchun keraklisi{' '}
              <span className="text-[#6b21a8] dark:text-purple-400 underline decoration-purple-300 dark:decoration-purple-600 underline-offset-8">
                bitta hisobda.
              </span>
            </h1>

            <p className="text-base text-gray-600 dark:text-purple-200/80 leading-relaxed">
              Hisobingizga kiring va 50,000+ sara mahsulotlar, shaxsiy keshbek va tezkor bepul yetkazib berish xizmatidan bahramand bo'ling.
            </p>

            {/* Watermelon UI Animated Split Accordion */}
            <div className="pt-2">
              <div className="text-xs font-bold text-gray-500 dark:text-purple-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#6b21a8] dark:text-purple-400" />
                Mijozlarimizga beriladigan imkoniyatlar:
              </div>
              <CardSplitAccordion />
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-purple-100 dark:border-purple-900/50 text-center sm:text-left">
              <div>
                <p className="text-2xl font-black text-[#6b21a8] dark:text-purple-300">50K+</p>
                <p className="text-xs text-gray-500 dark:text-purple-400 font-medium">Faol xaridor</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#6b21a8] dark:text-purple-300">99.8%</p>
                <p className="text-xs text-gray-500 dark:text-purple-400 font-medium">Ijobiy baho</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#6b21a8] dark:text-purple-300">24/7</p>
                <p className="text-xs text-gray-500 dark:text-purple-400 font-medium">Yetkazib berish</p>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card with Watermelon UI Tabs & Animations */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-[#140924] rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200 dark:border-purple-800/80 relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#6b21a8]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* Watermelon Style Animated Segmented Toggle */}
              <div className="relative p-1 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800 mb-6 flex">
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className={`relative flex-1 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer z-10 ${
                    !isRegister
                      ? 'text-white'
                      : 'text-gray-600 dark:text-purple-300 hover:text-[#6b21a8]'
                  }`}
                >
                  {!isRegister && (
                    <motion.div
                      layoutId="auth-tab"
                      className="absolute inset-0 bg-[#6b21a8] rounded-xl shadow-md"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">Tizimga kirish</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className={`relative flex-1 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer z-10 ${
                    isRegister
                      ? 'text-white'
                      : 'text-gray-600 dark:text-purple-300 hover:text-[#6b21a8]'
                  }`}
                >
                  {isRegister && (
                    <motion.div
                      layoutId="auth-tab"
                      className="absolute inset-0 bg-[#6b21a8] rounded-xl shadow-md"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">Ro'yxatdan o'tish</span>
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                  {isRegister ? "Yangi hisob yaratish" : "Xush kelibsiz! 👋"}
                </h2>
                <p className="text-xs text-gray-500 dark:text-purple-300 mt-1">
                  {isRegister
                    ? "Bir necha soniyada ma'lumotlaringizni to'ldiring"
                    : "Shaxsiy kabinetingizga kirish uchun ma'lumotlarni kiriting"}
                </p>
              </div>

              {/* Status alerts */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {successMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name (register only) */}
                {isRegister && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-xs font-bold text-gray-700 dark:text-purple-200 mb-1.5">
                      To'liq ismingiz *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <input
                        type="text"
                        placeholder="Ali Valiyev"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/50 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-purple-200 mb-1.5">
                    Email manzilingiz *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <input
                      type="email"
                      required
                      placeholder="nomingiz@misol.uz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/50 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                    />
                  </div>
                </div>

                {/* Phone (register only) */}
                {isRegister && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-xs font-bold text-gray-700 dark:text-purple-200 mb-1.5">
                      Telefon raqami
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <input
                        type="tel"
                        placeholder="+998 90 123 45 67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/50 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-purple-200">
                      Parol *
                    </label>
                    {!isRegister && (
                      <button
                        type="button"
                        onClick={() => alert("Parolni tiklash havolasi emailingizga yuborildi.")}
                        className="text-[11px] font-semibold text-[#6b21a8] dark:text-purple-300 hover:underline cursor-pointer"
                      >
                        Parolni unutdingizmi?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-11 py-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/50 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#6b21a8] via-purple-700 to-[#581c87] text-white font-black text-sm shadow-xl shadow-purple-700/30 hover:shadow-purple-700/50 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>{isRegister ? "Ro'yxatdan o'tish" : "Tizimga kirish"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-purple-100 dark:bg-purple-800" />
                <span className="text-[11px] font-semibold text-gray-400 dark:text-purple-400 uppercase">
                  yoki
                </span>
                <div className="flex-1 h-px bg-purple-100 dark:bg-purple-800" />
              </div>

              {/* Fast Social Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('user@gmail.com')
                    setPassword('google_auth_pass')
                    onLogin()
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-purple-950/40 hover:bg-purple-50 dark:hover:bg-purple-900/60 text-xs font-bold text-gray-700 dark:text-purple-200 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                    <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7 0-1.1.2-2 .4-2.7L1.6 6.4C.6 8.3 0 10.5 0 12.9s.6 4.6 1.6 6.5l3.7-4.7z" />
                    <path fill="#34A853" d="M12 23.8c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.3L1.6 16.7C3.5 20.5 7.4 23.8 12 23.8z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('telegram_user@t.me')
                    setPassword('telegram_auth_pass')
                    onLogin()
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-purple-950/40 hover:bg-purple-50 dark:hover:bg-purple-900/60 text-xs font-bold text-gray-700 dark:text-purple-200 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 text-[#229ED9]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.926z" />
                  </svg>
                  <span>Telegram</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
