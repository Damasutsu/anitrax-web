<script>
  // @ts-nocheck

  import 'swiper/css'

  import {
    getById as getReleaseById,
    getInteresting,
    getByFilter
  } from '../api'
  import ReleaseInfo from '../components/ReleaseInfo.svelte'
  import ReleaseCard from '../components/ReleaseCard.svelte'
  import Loading from '../components/Loading.svelte'

  import { Swiper, SwiperSlide } from 'swiper/svelte'

  import { Autoplay } from 'swiper'
  import Navigate from '../router/Navigate.svelte'
  import { onMount } from 'svelte'

  let interestingReleases = []
  let bestReleases = []
  let ongoingReleases = []

  onMount(() => {
    getInteresting().then((interesting) => {
      const promises = []
      interesting.content.forEach((release) => {
        promises.push(getReleaseById(release.action))
      })
      Promise.all(promises).then((releases) => {
        releases.forEach(({ release }) => {
          interestingReleases.push(release)
        })
        interestingReleases = [...interestingReleases]
      })
    })

    getByFilter({
      page: 0,
      sort: 1,
      start_year: 2022,
      end_year: 2022
    }).then((best) => {
      bestReleases = [...best.content]
    })

    getByFilter({
      page: 0,
      status_id: 2
    }).then((ongoing) => {
      ongoingReleases = [...ongoing.content]
    })
  })
</script>

<svelte:head>
  <title>Главная</title>
</svelte:head>

{#if interestingReleases.length === 0}
  <Loading />
{:else}
  <section class="interesting-slider">
    <Swiper
      loop={true}
      autoplay={{
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      modules={[Autoplay]}>
      {#each interestingReleases as release}
        <SwiperSlide class="interesting-slide">
          <ReleaseInfo {release} isReleasePage={false} let:release>
            <Navigate to="/release/{release.id}" class="watch"
              >Смотреть</Navigate>
          </ReleaseInfo>
        </SwiperSlide>
      {/each}
    </Swiper>
  </section>
  {#if bestReleases.length !== 0}
    <section class="best container">
      <h1>Лучшие в этом году</h1>
      <section class="best-slider">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={32}
          breakpoints={{ 575.98: { spaceBetween: 24 } }}>
          {#each bestReleases as release}
            <SwiperSlide>
              <ReleaseCard {release} />
            </SwiperSlide>
          {/each}
        </Swiper>
      </section>
    </section>
  {/if}
  {#if ongoingReleases.length !== 0}
    <section class="ongoing container">
      <h1>Сейчас выходят</h1>
      <section class="ongoing-slider">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={32}
          breakpoints={{ 575.98: { spaceBetween: 24 } }}>
          {#each ongoingReleases as release}
            <SwiperSlide>
              <ReleaseCard {release} />
            </SwiperSlide>
          {/each}
        </Swiper>
      </section>
    </section>
  {/if}
{/if}

<style>
  .interesting-slider {
    position: relative;
    margin-left: -6rem;
    margin-right: -2.5rem;
    display: flex;
  }

  .interesting-slider :global(.interesting-slide) {
    overflow: hidden;
    max-height: 700px;
    -webkit-mask: linear-gradient(
      180deg,
      white 0%,
      white 90%,
      transparent 100%
    );
    mask: linear-gradient(180deg, white 0%, white 90%, transparent 100%);
  }

  :global(.swiper-slide) {
    width: 10rem;
  }

  .container {
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;
  }

  h1 {
    margin-bottom: 1.25rem;
  }

  :global(.watch) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    position: absolute;
    bottom: 25%;
    padding: 1.25em 3.5em;
    transform: translateY(50%);
    background: #d48f30;
    border-radius: 0.625rem;
    -webkit-user-select: none;
    user-select: none;
  }

  .best {
    margin-bottom: 2rem;
  }

  .ongoing {
    padding-bottom: 2rem;
  }

  @media (min-width: 1200px) {
    :global(.swiper-slide) {
      width: 12.5rem;
    }
  }

  @media (min-width: 992px) {
    .interesting-slider {
      margin-top: -3.5625rem;
    }
  }

  @media (max-width: 575.98px) {
    .interesting-slider {
      margin: 0 -2rem;
    }

    :global(.swiper-slide) {
      width: 7.5rem;
    }

    :global(.watch) {
      left: 50%;
      transform: translate(-50%, 50%);
      font-size: 0.8125rem;
    }
  }

  @media (max-width: 319.98px) {
    :global(.watch) {
      font-size: 0.6rem;
    }
  }
</style>
