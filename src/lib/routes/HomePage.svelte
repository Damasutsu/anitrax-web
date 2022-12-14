<script>
  // @ts-nocheck

  import 'swiper/css'

  import { getById as getReleaseById } from '../api/release'
  import { getInteresting } from '../api/discover'
  import { getByFilter } from '../api/filter'
  import Loading from '../components/Loading.svelte'

  import { Swiper, SwiperSlide } from 'swiper/svelte'

  import { Autoplay } from 'swiper'
  import Navigate from '../router/Navigate.svelte'

  let interestingReleases = []

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

  let bestReleases = []

  getByFilter({
    page: 0,
    sort: 1,
    start_year: 2022,
    end_year: 2022
  }).then((best) => {
    const releases = best.content
    releases.forEach((release) => {
      bestReleases.push(release)
    })
    bestReleases = [...bestReleases]
  })

  let ongoingReleases = []

  getByFilter({
    page: 0,
    broadcast: 0
  }).then((ongoing) => {
    const releases = ongoing.content
    releases.forEach((release) => {
      ongoingReleases.push(release)
    })
    ongoingReleases = [...ongoingReleases]
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
          <div class="slide-background">
            <img
              class="poster-back"
              src={release.image}
              alt={release.title_ru} />
          </div>
          <div class="slider-wrappper container">
            <div class="content">
              <img class="poster" src={release.image} alt={release.title_ru} />
              <div class="info">
                <div class="slider-wrappper">
                  <h1 class="title-ru" title={release.title_ru}>
                    {release.title_ru}
                  </h1>
                  <h2 class="title-original" title={release.title_original}>
                    {release.title_original}
                  </h2>
                  <p class="description">
                    {release.description}
                  </p>
                </div>
              </div>
              <Navigate to="/release/{release.id}" class="watch"
                >Смотреть</Navigate>
            </div>
          </div>
        </SwiperSlide>
      {/each}
    </Swiper>
  </section>
  {#if bestReleases.length !== 0}
    <section class="best container">
      <h1>Лучшие в этом году</h1>
      <section class="best-slider">
        <Swiper slidesPerView={'auto'} spaceBetween={36}>
          {#each bestReleases as release}
            <SwiperSlide title={release.title_ru}>
              <Navigate to="/release/{release.id}">
                <img
                  class="poster"
                  src={release.image}
                  alt={release.title_ru} />
                <span class="title-ru" title={release.title_ru}>
                  {release.title_ru}
                </span>
                <span class="title-original" title={release.title_original}>
                  {release.title_original}
                </span>
              </Navigate>
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
        <Swiper slidesPerView={'auto'} spaceBetween={36}>
          {#each ongoingReleases as release}
            <SwiperSlide title={release.title_ru}>
              <Navigate to="/release/{release.id}">
                <img
                  class="poster"
                  src={release.image}
                  alt={release.title_ru} />
                <span class="title-ru" title={release.title_ru}>
                  {release.title_ru}
                </span>
                <span class="title-original" title={release.title_original}>
                  {release.title_original}
                </span>
              </Navigate>
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
    width: 180px;
  }

  :global(.swiper-slide) > :global(a) {
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 320px;
    overflow: hidden;
  }

  :global(.swiper-slide) .poster {
    -webkit-user-select: none;
    user-select: none;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 250px;
    margin-bottom: 1.25rem;
    border-radius: 0.75rem;
  }

  :global(.swiper-slide) .title-ru {
    font-size: 1.125rem;
  }

  :global(.swiper-slide) .title-original {
    font-size: 1rem;
    opacity: 0.5;
  }

  .slide-background {
    pointer-events: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .slide-background::after {
    content: '';
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    right: -0.5rem;
    bottom: -0.5rem;
    pointer-events: none;
    background: linear-gradient(
        90deg,
        #10110e 0%,
        rgba(16, 17, 14, 0.8) 30%,
        rgba(16, 17, 14, 0) 100%
      ),
      linear-gradient(180deg, rgba(16, 17, 14, 0) 50%, #10110e 100%);
  }

  .poster-back {
    height: 100%;
    width: 100%;
    filter: blur(0.5rem) contrast(0.75);
    transform: scale(1.1);
    pointer-events: none;
    transition-property: transform, filter;
    transition-duration: 0.2s;
  }

  .container {
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;
  }

  .slider-wrappper {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .content {
    position: relative;
    margin-left: 6rem;
    margin-right: 2rem;
    height: 100%;
  }

  :global(.interesting-slide) .poster {
    max-height: 80%;
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    max-width: 25%;
    height: initial;
    left: auto;
  }

  .info {
    position: absolute;
    top: 0;
    font-size: 1rem;
    transform: translateY(15%);
    width: 100%;
    max-width: 60%;
    height: 100%;
    overflow: hidden;
    -webkit-mask: linear-gradient(180deg, white 0%, white 30%, transparent 45%);
    mask: linear-gradient(180deg, white 0%, white 30%, transparent 45%);
  }

  h1 {
    margin-bottom: 1.25rem;
  }

  :global(.interesting-slide) .title-ru {
    margin-bottom: 0;
    font-size: 2.5em;
    font-weight: 700;
  }

  .title-ru,
  .title-original {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :global(.interesting-slide) .title-original {
    font-size: 1.5em;
  }

  .description {
    font-size: 1.25em;
    opacity: 0.5;
    margin-top: 0.25em;
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
    margin-bottom: 2rem;
  }

  @media (min-width: 992px) {
    .interesting-slider {
      margin-top: -3.5625rem;
    }
  }

  @media (max-width: 1199.98px) {
    .info {
      max-width: 100%;
      font-size: 0.75rem;
      transform: translateY(10%);
    }

    :global(.interesting-slide) .poster {
      display: none;
    }
  }

  @media (max-width: 575.98px) {
    .slider-wrappper {
      margin: 0;
      padding: 0 1rem;
    }

    .content {
      margin: 0;
    }

    .interesting-slider {
      margin: 0 -2rem;
    }

    .poster-back {
      filter: blur(0.1rem) contrast(0.75);
    }

    .info {
      transform: translateY(5%);
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
