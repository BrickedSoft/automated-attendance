import { ipcMain } from 'electron'

import { mainWindow } from '../'

ipcMain.on('CLOSE_WINDOW', () => {
  mainWindow.close()
})

ipcMain.on('MINIMIZE_WINDOW', () => {
  mainWindow.minimize()
})

ipcMain.on('TOGGLE_WINDOW', () => {
  if (!mainWindow.isMaximized()) mainWindow.maximize()
  else mainWindow.unmaximize()
})

ipcMain.on('IS_MAXIMIZED', (event) => {
  event.returnValue = mainWindow.isMaximized()
})
