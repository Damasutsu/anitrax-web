<script>
  import { onMount } from 'svelte'
  import { getById } from '../api/release'
  import Loading from '../components/Loading.svelte'
  import ReleaseInfo from '../components/ReleaseInfo.svelte'

  export let id

  let release = null
  let code = 0

  let headTitle = ''
  let title_ru = ''
  let title_original = ''

  $: {
    id
    onLoad()
  }

  function onLoad() {
    getById(id).then((result) => {
      ;({ code, release } = result)
      if (code !== 0) {
        headTitle = 'Не найдено'
        return
      }
      ;({ title_ru, title_original } = release)
      headTitle = `${title_ru} / ${title_original}`
    })
  }

  onMount(onLoad)
</script>

<svelte:head>
  <title>{headTitle}</title>
</svelte:head>

{#if release !== null}
  <ReleaseInfo {release} />
{:else if code !== 0}
  <div class="not_found">Не найдено</div>
{:else}
  <Loading />
{/if}

<style>
  .not_found {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
  }
</style>
