<script>
  // @ts-nocheck

  import 'swiper/css'

  import { getById as getReleaseById } from '../api/release'
  import { getInteresting } from '../api/discover'
  import Loading from '../components/Loading.svelte'

  import { Swiper, SwiperSlide } from 'swiper/svelte'

  import { Autoplay, Navigation } from 'swiper'
  import Navigate from '../router/Navigate.svelte'

  let isLoaded = false

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
</script>

<svelte:head>
  <title>Главная</title>
</svelte:head>

{#if interestingReleases.length === 0}
  <Loading />
{:else}
  <div class="interesting-slider">
    <Swiper
      loop={true}
      autoplay={{
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      navigation={{
        prevEl: '.interesting-slider .swiper-control-prev',
        nextEl: '.interesting-slider .swiper-control-next'
      }}
      modules={[Navigation, Autoplay]}>
      {#each interestingReleases as release}
        <SwiperSlide>
          <div class="slide-background">
            <img
              class="poster-back"
              src={release.image}
              alt={release.title_ru} />
          </div>
          <div class="slider_wrappper">
            <div class="slide_content">
              <img class="poster" src={release.image} alt={release.title_ru} />
              <div class="info">
                <div class="slider_wrappper">
                  <div class="title-ru" title={release.title_ru}>
                    {release.title_ru}
                  </div>
                  <div class="title-original" title={release.title_original}>
                    {release.title_original}
                  </div>
                  <div class="description">
                    {release.description}
                  </div>
                </div>
              </div>
              <Navigate to="/release/{release.id}" class="watch"
                >Смотреть онлайн</Navigate>
            </div>
          </div>
        </SwiperSlide>
      {/each}
    </Swiper>
    <div class="swiper-controls">
      <div class="swiper-control-prev">
        <i class="fa fa-arrow-circle-o-left" />
      </div>
      <div class="swiper-control-next">
        <i class="fa fa-arrow-circle-o-right" />
      </div>
    </div>
  </div>
{/if}

<style>
  .interesting-slider {
    position: relative;
    margin-left: -6rem;
    margin-right: -2.5rem;
    display: flex;
  }

  .interesting-slider :global(.swiper-slide) {
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

  .slide-background {
    pointer-events: none;
    -webkit-user-select: none;
    user-select: none;
    height: 100vh;
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
    z-index: -1;
    width: 100%;
    filter: blur(0.5rem) contrast(0.75);
    transform: scale(1.1);
    pointer-events: none;
    transition-property: transform, filter;
    transition-duration: 0.2s;
  }

  .slider_wrappper {
    width: 100%;
    max-width: 1500px;
    height: 100%;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .slide_content {
    position: relative;
    margin-left: 6rem;
    margin-right: 2rem;
    height: 100%;
  }

  .poster {
    -webkit-user-select: none;
    user-select: none;
    max-height: 80%;
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    max-width: 25%;
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

  .title-ru {
    font-size: 2.5em;
    font-weight: 700;
  }

  .title-ru,
  .title-original {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title-original {
    font-size: 1.5em;
    opacity: 0.5;
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
    padding: 1.25em 1.5em;
    transform: translateY(50%);
    background: #d48f30;
    border-radius: 0.625rem;
    -webkit-user-select: none;
    user-select: none;
  }

  .swiper-controls {
    z-index: 1;
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 7rem;
    right: 2.5rem;
    bottom: 15%;
    transform: translateY(50%);
  }

  .swiper-controls > .swiper-control-prev,
  .swiper-controls > .swiper-control-next {
    width: 2.5rem;
    aspect-ratio: 1/1;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.1s ease-in-out;
  }

  .swiper-controls > .swiper-control-prev:hover,
  .swiper-controls > .swiper-control-next:hover {
    opacity: 1;
  }

  .swiper-controls > .swiper-control-prev:active,
  .swiper-controls > .swiper-control-next:active {
    opacity: 0.5;
  }

  .swiper-controls > .swiper-control-prev > i.fa::before,
  .swiper-controls > .swiper-control-next > i.fa::before {
    font-size: 2.5rem;
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
    }

    .poster {
      display: none;
    }
  }

  @media (max-width: 575.98px) {
    .slider_wrappper {
      margin: 0;
      padding: 0 1rem;
    }

    .slide_content {
      margin: 0;
    }

    .interesting-slider {
      margin: 0 -2rem;
    }

    .poster-back {
      filter: blur(0.1rem) contrast(0.75);
    }

    .info {
      transform: translateY(10%);
    }

    :global(.watch) {
      left: 50%;
      transform: translate(-50%, 50%);
      font-size: 0.8125rem;
    }
  }

  @media (max-width: 319.98px) {
    :global(.watch) {
      font-size: 0.5875rem;
    }
  }
</style>
