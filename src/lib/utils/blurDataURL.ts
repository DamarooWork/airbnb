export default async function blurDataURL(src: string | null) {
  let buffer: string | undefined
  if (src) {
    buffer = await fetch(src).then(async (res) => {
      return Buffer.from(await res.arrayBuffer()).toString('base64')
    })
  }
  const base64 = `data:image/png;base64,${buffer}`
  return { base64 }
}
