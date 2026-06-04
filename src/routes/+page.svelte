<script lang="ts">
  import { getPosts, type PostMeta } from "$lib/posts";
  import { formatDate } from "$lib/utils";
  let posts: PostMeta[] = [];
  getPosts().then((p) => {
    console.log(p);
    posts = p;
  });
  let email = "";
  let status: "idle" | "loading" | "success" | "error" = "idle";

  async function subscribe() {
    if (!email) return;
    status = "loading";
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    status = res.ok ? "success" : "error";
  }
</script>

<svelte:head>
  <title>blog — charmanita.dev</title>
</svelte:head>

<main>
  <div class="container">
    <a href="https://charmanita.dev" class="back">← back</a>
    <h1 class="title">blog</h1>
    <div class="posts">
      {#each posts as post}
        <a href="/{post.slug}" class="post">
          <span class="post-title">{post.title}</span>
          <span class="post-date">{formatDate(post.date)}</span>
          <p class="post-desc">{post.description}</p>
        </a>
      {/each}
    </div>
  </div>
  <footer>
    © 2026 Hunter Roberson · charmanita.dev
    <div class="subscribe">
      {#if status === "success"}
        <p>You're subscribed!</p>
      {:else}
        <input
          type="email"
          placeholder="your@email.com"
          bind:value={email}
          disabled={status === "loading"}
        />
        <button on:click={subscribe} disabled={status === "loading"}>
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
        {#if status === "error"}
          <p class="error">Something went wrong, try again.</p>
        {/if}
      {/if}
    </div>
  </footer>
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

  .title {
    font-size: clamp(1.1rem, 4vw, 1.6rem);
    font-weight: 400;
    color: #fff;
    letter-spacing: 0.04em;
  }

  .posts {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .post {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    text-decoration: none;
    border-left: 1px solid #222;
    padding-left: 1rem;
    transition: border-color 0.2s ease;
  }
  .post:hover {
    border-color: #00ff88;
  }

  .post-title {
    font-size: 0.95rem;
    color: #fff;
    transition: color 0.2s ease;
  }
  .post:hover .post-title {
    color: #00ff88;
  }

  .post-date {
    font-size: 0.7rem;
    color: #444;
    letter-spacing: 0.08em;
  }

  .post-desc {
    font-size: 0.8rem;
    color: #555;
    line-height: 1.6;
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
