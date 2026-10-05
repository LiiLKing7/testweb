import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import QuyoshLogo from '@/components/QuyoshLogo'

const SocialIcons = {
  Facebook: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  ),
}

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-950 dark:bg-black/40 text-purple-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <QuyoshLogo size="md" showText={true} showSubtitle={true} variant="light" />
            <p className="text-sm leading-relaxed text-purple-300">
              O'zbekistonning eng ishonchli online do'koni. 50,000+ mahsulot, tez yetkazib berish.
            </p>
            <div className="flex gap-3">
              {Object.values(SocialIcons).map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl bg-purple-900 hover:bg-amber-600 flex items-center justify-center text-purple-400 hover:text-white transition-all duration-200"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Kategoriyalar</h3>
            <ul className="space-y-2.5">
              {['Elektronika', 'Kiyim', 'Uy jihozlari', 'Kompyuter', 'Audio', 'Kamera', 'Televizor', 'Planshet'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-purple-300 hover:text-amber-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Yordam</h3>
            <ul className="space-y-2.5">
              {["Biz haqimizda", "Yetkazib berish", "Qaytarish siyosati", "Kafolat", "FAQ", "Aloqa"].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-purple-300 hover:text-amber-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Bog'lanish</h3>
            <ul className="space-y-3">
              {[
                { Icon: Phone, text: '+998 90 123 45 67' },
                { Icon: Mail, text: 'info@quyosh.uz' },
                { Icon: MapPin, text: 'Toshkent, Chilonzor' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-900 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-sm text-purple-300">{text}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-5">
              <p className="text-xs font-semibold text-white mb-2">Yangiliklar</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email kiriting..."
                  className="flex-1 px-3 py-2 rounded-lg bg-purple-900 border border-purple-800 text-white text-xs placeholder-purple-500 focus:outline-none focus:border-amber-500"
                />
                <button className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors">
                  ➜
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-purple-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-purple-500">
            © 2026 QUYOSH. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-4">
            {['Maxfiylik', 'Shartlar', 'Cookies'].map(item => (
              <a key={item} href="#" className="text-xs text-purple-500 hover:text-amber-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
