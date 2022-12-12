<script lang="ts">
  import { onMount } from 'svelte'
  import { parse } from 'regexparam'

  onMount(() => {
    onPopState()
    window.addEventListener('popstate', onPopState)
  })

  export let routes

  let component = null,
    params = {}

  function exec(path, result) {
    let i = 0,
      out = {}
    let matches = result.pattern.exec(path)
    while (i < result.keys.length) {
      out[result.keys[i]] = matches[++i] || null
    }
    return out
  }

  function onPopState() {
    let navigatePathname = `${window.location.pathname}${window.location.search}${window.location.hash}`

    routes.some((route, index) => {
      let parsedRoute = import.meta.env.DEV
        ? parse(route.name)
        : parse(`${import.meta.env.BASE_URL}${route.name}`)
      if (navigatePathname.match(parsedRoute.pattern)) {
        component = routes[index].component
        params = exec(navigatePathname, parsedRoute)
        return true
      }
    })
  }
</script>

<svelte:component this={component} {...params} />
