<script lang="ts" context="module">
  async function getById(id) {
    const response = await fetch(
      `${import.meta.env.VITE_FULL_API_URL}/release/${id}`
    )
    const json = await response.json()

    return json
  }

  export { getById }
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
    if (id === null) return
    const properties = await getById(id)
    setProperties(properties)
  })
</script>

<slot {release} {code} />
