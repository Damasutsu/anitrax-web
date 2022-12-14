import requests from '../utils'

async function getInteresting() {
  return await requests.get(
    `${import.meta.env.VITE_FULL_API_URL}/discover/interesting`
  )
}

async function getWatching(page) {
  return await requests.get(
    `${import.meta.env.VITE_FULL_API_URL}/discover/${page}`
  )
}

export { getInteresting, getWatching }
