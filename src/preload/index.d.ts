import { ElectronAPI } from '@electron-toolkit/preload'

import { ApiType } from './index.ts'

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiType
  }
}
