async function getById(id) {
  const response = await fetch(
    `${import.meta.env.VITE_FULL_API_URL}/release/${id}`
  )
  const json = await response.json()
  return json
}

async function getRandom() {
  const response = await fetch(
    `${import.meta.env.VITE_FULL_API_URL}/release/random`
  )
  const json = await response.json()

  return json
}

export { getById, getRandom }
