import React from 'react'
import { X, ShoppingCart, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { QuyoshFlower } from '@/components/QuyoshLogo'

interface CartDrawerProps {
  onCheckout?: () => void
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-purple-950 shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-purple-100 dark:border-purple-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">Savat</h2>
              <p className="text-xs text-purple-400">{cartCount} ta mahsulot</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/50 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-purple-200 dark:text-purple-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Savat bo'sh</p>
                <p className="text-sm text-gray-400 mt-1">Mahsulot qo'shing!</p>
              </div>
              <QuyoshFlower className="w-16 h-16 opacity-20" />
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{item.name}</p>
                  <p className="text-xs text-purple-400 mt-0.5">{item.category}</p>
                  <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-1">
                    {item.price.toLocaleString()} so'm
                  </p>
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-purple-800 border border-purple-200 dark:border-purple-700 flex items-center justify-center text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-700 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold text-gray-900 dark:text-white w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-purple-800 border border-purple-200 dark:border-purple-700 flex items-center justify-center text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-purple-100 dark:border-purple-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Jami:</span>
              <span className="text-xl font-black text-gray-900 dark:text-white">
                {cartTotal.toLocaleString()} so'm
              </span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false)
                onCheckout?.()
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6b21a8] to-purple-700 text-white font-black text-sm hover:from-purple-800 hover:to-purple-900 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-200 hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              Buyurtma berish
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-sm font-medium hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
            >
              Savatni tozalash
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
