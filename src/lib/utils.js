async function get(url) {
  const response = await fetch(url, {
    method: 'GET'
  })
  const text = await response.text()

  if (text === '') return get(url)

  const json = JSON.parse(text)
  return json
}

async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent':
        'AnixartApp/8.1.2-22101520 (Android 11; SDK 30; arm64-v8a; Xiaomi M2103K19PG; ru)'
    },
    body: JSON.stringify(data)
  })
  const text = await response.text()

  if (text === '') return post(url, data)

  const json = JSON.parse(text)
  return json
}

export default { get, post }
