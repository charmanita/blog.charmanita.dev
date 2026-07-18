<script lang="ts">
  import { getPosts, type PostMeta } from "$lib/posts";
  import { formatDate } from "$lib/utils";
  import Footer from "$lib/components/Footer.svelte";
  let posts: PostMeta[] = [];
  getPosts().then((p) => {
    posts = p;
  });
</script>

<svelte:head>
  <title>blog — charmanita.dev</title>
</svelte:head>

<main>
  <div class="container">
    <a href="https://charmanita.dev" class="aero-pill aero-pill-ghost back"
      >← charmanita.dev</a
    >
    <h1 class="aero-heading title">blog</h1>
    <div class="posts">
      {#each posts as post}
        <a href="/{post.slug}" class="aero-glass post">
          <span class="post-title">{post.title}</span>
          <span class="post-date">{formatDate(post.date)}</span>
          <p class="post-desc">{post.description}</p>
        </a>
      {/each}
    </div>
  </div>
  <Footer />
</main>

<style>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 1.5rem;
  }

  .container {
    width: 100%;
    max-width: 640px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: fadeIn 0.8s ease forwards 0.1s;
    opacity: 0;
  }

  .back {
    width: fit-content;
  }

  .title {
    font-size: clamp(1.4rem, 5vw, 2rem);
  }

  .posts {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .post {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    text-decoration: none;
    padding: 1.5rem 1.75rem;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }
  .post:hover {
    transform: translateY(-2px);
  }

  .post-title {
    font-family: var(--aero-font-display);
    font-weight: 600;
    font-size: 1rem;
    color: var(--aero-ink);
  }

  .post-date {
    font-size: 0.7rem;
    color: var(--aero-ink-soft);
    letter-spacing: 0.05em;
  }

  .post-desc {
    font-size: 0.85rem;
    color: var(--aero-ink-soft);
    line-height: 1.6;
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
