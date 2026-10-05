import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  showSubtitle?: boolean
  className?: string
  variant?: 'default' | 'light' | 'dark'
}

const sizes = {
  sm: { img: 'w-8 h-8', title: 'text-base', subtitle: 'text-[9px]' },
  md: { img: 'w-10 h-10', title: 'text-lg', subtitle: 'text-[10px]' },
  lg: { img: 'w-14 h-14', title: 'text-2xl', subtitle: 'text-xs' },
  xl: { img: 'w-24 h-24', title: 'text-4xl', subtitle: 'text-sm' },
}

// SVG "quyosh guli" logo – oltin rang petallari, binafsha fon
export const QuyoshFlower: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="100" height="100" rx="20" fill="#6B21A8"/>
    {/* 8 ta oltin petal */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180
      const cx = 50 + 22 * Math.sin(angle)
      const cy = 50 - 22 * Math.cos(angle)
      return (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="8"
          ry="14"
          transform={`rotate(${i * 45}, ${cx}, ${cy})`}
          fill="url(#goldGrad)"
          opacity="0.92"
        />
      )
    })}
    {/* Markaziy doira */}
    <circle cx="50" cy="50" r="10" fill="url(#goldGrad)" />
    <circle cx="50" cy="50" r="6" fill="#7E22CE" opacity="0.6"/>
    <defs>
      <radialGradient id="goldGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#F0C060"/>
        <stop offset="50%" stopColor="#C9913A"/>
        <stop offset="100%" stopColor="#9A6420"/>
      </radialGradient>
    </defs>
  </svg>
)

const QuyoshLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = false,
  className,
  variant = 'default',
}) => {
  const s = sizes[size]
  const titleColor = variant === 'light'
    ? 'text-white'
    : 'bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent dark:from-purple-300 dark:to-purple-500'

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <QuyoshFlower className={cn(s.img, 'flex-shrink-0 drop-shadow-lg')} />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-black tracking-wide', s.title, titleColor)}>
            QUYOSH
          </span>
          {showSubtitle && (
            <span className={cn(
              'font-semibold tracking-widest uppercase mt-0.5',
              s.subtitle,
              variant === 'light' ? 'text-purple-100' : 'text-amber-600 dark:text-amber-400'
            )}>
              Siz uchun keraklisi
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default QuyoshLogo
