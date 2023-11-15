import { FC, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'

type BannerProps = {
  name: string
}

const Banner: FC<BannerProps> = ({ name }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 0', '1 0']
  })
  const [scrollPosition, setScrollPosition] = useState(0)
  scrollYProgress.on('change', (latest) => {
    if (ref.current) {
      setScrollPosition(latest)
    }
  })

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          ref={ref}
          key={1}
          className={`fixed left-0 flex items-center justify-center px-16 py-4 ml-64 ${
            scrollPosition === 0 ? `w-[calc(100%-16rem)] h-52` : 'w-auto h-auto'
          } z-50`}
          layout
          transition={{
            layout: {
              type: 'spring',
              bounce: 0.3
            }
          }}
        >
          <motion.div
            className={`w-full h-full flex flex-col items-center justify-center bg-[#fff4f2] rounded-tl-[36px] rounded-br-[36px]  ${
              scrollPosition === 0
                ? ''
                : '!rounded-tl-[4.8px] !rounded-br-[4.8px] bg-transparent transition-colors delay-300'
            }`}
            layout
          >
            <motion.p
              className={`${
                scrollPosition === 0 ? `font-bold  drop-shadow-lg` : 'font-semibold'
              } text-3xl text-light-black-18 tracking-tight`}
              layout
            >
              {name}
            </motion.p>
            <hr className="border-1 border-red-500 z-50" />
          </motion.div>
        </motion.div>

        <div key={2} className="fixed w-full h-24 bg-white z-40"></div>
      </AnimatePresence>

      <div className="w-full h-44 bg-white z-40"></div>
    </>
  )
}

export default Banner