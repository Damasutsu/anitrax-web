<script lang="ts">
  import Release from '../api/release/Release.svelte'
  import Loading from '../components/Loading.svelte'

  export let id

  let headTitle = ''
  let title_ru = ''
  let title_original = ''

  function setReleaseInfo(event) {
    if (event.detail.code !== 0) {
      headTitle = 'Не найдено'
      return
    }
    ;({ title_ru, title_original } = event.detail.release)
    headTitle = `${title_ru} / ${title_original}`
  }
</script>

<svelte:head>
  <title>{headTitle}</title>
</svelte:head>

<Release {id} let:release let:code on:loaded={setReleaseInfo}>
  <div class="release_wrapper">
    {#if release !== null}
      <h1>{release.title_ru}</h1>
      <h2>
        {release.title_original}
      </h2>
    {:else if code !== 0}
      <div class="not_found">Не найдено</div>
    {:else}
      <Loading />
    {/if}
  </div>
</Release>

<style>
  .release_wrapper {
    width: 100%;
    height: 100%;
  }

  .not_found {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
  }
</style>
