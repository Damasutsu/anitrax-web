<script>
  export let release = null
  export let isReleasePage = true
</script>

<div class="release-wrapper" class:slide={!isReleasePage}>
  <div class="background">
    <img class="poster-back" src={release.image} alt={release.title_ru} />
  </div>
  <div class="wrappper container">
    <div class="content">
      <img class="poster" src={release.image} alt={release.title_ru} />
      <div class="info">
        <div class="wrappper">
          <h1 class="title-ru" title={release.title_ru}>
            {release.title_ru}
          </h1>
          <h2 class="title-original" title={release.title_original}>
            {release.title_original}
          </h2>
          <p class="description">
            {#if release.description.length > 0}
              {release.description}
            {:else}
              Нет описания
            {/if}
          </p>
        </div>
      </div>
      <slot {release} />
    </div>
  </div>
</div>

<style>
  .release-wrapper {
    height: calc(100 * var(--vh));
  }

  .release-wrapper:not(.slide) {
    position: relative;
    margin-left: -6rem;
    margin-right: -2.5rem;
    display: flex;
    overflow: hidden;
    -webkit-mask: linear-gradient(
      180deg,
      white 0%,
      white 90%,
      transparent 100%
    );
    mask: linear-gradient(180deg, white 0%, white 90%, transparent 100%);
  }

  .poster {
    aspect-ratio: 2/3;
    object-fit: cover;
    object-position: center;
    -webkit-user-select: none;
    user-select: none;
    margin-bottom: 1.25rem;
    border-radius: 0.75rem;
    max-height: 60%;
    position: absolute;
    right: 10%;
    top: 6rem;
    z-index: 1;
    max-width: 25%;
    height: initial;
  }

  .background {
    width: 100%;
    height: 100%;
    pointer-events: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .background::after {
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
    object-fit: cover;
    object-position: center;
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

  .wrappper {
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

  .info {
    text-shadow: 0 0 12px black;
    position: absolute;
    top: 6rem;
    font-size: 1rem;
    width: 100%;
    max-width: 60%;
    height: 100%;
    overflow: hidden;
    -webkit-mask: linear-gradient(180deg, white 0%, white 30%, transparent 45%);
    mask: linear-gradient(180deg, white 0%, white 30%, transparent 45%);
  }

  .title-ru {
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

  .title-original {
    font-size: 1.5em;
    opacity: 0.5;
  }

  .description {
    font-size: 1.25em;
    opacity: 0.5;
    margin-top: 0.25em;
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

  @media (min-width: 992px) {
    .release-wrapper:not(.slide) {
      margin-top: -3.5625rem;
    }
  }

  @media (max-width: 575.98px) {
    .release-wrapper:not(.slide) {
      margin: 0 -1rem;
    }

    .wrappper {
      margin: 0;
      padding: 0 1rem;
    }

    .content {
      margin: 0;
    }

    .poster-back {
      filter: blur(0.1rem) contrast(0.75);
    }

    .title-ru {
      font-size: 1.5rem;
    }

    .title-original {
      font-size: 1.25rem;
    }

    .description {
      font-size: 1rem;
    }
  }
</style>
