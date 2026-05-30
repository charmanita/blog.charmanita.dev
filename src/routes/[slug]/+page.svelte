<script lang="ts">
  export let data;
  import { formatDate } from "$lib/utils";
</script>

<svelte:head>
  <title>{data.meta.title} — charmanita.dev</title>
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
  <meta
    property="og:image"
    content={`https://mcapi.charmanita.dev/og?title=${encodeURIComponent(data.meta.title)}&desc=${encodeURIComponent(data.meta.description ?? "")}`}
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:type" content="article" />
  <meta
    property="og:url"
    content={`https://blog.charmanita.dev/${data.meta.slug}`}
  />
  <meta name="theme-color" content="#00ff88" />
</svelte:head>

<main>
  <div class="container">
    <a href="/" class="back">← back</a>
    <header>
      <h1 class="title">{data.meta.title}</h1>
      <time class="date">{formatDate(data.meta.date)}</time>
    </header>
    <article class="prose">
      <svelte:component this={data.content} />
    </article>
  </div>
  <footer>© 2026 Hunter Roberson · charmanita.dev</footer>
</main>

<style>
  :global(*, *::before, *::after) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :global(html, body) {
    width: 100%;
    min-height: 100%;
    background: #000;
  }

  main {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 4rem 1.5rem;
    font-family: "IBM Plex Mono", monospace;
  }

  .container {
    width: 100%;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: fadeIn 0.8s ease forwards 0.1s;
    opacity: 0;
  }

  .back {
    font-size: 0.75rem;
    color: #444;
    text-decoration: none;
    letter-spacing: 0.1em;
    transition: color 0.2s ease;
  }
  .back:hover {
    color: #fff;
  }

  header {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .title {
    font-size: clamp(1.1rem, 4vw, 1.6rem);
    font-weight: 400;
    color: #fff;
    letter-spacing: 0.04em;
  }

  .date {
    font-size: 0.7rem;
    color: #444;
    letter-spacing: 0.08em;
  }

  /* Markdown content styles */
  .prose :global(p) {
    color: #aaa;
    font-size: 0.875rem;
    line-height: 1.8;
    margin-bottom: 1.25rem;
  }
  .prose :global(h2) {
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    margin: 2rem 0 0.75rem;
  }
  .prose :global(h3) {
    color: #ccc;
    font-size: 0.875rem;
    font-weight: 500;
    margin: 1.5rem 0 0.5rem;
  }
  .prose :global(a) {
    color: #00ff88;
    text-decoration: none;
  }
  .prose :global(a:hover) {
    text-decoration: underline;
  }
  .prose :global(code) {
    background: #111;
    color: #00ff88;
    padding: 0.15em 0.4em;
    border-radius: 3px;
    font-size: 0.8rem;
  }
  .prose :global(pre) {
    background: #0a0a0a;
    border: 1px solid #1a1a1a;
    border-radius: 4px;
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1.25rem;
  }
  .prose :global(pre code) {
    background: none;
    padding: 0;
    color: #ccc;
  }
  .prose :global(blockquote) {
    border-left: 2px solid #00ff88;
    padding-left: 1rem;
    color: #555;
    margin-bottom: 1.25rem;
  }
  .prose :global(ul),
  .prose :global(ol) {
    color: #aaa;
    font-size: 0.875rem;
    padding-left: 1.25rem;
    line-height: 1.8;
    margin-bottom: 1.25rem;
  }
  .prose :global(hr) {
    border: none;
    border-top: 1px solid #1a1a1a;
    margin: 2rem 0;
  }
  footer {
    border-top: 1px solid var(--border);
    padding: 2rem;
    text-align: center;
    font-family: var(--mono);
    font-size: 0.75rem;
    color: white;
    letter-spacing: 0.05em;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
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
