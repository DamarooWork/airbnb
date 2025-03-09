'use server'
export default async function getDataFromFetch() {
  const response = await fetch('http://localhost:3000/api/search')
  return await response.json()
}
