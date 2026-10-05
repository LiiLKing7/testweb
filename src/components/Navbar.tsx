import React, { useState } from 'react'
import { ShoppingCart, Sun, Moon, Search, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'
import QuyoshLogo from '@/components/QuyoshLogo'

interface NavbarProps {
  onLoginClick: () => void
  isLoggedIn: boolean
  onLogout: () => void
  searchQuery: string
  onSearchChange: (q: string) => void
  isCatalogScrolled: boolean
  onScrollToCatalog?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  onLoginClick,
  isLoggedIn,
  onLogout,
  searchQuery,
  onSearchChange,
  isCatalogScrolled,
  onScrollToCatalog,
}) => {
  const { theme, toggleTheme } = useTheme()
  const { cartCount, setIsCartOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out pointer-events-none',
        isCatalogScrolled ? 'top-0 px-0' : 'top-3 sm:top-4 px-3 sm:px-6'
      )}
    >
      <div
        className={cn(
          'pointer-events-auto transition-all duration-500 ease-in-out flex flex-col justify-center',
          isCatalogScrolled
            ? 'w-full max-w-full rounded-none border-b border-purple-200/80 dark:border-purple-900 bg-white/95 dark:bg-[#120724]/95 backdrop-blur-2xl shadow-lg'
            : 'w-full max-w-[1000px] rounded-2xl sm:rounded-3xl border border-purple-200/90 dark:border-purple-800/80 bg-white/85 dark:bg-[#1a0c33]/85 backdrop-blur-xl shadow-2xl shadow-[#6b21a8]/10'
        )}
      >
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-17">

            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={onScrollToCatalog}>
              <QuyoshLogo size="md" showText={true} />
            </div>

            {/* Search - Desktop (Appears ONLY when scrolled to products catalog, with bounce animation) */}
            <div className="hidden md:flex flex-1 justify-center items-center px-4">
              <AnimatePresence mode="wait">
                {isCatalogScrolled && (
                  <motion.div
                    key="navbar-catalog-search"
                    initial={{
                      width: 0,
                      height: 28,
                      opacity: 0,
                      scale: 0.4,
                    }}
                    animate={{
                      width: '100%',
                      height: 44,
                      opacity: 1,
                      scale: [0.4, 1.1, 0.95, 1],
                    }}
                    exit={{
                      width: 0,
                      height: 28,
                      opacity: 0,
                      scale: 0.4,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 18,
                      mass: 0.8,
                    }}
                    className="w-full max-w-md relative overflow-hidden"
                  >
                    <div className="relative w-full flex items-center">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b21a8] dark:text-purple-300" />
                      <input
                        type="text"
                        placeholder="Katalogdan mahsulot qidiring..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border-2 border-[#6b21a8]/30 dark:border-purple-600/50 bg-white dark:bg-purple-950/70 text-sm text-gray-900 dark:text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-[#6b21a8] focus:border-[#6b21a8] transition-all shadow-inner"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => onSearchChange('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs bg-gray-100 dark:bg-purple-900/60 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Catalog link button if NOT scrolled */}
            {!isCatalogScrolled && (
              <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700 dark:text-purple-200">
                <button
                  type="button"
                  onClick={onScrollToCatalog}
                  className="hover:text-[#6b21a8] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Katalog
                </button>
                <button
                  type="button"
                  onClick={onScrollToCatalog}
                  className="hover:text-[#6b21a8] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Chegirmalar
                </button>
                <button
                  type="button"
                  onClick={onScrollToCatalog}
                  className="hover:text-[#6b21a8] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Yangi mahsulotlar
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 dark:hover:bg-purple-800/60 text-[#6b21a8] dark:text-purple-300 transition-all duration-200 border border-purple-200/50 dark:border-purple-800/60 cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#6b21a8]" />}
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 dark:hover:bg-purple-800/60 text-[#6b21a8] dark:text-purple-300 transition-all duration-200 border border-purple-200/50 dark:border-purple-800/60 cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4 text-[#6b21a8] dark:text-purple-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#6b21a8] text-white text-xs flex items-center justify-center font-bold ring-2 ring-white dark:ring-purple-950 animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Login/User Button */}
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
                    <div className="w-6 h-6 rounded-full bg-[#6b21a8] text-white flex items-center justify-center text-xs font-bold">
                      A
                    </div>
                    <span className="text-sm font-semibold text-[#6b21a8] dark:text-purple-200">
                      Ali
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-all cursor-pointer"
                  >
                    Chiqish
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onLoginClick}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-[#6b21a8] text-white hover:bg-purple-800 shadow-lg shadow-[#6b21a8]/30 hover:shadow-[#6b21a8]/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Kirish
                </button>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-[#6b21a8] dark:text-purple-300 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Search & Menu */}
          <AnimatePresence>
            {(mobileMenuOpen || (isCatalogScrolled && !mobileMenuOpen)) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden pb-3 pt-1 overflow-hidden"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b21a8] dark:text-purple-300" />
                  <input
                    type="text"
                    placeholder="Mahsulot qidiring..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/60 text-xs text-gray-900 dark:text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-[#6b21a8]"
                  />
                </div>
                {mobileMenuOpen && (
                  <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-purple-100 dark:border-purple-900 text-xs font-semibold text-gray-700 dark:text-purple-200">
                    <button
                      type="button"
                      onClick={() => {
                        onScrollToCatalog?.()
                        setMobileMenuOpen(false)
                      }}
                      className="text-left py-1 hover:text-[#6b21a8]"
                    >
                      Katalog
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onScrollToCatalog?.()
                        setMobileMenuOpen(false)
                      }}
                      className="text-left py-1 hover:text-[#6b21a8]"
                    >
                      Maxsus takliflar
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default Navbar
