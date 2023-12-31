import { electronApp, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app } from 'electron'

import './lib/controls'
import './lib/script'

import { isLabelsFolderExists, makeLabelsDir } from './lib/utils'
import createMainWindow from './mainWindow'

export let mainWindow: BrowserWindow

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  if (!isLabelsFolderExists()) makeLabelsDir()

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  mainWindow = createMainWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
