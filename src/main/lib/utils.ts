import electron from 'electron'
import { copyFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export const USER_PATH = electron.app.getPath('userData')

export const makeDir = (folder: string) => {
  const basePath = join(USER_PATH, 'labels')
  const destination = join(basePath, folder)

  mkdirSync(destination.toString())
}

export const copyFIle = (folder: string, src: string, fileName: string) => {
  const basePath = join(USER_PATH, 'labels')
  const destination = join(basePath, folder, fileName)

  copyFileSync(src, destination)
}
