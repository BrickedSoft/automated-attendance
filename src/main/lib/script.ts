import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
import { copyFIle, makeDir } from './utils'
import { UserStore } from '../../renderer/src/types/User'

const prisma = new PrismaClient()

type UserType = {
  name: string
}

ipcMain.handle('STORE_USERS', async (_, { name, images }: UserStore) => {
  const user = await storeUser({ name })
    .catch((e) => {
      console.error(e)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  makeDir(user?.id as string)
  images.map((image, index) => {
    copyFIle(user?.id as string, image, index.toString())
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
