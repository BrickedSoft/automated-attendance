import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { User } from '../renderer/src/types/User'

const api = {
  /* ----------------------------- Window Controls ---------------------------- */

  closeWindow: () => ipcRenderer.send('CLOSE_WINDOW'),
  minimizeWindow: () => ipcRenderer.send('MINIMIZE_WINDOW'),
  toggleWindow: () => ipcRenderer.send('TOGGLE_WINDOW'),

  /* ------------------------------ Window Events ----------------------------- */

  isMaximized: (): Promise<boolean> => ipcRenderer.invoke('IS_MAXIMIZED'),

  /* ----------------------------------- DB ----------------------------------- */

  storeUser: (): Promise<User> => ipcRenderer.invoke('STORE_USER'),
  loadUsers: (): Promise<User[]> => ipcRenderer.invoke('LOAD_USERS')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

export type ApiType = typeof api
