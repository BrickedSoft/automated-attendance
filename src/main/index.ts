import { electronApp, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app } from 'electron'
import { mkdirSync, copyFileSync, writeFile } from 'fs'
import { join } from 'path'

import './lib/controls'

import createMainWindow from './mainWindow'

export let mainWindow: BrowserWindow

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  mainWindow = createMainWindow()

  console.log('lol')

  const folderToCreate = 'new'
  const fileToCopy = 'test.txt'
  const newFileName = 'newFile.txt'
  const dest = join(__dirname, '../../out/renderer/labels/test')
  const dest2 = join(dest, 'sample.txt')

  // copyFileSync(fileToCopy, dest)
  mkdirSync(dest.toString())
  writeFile(dest2.toString(), 'This is a Sample File', function (err) {
    if (err) throw err
    console.log('Saved!')
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
