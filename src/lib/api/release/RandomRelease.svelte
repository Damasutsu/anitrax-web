<script lang="ts" context="module">
  async function getRandom() {
    return await fetch(
      `${import.meta.env.VITE_FULL_API_URL}/release/random`
    ).then((response) => response.json())
  }

  export { getRandom }
</script>

<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let release = null
  let code = 0

  async function setProperties(result) {
    ;({ code, release } = result)
    dispatch('loaded', {
      release,
      code
    })
  }

  onMount(async () => {
    const properties = await getRandom()
    setProperties(properties)
  })
</script>

<slot {release} {code} />
