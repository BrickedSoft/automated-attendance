import { FiCameraOff } from 'react-icons/fi'
import { TbCameraBolt } from 'react-icons/tb'

export const data = {
  camera: {
    off: { icon: <FiCameraOff />, title: 'Camera not found' },
    initializing: { icon: <TbCameraBolt />, title: 'Initializing camera' }
  },
  button: {
    error: {
      title: 'Try again'
    }
  }
}
