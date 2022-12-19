<script>
  import { onMount } from 'svelte'
  import Navigate from '../router/Navigate.svelte'
  import { getById as getReleaseById } from '../api'

  export let id = null
  export let release = null
  let poster = null,
    titleRu = null,
    titleOriginal = null

  $: {
    ;({
      image: poster,
      title_ru: titleRu,
      title_original: titleOriginal,
      id
    } = release)
  }

  onMount(() => {
    if (release !== null) return
    if (id === null) throw new Error('No data for render')
    getReleaseById(id)
      .then(({ release }) => {
        ;({
          image: poster,
          title_ru: titleRu,
          title_original: titleOriginal,
          id
        } = release)
      })
      .catch((error) => {
        console.error(error)
      })
  })
</script>

{#if poster === null || titleRu === null || titleOriginal === null || id === null}
  <div class="release-card">
    <div class="card-poster loading" />
    <span class="card-title loading" />
    <span class="card-subtitle loading" />
  </div>
{:else}
  <Navigate to={`/release/${id}`} class="release-card">
    <img src={poster} alt={titleRu} class="card-poster" />
    <h5 class="card-title">{titleRu}</h5>
    <h6 class="card-subtitle">{titleOriginal}</h6>
  </Navigate>
{/if}

<style>
  :global(.release-card) {
    width: 10em;
    color: white;
    display: inline-flex;
    flex-direction: column;
  }

  .card-poster {
    -webkit-user-select: none;
    user-select: none;
    display: inline-block;
    width: 10em;
    aspect-ratio: 1/1.4375;
    object-fit: cover;
    object-position: center;
    border-radius: 0.5em;
    margin-bottom: 0.25em;
  }

  .card-title {
    margin-bottom: 0.125em;
    font-weight: 700;
    font-size: 0.9em;
  }

  .card-subtitle {
    opacity: 0.5;
    font-weight: 400;
    font-size: 0.8em;
  }

  .card-title,
  .card-subtitle {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-radius: 0.5em;
  }

  .card-title.loading,
  .card-subtitle.loading {
    height: 1.25em;
  }

  @media (min-width: 1200px) {
    :global(.release-card) {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 991.98px) {
    :global(.release-card) {
      font-size: 1rem;
    }
  }

  @media (max-width: 575.98px) {
    :global(.release-card) {
      font-size: 0.75rem;
    }
  }
</style>
