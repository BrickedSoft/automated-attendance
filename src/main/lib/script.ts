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

const loadImages = async (user: User) => {
  const images = await fs.readdir(USER_PATH + `labels/${user.id}`)
  
}
