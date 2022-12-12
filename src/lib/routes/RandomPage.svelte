<script>
  import { onMount } from 'svelte'
  import { getRandom as getRandomRelease } from '../api/release'
  import Loading from '../components/Loading.svelte'
  import { redirectTo } from '../router/Navigate'

  onMount(() => {
    getRandomRelease().then(({ release }) => {
      redirectTo(`/release/${release.id}`)
    })
  })
</script>

<Loading />
