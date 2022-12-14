function navigateTo(path, data = {}) {
  if (path.charAt(0) !== '/') {
    path = `${window.location.pathname}/${path}`
  } else if (import.meta.env.BASE_URL !== '/') {
    path = `${import.meta.env.BASE_URL.slice(0, -1)}${path}`
  }
  window.history.pushState(data, null, path)
  const event = new PopStateEvent('popstate')
  window.dispatchEvent(event)
}

function redirectTo(path, data = {}) {
  if (path.charAt(0) !== '/') {
    path = `${window.location.pathname}/${path}`
  } else if (import.meta.env.BASE_URL !== '/') {
    path = `${import.meta.env.BASE_URL.slice(0, -1)}${path}`
  }

  window.history.replaceState(data, null, path)
  const event = new PopStateEvent('popstate')
  window.dispatchEvent(event)
}

export { navigateTo, redirectTo }
