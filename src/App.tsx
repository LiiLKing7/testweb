import React, { useState, useRef, useEffect } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { CartProvider, useCart, type Product } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import CartDrawer from '@/components/CartDrawer'
import LoginPage from '@/components/LoginPage'
import CheckoutModal from '@/components/CheckoutModal'
import Footer from '@/components/Footer'
import { products } from '@/data/products'
import { SlidersHorizontal, Grid3X3, LayoutList, Tag, Flame, Star, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { QuyoshFlower } from '@/components/QuyoshLogo'

const categories = ['Barchasi', 'Elektronika', 'Kompyuter', 'Audio', 'Kiyim', 'Uy jihozlari', 'Kamera', 'Televizor', 'Planshet']
const sortOptions = [
  { value: 'default', label: 'Tavsiya etilgan', icon: Flame },
  { value: 'price-asc', label: 'Narxi arzon', icon: Tag },
  { value: 'price-desc', label: 'Narxi qimmat', icon: Tag },
  { value: 'rating', label: 'Reytingi yuqori', icon: Star },
  { value: 'newest', label: 'Yangi', icon: Clock },
]

function AppContent() {
  const { cart } = useCart()
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Barchasi')
  const [sortBy, setSortBy] = useState('default')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isCatalogScrolled, setIsCatalogScrolled] = useState(false)
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const productsRef = useRef<HTMLDivElement>(null)

  // Scroll listener to detect when user reaches the products catalog
  useEffect(() => {
    const handleScroll = () => {
      if (productsRef.current) {
        const rect = productsRef.current.getBoundingClientRect()
        // When catalog section enters view within 130px from top
        setIsCatalogScrolled(rect.top <= 130)
      } else {
        setIsCatalogScrolled(window.scrollY > 350)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleOpenBuyNow = (product: Product) => {
    setCheckoutProduct(product)
    setIsCheckoutOpen(true)
  }

  const filteredProducts = products
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCategory = selectedCategory === 'Barchasi' || p.category === selectedCategory
      return matchSearch && matchCategory
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'newest') return (b.badge === 'Yangi' ? 1 : 0) - (a.badge === 'Yangi' ? 1 : 0)
      return 0
    })

  // Full-page Login view when showLogin is true
  if (showLogin) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onClose={() => setShowLogin(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0517] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Dynamic Navbar: 1000px centered glass by default, 100% full-width on catalog scroll with bounce search */}
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isCatalogScrolled={isCatalogScrolled}
        onScrollToCatalog={scrollToProducts}
      />

      <main>
        {/* Hero Section */}
        <Hero onShopNow={scrollToProducts} />

        {/* Products Catalog Section */}
        <section ref={productsRef} id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-[#6b21a8] dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
                🛍️ Barcha Tanlovlar
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                Mahsulotlar{' '}
                <span className="text-[#6b21a8] dark:text-purple-400">
                  katalogi
                </span>
              </h2>
              <p className="text-gray-500 dark:text-purple-300 text-sm mt-1">
                {filteredProducts.length} ta sara mahsulot topildi
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <div className="relative">
                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b21a8] dark:text-purple-400" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="pl-8 pr-4 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-[#180b2c] text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6b21a8] transition-all appearance-none cursor-pointer"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* View Mode */}
              <div className="flex rounded-xl border border-purple-200 dark:border-purple-800 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2.5 transition-colors cursor-pointer',
                    viewMode === 'grid'
                      ? 'bg-[#6b21a8] text-white'
                      : 'bg-white dark:bg-[#180b2c] text-gray-500 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2.5 transition-colors cursor-pointer',
                    viewMode === 'list'
                      ? 'bg-[#6b21a8] text-white'
                      : 'bg-white dark:bg-[#180b2c] text-gray-500 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                  )}
                  aria-label="List view"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories Horizontal Filter */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer',
                  selectedCategory === cat
                    ? 'bg-[#6b21a8] text-white shadow-lg shadow-[#6b21a8]/30 scale-105'
                    : 'bg-purple-50 dark:bg-purple-950/40 text-[#6b21a8] dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200/50 dark:border-purple-800/60'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 rounded-3xl border border-dashed border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20">
              <div className="flex justify-center mb-4">
                <QuyoshFlower className="w-20 h-20 text-[#6b21a8] opacity-30" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Mahsulot topilmadi</h3>
              <p className="text-gray-500 dark:text-purple-400 mt-2 text-sm">
                "{searchQuery}" bo'yicha hech narsa topilmadi. Boshqa so'z bilan qidiring.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('Barchasi')
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#6b21a8] text-white text-xs font-bold hover:bg-purple-800 transition-colors"
              >
                Filtrni tozalash
              </button>
            </div>
          ) : (
            <div className={cn(
              'grid gap-6',
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 max-w-3xl mx-auto'
            )}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuyNow={handleOpenBuyNow}
                />
              ))}
            </div>
          )}
        </section>

        {/* Promo Banner */}
        <section className="mx-4 sm:mx-6 lg:mx-auto max-w-7xl mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#581c87] via-[#6b21a8] to-[#7e22ce] p-8 md:p-12 text-white shadow-2xl shadow-[#6b21a8]/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
            <div className="absolute bottom-0 left-20 w-40 h-40 bg-amber-400/20 rounded-full translate-y-20 pointer-events-none" />
            {/* Flower watermark */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
              <QuyoshFlower className="w-56 h-56 text-white" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-purple-200 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                  🎉 Maxsus taklif
                </p>
                <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
                  Birinchi buyurtmangizda <br />
                  <span className="text-amber-300">20% chegirma!</span>
                </h2>
                <p className="text-purple-100 text-sm max-w-md">
                  QUYOSH20 promo-kodini xarid oynasida kiriting va tezkor bepul yetkazib berish xizmatiga ega bo'ling.
                </p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-center shadow-lg">
                  <p className="text-xs text-purple-200 mb-1 font-semibold">Promo-kod</p>
                  <p className="text-2xl sm:text-3xl font-black tracking-widest text-amber-300 select-all cursor-pointer">
                    QUYOSH20
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToProducts}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-black text-sm transition-all shadow-lg shadow-amber-500/40 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Xarid qilish →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer
        onCheckout={() => {
          if (cart.length > 0) {
            setCheckoutProduct(cart[0])
            setIsCheckoutOpen(true)
          } else if (products.length > 0) {
            setCheckoutProduct(products[0])
            setIsCheckoutOpen(true)
          }
        }}
      />

      {/* Checkout Modal / Window for Instant Purchase */}
      <CheckoutModal
        product={checkoutProduct}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
