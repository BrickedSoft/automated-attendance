import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { User, UserStore } from '../renderer/src/types/user'

const api = {
  /* ----------------------------- Window Controls ---------------------------- */

  closeWindow: () => ipcRenderer.send('CLOSE_WINDOW'),
  minimizeWindow: () => ipcRenderer.send('MINIMIZE_WINDOW'),
  toggleWindow: () => ipcRenderer.send('TOGGLE_WINDOW'),

  /* ------------------------------ Window Events ----------------------------- */

  isMaximized: (): Promise<boolean> => ipcRenderer.invoke('IS_MAXIMIZED'),

  /* ----------------------------------- DB ----------------------------------- */

  storeUser: (userStore: UserStore): Promise<User> => ipcRenderer.invoke('STORE_USER', userStore),
  deleteUser: (user: User): Promise<User> => ipcRenderer.invoke('DELETE_USER', user),
  loadUsers: (): Promise<User[]> => ipcRenderer.invoke('LOAD_USERS'),
  loadImages: (user: User): Promise<undefined | { buffer: Buffer; filetype: string }[]> =>
    ipcRenderer.invoke('LOAD_IMAGES', user)
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
