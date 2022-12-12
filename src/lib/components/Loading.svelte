<svg class="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle class="spinner-circle-back" cx="50" cy="50" r="40" fill="none" />
  <circle class="spinner-circle" cx="50" cy="50" r="40" fill="none" />
</svg>

<style>
  @keyframes spinning-circle {
    0% {
      stroke-dashoffset: 187.5%;
      transform: rotate(0);
    }

    50% {
      stroke-dashoffset: 62.5%;
      transform: rotate(45deg);
    }

    100% {
      stroke-dashoffset: 187.5%;
      transform: rotate(360deg);
    }
  }

  @keyframes spinner {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .spinner {
    top: 50%;
    left: 50%;
    position: absolute;
    height: 5%;
    aspect-ratio: 1/1;
    transform-origin: 50% 50%;
    animation: spinner 2s linear infinite both;
  }

  .spinner-circle {
    stroke: white;
    stroke-width: 20%;
    stroke-dasharray: 250%;
    transform-origin: 50% 50%;
    animation: spinning-circle 1.4s ease-in-out infinite;
  }

  .spinner-circle-back {
    stroke: #d48f30;
    stroke-width: 20%;
  }
</style>
