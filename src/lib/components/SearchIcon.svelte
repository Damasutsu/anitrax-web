<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<i
  class="fa fa-search search-icon"
  on:click={() => {
    dispatch('click')
  }} />

<style>
  i.fa-search::before {
    font-size: 1.25rem;
  }
</style>
