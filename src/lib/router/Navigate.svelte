<script>
  import { navigateTo } from './Navigate'

  let classList = ''

  export let to
  let href = ''
  export let title = ''
  export { classList as class }
  if (to.charAt(0) !== '/') {
    href = `${window.location.pathname}/${to}`
  } else if (import.meta.env.BASE_URL !== '/') {
    href = `${import.meta.env.BASE_URL.slice(0, -1)}${to}`
  } else {
    href = to
  }

  const navigate = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return
    event.preventDefault()
    event.stopPropagation()
    navigateTo(to)
  }
</script>

<a {href} {title} on:click={navigate} class={classList}>
  <slot />
</a>
