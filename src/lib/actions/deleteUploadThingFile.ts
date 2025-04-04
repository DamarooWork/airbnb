'use server'
import { UTApi } from 'uploadthing/server'

export default async function actionDeleteUploadThingFile(imageUrl: string) {
  const previousImageKey = imageUrl.slice(28)
  const utapi = new UTApi()
  await utapi.deleteFiles(previousImageKey)
}
