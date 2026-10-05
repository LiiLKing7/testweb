import React from 'react'
import { ShoppingCart, Star, BadgeCheck, Zap, CreditCard } from 'lucide-react'
import type { Product } from '@/context/CartContext'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  onBuyNow?: (product: Product) => void
}

const badgeColors: Record<string, string> = {
  'Yangi': 'bg-blue-500',
  'Bestseller': 'bg-amber-500',
  'Ommabop': 'bg-purple-600',
  'Pro': 'bg-rose-500',
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow }) => {
  const { addToCart } = useCart()
  const [added, setAdded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const badgeColor = product.badge
    ? (badgeColors[product.badge] || 'bg-[#6b21a8]')
    : ''

  return (
    <div className="group relative flex flex-col bg-white dark:bg-[#1a0e2e]/70 rounded-2xl border border-purple-100 dark:border-purple-800/60 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#6b21a8]/15 hover:-translate-y-1 transition-all duration-300">
      {/* Badge */}
      {product.badge && (
        <div className={cn('absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg text-white text-xs font-bold shadow-lg', badgeColor)}>
          {product.badge}
        </div>
      )}

      {/* Discount */}
      {discount && discount > 10 && (
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-red-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
          <Zap className="w-3 h-3 fill-white" />
          -{discount}%
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-50 dark:bg-purple-950/30">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🛒
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Category */}
        <span className="text-xs font-bold text-[#6b21a8] dark:text-purple-400 uppercase tracking-wide">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug line-clamp-2 group-hover:text-[#6b21a8] dark:group-hover:text-purple-300 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3.5 h-3.5',
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-200 dark:text-gray-600'
                )}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {product.rating}
          </span>
          <span className="text-xs text-gray-400">
            ({product.reviews.toLocaleString()})
          </span>
          <BadgeCheck className="w-3.5 h-3.5 text-blue-500 ml-auto" />
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-xl font-black text-[#6b21a8] dark:text-amber-400">
            {product.price.toLocaleString()} so'm
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Buttons: Savatga qo'shish + Sotib olish */}
        <div className="mt-auto pt-2 grid grid-cols-2 gap-2">
          {/* Savatga qo'shish button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={cn(
              'flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs transition-all duration-200 border cursor-pointer',
              added
                ? 'bg-purple-100 text-[#6b21a8] border-[#6b21a8] scale-95'
                : 'bg-white dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/60 active:scale-95'
            )}
            title="Savatga qo'shish"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="truncate">{added ? "Qo'shildi ✓" : "Savatga"}</span>
          </button>

          {/* Sotib olish button */}
          <button
            type="button"
            onClick={() => onBuyNow ? onBuyNow(product) : handleAddToCart()}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#6b21a8] to-purple-700 hover:from-purple-800 hover:to-purple-900 shadow-md shadow-purple-700/25 hover:shadow-purple-700/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
            title="Darhol sotib olish"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span className="truncate">Sotib olish</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
