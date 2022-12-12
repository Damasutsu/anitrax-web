<script lang="ts" context="module">
  async function getInteresting() {
    return await fetch(
      `${import.meta.env.VITE_CORS_BYPASS}${
        import.meta.env.VITE_API_URL
      }/discover/interesting`
    ).then((response) => response.json())
  }

  export { getInteresting }
</script>

<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let content = null
  let code = 0

  async function setProperties(result) {
    ;({ code, content } = result)
    dispatch('loaded', {
      content,
      code
    })
  }

  onMount(async () => {
    await getInteresting().then(setProperties)
  })
</script>

<slot {content} {code} />
