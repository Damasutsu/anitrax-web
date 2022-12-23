<script>
  import { getById } from '../api/release'
  import Loading from '../components/Loading.svelte'
  import ReleaseInfo from '../components/ReleaseInfo.svelte'
  import NotFoundPage from './NotFoundPage.svelte'

  export let id = null

  let release = null
  let code = 0

  let headTitle = ''
  let title_ru = ''
  let title_original = ''
  let description = ''

  $: {
    console.log(id)
    onLoad()
  }

  function onLoad() {
    getById(id).then((result) => {
      ;({ code, release } = result)
      if (code !== 0) {
        headTitle = 'Не найдено'
        return
      }
      ;({ title_ru, title_original, description } = release)
      headTitle = `${title_ru} / ${title_original}`
    })
  }
</script>

<svelte:head>
  <title>{headTitle}</title>
  {#if description !== ''}
    <meta name="description" content={description} />
  {/if}
</svelte:head>

{#if release !== null}
  <ReleaseInfo {release} />
{:else if code !== 0}
  <NotFoundPage />
{:else}
  <Loading />
{/if}
