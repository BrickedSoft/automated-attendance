import { motion } from 'framer-motion'

const InitialLoad = () => {
  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col gap-6 justify-center items-center">
      <p className="text-2xl text-light-blue-ff font-medium">Loading Modules</p>
      <div className="overflow-hidden w-64 h-1 bg-light-blue-ff/30 rounded-full">
        <div className="relative w-full h-full">
          <motion.div
            className="absolute h-full bg-light-blue-ff/80"
            animate={{
              width: ['100%', '10%'],
              left: ['-100%', '100%'],
              transition: {
                type: 'easeOut',
                duration: 1.5,
                repeat: Infinity
              }
            }}
          ></motion.div>

          <motion.div
            className="absolute h-full bg-light-blue-ff/80"
            animate={{
              width: ['100%', '10%'],
              left: ['-150%', '100%'],
              transition: {
                type: 'easeIn',
                duration: 1.5,
                repeat: Infinity
              }
            }}
          ></motion.div>
        </div>
      </div>
    </div>
  )
}

export default InitialLoad
