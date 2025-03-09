'use server'

export default async function getDataFromFetch() {
  const response = await fetch(`${BASE_URL}/api/search`)
  return await response.json()
}

