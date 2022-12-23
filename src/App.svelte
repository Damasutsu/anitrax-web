<script>
  import Navbar from './lib/components/Navbar.svelte'
  import Router from './lib/router/Router.svelte'
  import routes from './routes'

  import { redirectTo } from './lib/router/Navigate'

  const redirect = window.sessionStorage.getItem('redirect')

  if (redirect !== null && redirect !== window.location.pathname) {
    window.sessionStorage.removeItem('redirect')
    redirectTo(redirect.substring(12))
  }

  let resizeObserver = new ResizeObserver(() => {
    document.documentElement.style.setProperty('--vh', `${innerHeight / 100}px`)
  })
  resizeObserver.observe(document.documentElement)
</script>

<Navbar />
<main>
  <div class="main_wrapper">
    <Router {routes} />
  </div>
</main>

<style>
  .main_wrapper {
    padding-top: 3.5625rem;
    margin-left: 6rem;
    margin-right: 2.5rem;
  }

  main,
  .main_wrapper {
    max-width: 100%;
    min-height: 100%;
  }

  @media (max-width: 991.98px) {
    .main_wrapper {
      padding-top: 0;
    }
  }

  @media (max-width: 575.98px) {
    .main_wrapper {
      margin: 0 1rem;
    }
  }
</style>
