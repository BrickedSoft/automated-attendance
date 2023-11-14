import electron from 'electron'
import { existsSync, promises as fs } from 'fs'
import { join } from 'path'

const userDataFolder = 'labels'

export const USER_PATH = electron.app.getPath('userData')
export const USER_LABELS_PATH = join(USER_PATH, userDataFolder)

export const isLabelsFolderExists = () => existsSync(USER_LABELS_PATH)

export const makeLabelsDir = async () => {
  await fs
    .mkdir(USER_LABELS_PATH.toString())
    .then(() => console.log(`mkDir: ${USER_LABELS_PATH.toString()}`))
    .catch((err) => console.log(err))
}

export const makeUserDir = async (folder: string) => {
  const destination = join(USER_LABELS_PATH, folder)
  await fs
    .mkdir(destination.toString())
    .then(() => console.log(`mkDir: ${destination.toString()}`))
    .catch((err) => console.log(err))
}

export const removeUserDir = async (folder: string) => {
  const destination = join(USER_LABELS_PATH, folder)
  await fs
    .rm(destination.toString(), { recursive: true })
    .then(() => console.log(`rmDir: ${destination.toString()}`))
    .catch((err) => console.log(err))
}

export const copyFile = async (folder: string, src: string, fileName: string) => {
  const destination = join(USER_LABELS_PATH, folder, fileName)

  await fs
    .copyFile(src, destination)
    .then(() => console.log(`copyFile: from ${src} to ${destination}`))
    .catch((err) => console.log(err))
}
