async function get(url) {
  const response = await fetch(url, {
    headers: {
      Accept: '*',
      'Content-Type': '*'
    }
  })
  const json = await response.json()
  return json
}

async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const json = await response.json()
  return json
}

export default { get, post }
