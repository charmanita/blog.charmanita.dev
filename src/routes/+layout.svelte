<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.ico";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="charmanita.dev"
    href="/rss.xml"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700&family=Quicksand:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="aero-sky"></div>
<div class="aero-bubbles" aria-hidden="true">
  {#each Array(14) as _, i}
    <span class="aero-bubble b{i}"></span>
  {/each}
</div>

<ThemeToggle />

<div class="aero-page">
  {@render children()}
</div>

<style>
  .aero-page {
    position: relative;
    z-index: 1;
  }
  .b0 {
    left: 4%;
    width: 18px;
    height: 18px;
    animation-duration: 14s;
    animation-delay: 0s;
  }
  .b1 {
    left: 12%;
    width: 34px;
    height: 34px;
    animation-duration: 19s;
    animation-delay: 2s;
  }
  .b2 {
    left: 20%;
    width: 12px;
    height: 12px;
    animation-duration: 11s;
    animation-delay: 1s;
  }
  .b3 {
    left: 30%;
    width: 26px;
    height: 26px;
    animation-duration: 17s;
    animation-delay: 4s;
  }
  .b4 {
    left: 40%;
    width: 16px;
    height: 16px;
    animation-duration: 13s;
    animation-delay: 3s;
  }
  .b5 {
    left: 50%;
    width: 40px;
    height: 40px;
    animation-duration: 22s;
    animation-delay: 0.5s;
  }
  .b6 {
    left: 58%;
    width: 14px;
    height: 14px;
    animation-duration: 12s;
    animation-delay: 5s;
  }
  .b7 {
    left: 66%;
    width: 28px;
    height: 28px;
    animation-duration: 18s;
    animation-delay: 2.5s;
  }
  .b8 {
    left: 74%;
    width: 20px;
    height: 20px;
    animation-duration: 15s;
    animation-delay: 6s;
  }
  .b9 {
    left: 82%;
    width: 32px;
    height: 32px;
    animation-duration: 20s;
    animation-delay: 1.5s;
  }
  .b10 {
    left: 90%;
    width: 15px;
    height: 15px;
    animation-duration: 13.5s;
    animation-delay: 3.5s;
  }
  .b11 {
    left: 8%;
    width: 24px;
    height: 24px;
    animation-duration: 16s;
    animation-delay: 7s;
  }
  .b12 {
    left: 46%;
    width: 10px;
    height: 10px;
    animation-duration: 10s;
    animation-delay: 8s;
  }
  .b13 {
    left: 96%;
    width: 22px;
    height: 22px;
    animation-duration: 17.5s;
    animation-delay: 4.5s;
  }
</style>
