import { PrismaClient, User } from '@prisma/client'
import { ipcMain } from 'electron'
import { USER_PATH, copyFile, makeDir } from './utils'
import { UserStore } from '../../renderer/src/types/User'
import { promises as fs } from 'fs'

const prisma = new PrismaClient()

type UserType = {
  name: string
}

ipcMain.handle('STORE_USER', async (_, { name, images }: UserStore) => {
  const user = await storeUser({ name })
    .catch((e) => {
      console.error(e)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  await makeDir(user?.id as string)
  images.map(async (image, index) => {
    await copyFile(user?.id as string, image, index.toString() + `.${image.split('.').pop()}`)
  })

  return user
})

ipcMain.handle(
  'LOAD_USERS',
  async () =>
    await loadUser()
      .catch((e) => {
        console.error(e)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })
)

ipcMain.handle('LOAD_IMAGES', async (_, user: User) => loadImages(user))

/* ---------------------------------- STORE --------------------------------- */

const storeUser = async ({ name }: UserType) =>
  await prisma.user.create({
    data: {
      name: name
    }
  })

/* ---------------------------------- LOAD ---------------------------------- */

const loadUser = async () =>
  await prisma.user.findMany({
    select: {
      name: true,
      id: true
    }
  })

// loads all images of a user as buffer array
const loadImages = async (user: User): Promise<(void | { buffer: Buffer; filetype: string })[]> => {
  const path = USER_PATH + `/labels/${user.id}`
  const files = await fs
    .readdir(path)
    .then((data) => {
      console.log(`readDir: ${path}`)
      return data
    })
    .catch((err) => console.log(err))

  console.log(files)

  const promiseImages = files?.map(async (file) => {
    const image = await fs
      .readFile(`${path}/${file}`)
      .then((data) => {
        console.log(`readFile: ${`${path}/${file}`}`)
        return { buffer: data, filetype: `${file.split('.').pop()}` }
      })
      .catch((err) => console.log(err))

    return image
  })

  const images = await Promise.all(promiseImages || [])

  console.log(images)

  return images
}
