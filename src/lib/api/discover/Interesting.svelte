<script lang="ts" context="module">
  async function getInteresting() {
    const response = await fetch(
      `${import.meta.env.VITE_FULL_API_URL}/discover/interesting`
    )
    const json = await response.json()

    return json
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
