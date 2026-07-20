<script lang="ts">
  export let data;
  import { formatDate } from "$lib/utils";
  import Footer from "$lib/components/Footer.svelte";
  import MiiSitter from "$lib/components/MiiSitter.svelte";

  const POSES = [
    "sitting",
    "waving",
    "fists",
    "clasped",
    "singing",
    "leaning",
    "wink",
  ] as const;

  // simple string hash → deterministic per-slug pose
  function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  $: pose = POSES[hashString(data.slug) % POSES.length];
</script>

<svelte:head>
  <title>{data.meta.title} — charmanita.dev</title>
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
  <meta
    property="og:image"
    content={`https://blog.charmanita.dev/og/${data.slug}`}
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:type" content="article" />
  <meta
    property="og:url"
    content={`https://blog.charmanita.dev/${data.meta.slug}`}
  />
  <meta name="theme-color" content="#1fb6c9" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:description" content={data.meta.description} />
  <meta
    name="twitter:image"
    content={data.meta.image ?? "https://blog.charmanita.dev/images/og.png"}
  />
</svelte:head>

<main>
  <div class="container">
    <a href="/" class="aero-pill aero-pill-ghost back">← back</a>
    <header>
      <h1 class="aero-heading title">{data.meta.title}</h1>
      <time class="date">{formatDate(data.meta.date)}</time>
    </header>

    <MiiSitter {pose} />

    <article class="aero-glass prose">
      <svelte:component this={data.content} />
    </article>
  </div>
</main>
<div class="footer-wrapper">
  <Footer />
</div>

<style>
  .footer-wrapper :global(footer) {
    pointer-events: all;
  }
  main {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 4rem 1.5rem;
  }
  .footer-wrapper {
    position: fixed;
    bottom: 1.25rem;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    pointer-events: none;
    z-index: 10;
  }
  .container {
    width: 100%;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 5rem;
    animation: fadeIn 0.8s ease forwards 0.1s;
    opacity: 0;
  }
  .back {
    width: fit-content;
  }
  header {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .title {
    font-size: clamp(1.4rem, 5vw, 2rem);
  }
  .date {
    font-size: 0.7rem;
    color: var(--aero-ink-soft);
    letter-spacing: 0.08em;
  }

  .prose {
    padding: 2rem;
  }
  .prose :global(img) {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    border-radius: 16px;
    border: 1px solid var(--aero-glass-border);
    box-shadow:
      0 8px 20px var(--aero-shadow),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  .prose :global(p:has(> img:only-child)) {
    margin-bottom: 1.5rem;
  }
  .prose :global(p:has(> img:only-child) + p:has(> em:only-child)) {
    display: block;
    text-align: center;
    font-size: 0.75rem;
    color: var(--aero-ink-soft);
    margin-top: -1rem;
    margin-bottom: 1.5rem;
  }
  .prose :global(p) {
    color: var(--aero-ink-soft);
    font-size: 0.9rem;
    line-height: 1.8;
    margin-bottom: 1.25rem;
  }
  .prose :global(h1),
  .prose :global(h2) {
    color: var(--aero-ink);
    font-family: var(--aero-font-display);
    margin: 2rem 0 0.75rem;
  }
  .prose :global(h3) {
    color: var(--aero-ink);
    font-weight: 600;
    margin: 1.5rem 0 0.5rem;
  }
  .prose :global(a) {
    color: var(--aero-aqua-deep);
    text-decoration: none;
  }
  .prose :global(a:hover) {
    text-decoration: underline;
  }
  .prose :global(code) {
    background: var(--aero-inset-bg);
    color: var(--aero-aqua-deep);
    padding: 0.15em 0.4em;
    border-radius: 3px;
    font-size: 0.8rem;
  }
  .prose :global(pre) {
    background: var(--aero-inset-bg);
    border: 1px solid var(--aero-divider);
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1.25rem;
  }
  .prose :global(pre code) {
    background: none;
    padding: 0;
    color: var(--aero-ink);
  }
  .prose :global(blockquote) {
    border-left: 2px solid var(--aero-aqua);
    padding-left: 1rem;
    color: var(--aero-ink-soft);
    margin-bottom: 1.25rem;
  }
  .prose :global(ul),
  .prose :global(ol) {
    color: var(--aero-ink-soft);
    font-size: 0.9rem;
    padding-left: 1.25rem;
    line-height: 1.8;
    margin-bottom: 1.25rem;
  }
  .prose :global(hr) {
    border: none;
    border-top: 1px solid var(--aero-divider);
    margin: 2rem 0;
  }
  .article-wrap {
    position: relative;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
