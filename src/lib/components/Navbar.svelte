<script>
  import Navigate from '../router/Navigate.svelte'
  import SearchIcon from './SearchIcon.svelte'
  import SearchInput from './SearchInput.svelte'

  let isInSearch = false
</script>

<header>
  <div class="header-content">
    <Navigate to="/" class="header-brand">
      <div class="brand-title">Ani<span class="brand">Trax</span></div>
    </Navigate>
    {#if isInSearch}
      <SearchInput />
    {:else}
      <div class="links">
        <Navigate to="/filter" class="header-item">
          <span>Фильтр</span>
        </Navigate>
        <Navigate to="/serials" class="header-item">
          <span>Сериалы</span>
        </Navigate>
        <Navigate to="/films" class="header-item">
          <span>Фильмы</span>
        </Navigate>
        <Navigate to="/popular" class="header-item">
          <span>Популярное</span>
        </Navigate>
        <Navigate to="/schedule" class="header-item">
          <span>Расписание</span>
        </Navigate>
        <Navigate to="/random" class="header-item">
          <span>Рандом</span>
        </Navigate>
      </div>
      <SearchIcon
        on:click={() => {
          isInSearch = !isInSearch
        }} />
    {/if}
  </div>
</header>
<nav>
  <Navigate to="/" class="navbar-item">
    <i class="fa fa-home" />
  </Navigate>
  <Navigate to="/filter" class="navbar-item">
    <i class="fa fa-sliders" />
  </Navigate>
  <Navigate to="/schedule" class="navbar-item">
    <i class="fa fa-list-alt" />
  </Navigate>
  <Navigate to="/search" class="navbar-item">
    <i class="fa fa-search search-icon" />
  </Navigate>
  <Navigate to="/random" class="navbar-item">
    <i class="fa fa-random" />
  </Navigate>
</nav>

<style>
  header {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 0.75rem 1.75rem;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.15), transparent);
  }

  nav {
    display: none;
    position: fixed;
    top: 0rem;
    width: 6rem;
    flex-direction: column;
    gap: 3.75rem;
    padding: 1.875rem;
  }

  nav,
  header {
    z-index: 99;
    left: 0;
    -webkit-user-select: none;
    user-select: none;
  }

  .header-content > :global(.header-brand) {
    z-index: 2;
  }

  .header-content,
  .header-content > :global(.header-brand),
  .links {
    display: flex;
    align-items: center;
  }

  .brand-title {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .brand {
    color: black;
    background: #d48f30;
    padding: 0rem 0.15rem;
    border-radius: 0.3rem;
    margin-left: 0.1rem;
  }

  .links {
    position: absolute;
    left: 0;
    right: 0;
    justify-content: center;
    gap: 1.25rem;
  }

  .header-content > :global(.search-icon) {
    cursor: pointer;
    margin-left: auto;
    box-sizing: content-box;
    padding: 0.25rem;
    z-index: 2;
  }

  nav > :global(.navbar-item) > :global(.search-icon) {
    display: none;
  }

  @media (max-width: 1199.98px) {
    header {
      display: none;
    }

    nav {
      display: flex;
      align-items: center;
    }

    nav > :global(.navbar-item) > :global(.search-icon) {
      display: block;
    }
  }

  @media (max-width: 575.98px) {
    nav {
      gap: 0;
      top: auto;
      flex-direction: row;
      bottom: 0;
      width: 100%;
      height: 3rem;
      padding: 0;
      background-color: #141414;
      justify-content: space-around;
    }
  }
</style>
