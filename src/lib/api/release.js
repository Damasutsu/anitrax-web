import requests from '../utils'

async function getById(id) {
  return await requests.get(
    `${import.meta.env.VITE_FULL_API_URL}/release/${id}`
  )
}

async function getRandom() {
  return await requests.get(
    `${import.meta.env.VITE_FULL_API_URL}/release/random`
  )
}

export { getById, getRandom }
