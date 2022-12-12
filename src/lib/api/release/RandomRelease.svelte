<script lang="ts" context="module">
  async function getRandom() {
    return await fetch(
      `${import.meta.env.VITE_CORS_BYPASS}${
        import.meta.env.VITE_API_URL
      }/release/random`
    ).then((response) => response.json())
  }

  export { getRandom }
</script>

<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let id = null

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
    if (id !== null) {
      await getRandom().then(setProperties)
    }
  })
</script>

<slot {release} {code} />
