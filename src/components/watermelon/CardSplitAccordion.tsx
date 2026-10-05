import React, { useState, type FC } from 'react'
import { motion, MotionConfig, type Transition } from 'framer-motion'
import { ChevronDown, Send, ShieldCheck, Zap, HeartHandshake } from 'lucide-react'
import { HiCursorArrowRipple } from 'react-icons/hi2'
import { Layers } from 'lucide-react'
import { IoIosTimer } from 'react-icons/io'
import { PiHandTap } from 'react-icons/pi'
import useMeasure from 'react-use-measure'

export interface AccordionItemData {
  id: number
  title: string
  icon: React.ReactNode
  content: string
}

interface AccordionItemProps {
  item: AccordionItemData
  setOpenId: (id: number | null) => void
  index: number
  total: number
  openIndex: number
}

interface AccordionProps {
  items?: AccordionItemData[]
  className?: string
}

const springTransition: Transition = {
  type: 'spring',
  stiffness: 550,
  damping: 45,
  mass: 1,
}

const DEFAULT_ITEMS: AccordionItemData[] = [
  {
    id: 1,
    title: 'Tezkor va xavfsiz kirish',
    icon: <ShieldCheck className="w-5 h-5 text-[#6b21a8] dark:text-purple-400" />,
    content: "Barcha ma'lumotlaringiz shifrlangan va 256-bit xavfsizlik protokoli bilan himoyalangan.",
  },
  {
    id: 2,
    title: 'Bonuslar va shaxsiy chegirmalar',
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    content: "Hisob ochgach, har bir xaridingizdan 5% keshbek va 'QUYOSH20' promo-kodi bilan 20% chegirmaga ega bo'lasiz.",
  },
  {
    id: 3,
    title: 'Buyurtmalarni tez kuzatish',
    icon: <IoIosTimer className="w-5 h-5 text-blue-500" />,
    content: "Yetkazib beruvchi kuryerni xaritada real vaqt rejimida kuzatib boring.",
  },
  {
    id: 4,
    title: '24/7 Qo\'llab-quvvatlash xizmati',
    icon: <HeartHandshake className="w-5 h-5 text-rose-500" />,
    content: "Savollaringiz bormi? Mutaxassislarimiz har doim yordam berishga tayyor.",
  },
]

const AccordionItem: FC<AccordionItemProps> = ({
  item,
  setOpenId,
  index,
  total,
  openIndex,
}) => {
  const [ref, bounds] = useMeasure()
  const isOpen = index === openIndex

  const isFirst = index === 0
  const isLast = index === total - 1

  const isBeforeOpen = index === openIndex - 1
  const isAfterOpen = index === openIndex + 1

  const isAlone = (isAfterOpen && isLast) || (isBeforeOpen && isFirst)

  const BORDER_WIDTH = '1px'
  const BORDER_STYLE = 'solid'
  const borderTopWidth =
    isFirst || isAfterOpen || isOpen ? BORDER_WIDTH : '0px'
  const borderBottomWidth =
    isLast || isBeforeOpen || isOpen ? BORDER_WIDTH : '0px'
  const borderLeftWidth = BORDER_WIDTH
  const borderRightWidth = BORDER_WIDTH

  let borderTopLeftRadius = 0
  let borderTopRightRadius = 0
  let borderBottomLeftRadius = 0
  let borderBottomRightRadius = 0

  if (isOpen || isAlone) {
    borderTopLeftRadius = 16
    borderTopRightRadius = 16
    borderBottomLeftRadius = 16
    borderBottomRightRadius = 16
  } else if (isBeforeOpen) {
    borderBottomLeftRadius = 16
    borderBottomRightRadius = 16
  } else if (isAfterOpen) {
    borderTopLeftRadius = 16
    borderTopRightRadius = 16
  } else if (isFirst) {
    borderTopLeftRadius = 16
    borderTopRightRadius = 16
  } else if (isLast) {
    borderBottomLeftRadius = 16
    borderBottomRightRadius = 16
  }

  return (
    <MotionConfig transition={springTransition}>
      <motion.li layout className="list-none">
        <motion.div
          animate={{
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
          }}
          className="overflow-hidden border border-purple-200/70 dark:border-purple-800/60 bg-white/90 dark:bg-purple-950/60 backdrop-blur-md will-change-transform shadow-sm"
          style={{
            borderTopWidth,
            borderBottomWidth,
            borderLeftWidth,
            borderRightWidth,
            borderStyle: BORDER_STYLE,
            marginBlock: isOpen ? '10px' : '0px',
          }}
        >
          <button
            type="button"
            onClick={() => setOpenId(isOpen ? null : item.id)}
            className="flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-purple-50/50 dark:hover:bg-purple-900/30"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/50">
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-purple-100">
                {item.title}
              </span>
            </div>

            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
              <ChevronDown className="w-4 h-4 text-purple-400 dark:text-purple-400" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: isOpen ? bounds.height : 0,
              opacity: isOpen ? 1 : 0,
            }}
            className="overflow-hidden will-change-transform"
          >
            <div ref={ref}>
              <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-600 dark:text-purple-200/80 leading-relaxed border-t border-purple-100/50 dark:border-purple-900/30">
                {item.content}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.li>
    </MotionConfig>
  )
}

export const CardSplitAccordion: FC<AccordionProps> = ({ items, className = '' }) => {
  const defaultItems = items ?? DEFAULT_ITEMS
  const [openId, setOpenId] = useState<number | null>(1)

  const openIndex = defaultItems.findIndex((item) => item.id === openId)

  return (
    <div className={`w-full ${className}`}>
      <ul className="w-full space-y-0.5 p-0 m-0">
        {defaultItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            setOpenId={setOpenId}
            index={index}
            total={defaultItems.length}
            openIndex={openIndex}
          />
        ))}
      </ul>
    </div>
  )
}

export default CardSplitAccordion
