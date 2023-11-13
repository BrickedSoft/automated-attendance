import electron from 'electron'
import { promises as fs } from 'fs'
import { join } from 'path'

export const USER_PATH = electron.app.getPath('userData')

export const makeDir = async (folder: string) => {
  const basePath = join(USER_PATH, 'labels')
  const destination = join(basePath, folder)
  await fs
    .mkdir(destination.toString())
    .then(() => console.log(`created ${destination.toString()}`))
    .catch((err) => console.log(err))
}

export const copyFile = async (folder: string, src: string, fileName: string) => {
  const basePath = join(USER_PATH, 'labels')
  const destination = join(basePath, folder, fileName)

  await fs
    .copyFile(src, destination)
    .then(() => console.log(`${src} copied to ${destination}`))
    .catch((err) => console.log(err))
}
