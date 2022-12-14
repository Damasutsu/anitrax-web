async function getInteresting() {
  const response = await fetch(
    `${import.meta.env.VITE_FULL_API_URL}/discover/interesting`
  )
  const json = await response.json()
  return json
}

async function getWatching(page) {
  const response = await fetch(
    `${import.meta.env.VITE_FULL_API_URL}/discover/watching/${page}`
  )
  const json = await response.json()
  return json
}

export { getInteresting, getWatching }
