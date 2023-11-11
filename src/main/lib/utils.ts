import { copyFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export const makeDir = (folder: string) => {
  const basePath = join(__dirname, '../../out/renderer/labels')
  const destination = join(basePath, folder)

  mkdirSync(destination.toString())
}

export const copyFIle = (folder: string, src: string, fileName: string) => {
  const basePath = join(__dirname, '../../out/renderer/labels')
  const destination = join(basePath, folder, fileName)

  copyFileSync(src, destination)
}
