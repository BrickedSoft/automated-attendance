import { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type BannerProps = {
  name: string
  isScrollTop: boolean
}

const Banner: FC<BannerProps> = ({ name, isScrollTop }) => {
  return (
    <div className="sticky top-0">
      <AnimatePresence initial={false}>
        <motion.div
          key={1}
          className={`sticky top-0 flex items-center py-4 rounded-tl-[36px] rounded-br-[36px] ${
            isScrollTop
              ? `w-full h-52 justify-center bg-[#fff4f2]`
              : 'w-auto h-auto bg-white justify-start !rounded-tl-[4.8px] !rounded-br-[4.8px] transition-colors delay-300'
          } z-50`}
          layout
          transition={{
            layout: {
              type: 'spring',
              bounce: 0.3
            }
          }}
        >
          <motion.p
            className={`${
              isScrollTop ? `font-bold  drop-shadow-lg` : 'font-semibold'
            } text-3xl text-light-black-18 tracking-tight`}
            layout
          >
            {name}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Banner
