<script lang="ts">
  import SearchIcon from './SearchIcon.svelte'
</script>

<div class="container-search">
  <SearchIcon />
  <input class="search" placeholder="Поиск аниме" />
</div>

<style>
  @supports (backdrop-filter: blur(0.625rem)) {
    .container-search {
      -webkit-backdrop-filter: blur(0.625rem);
      backdrop-filter: blur(0.625rem);
    }
  }

  .container-search {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.625rem;
    width: 35%;
    padding: 0.75rem 1.125rem;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .container-search > :global(.search-icon) {
    flex: 0 0 24px;
    margin-right: 1.125rem;
  }

  .search,
  .search::-webkit-input-placeholder {
    color: white;
  }

  .search {
    flex: 1;
    border: none;
    font-size: 0.875rem;
    background-color: transparent;
  }

  .search:focus-visible {
    outline: none;
  }
</style>
