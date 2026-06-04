<script lang="ts">
  import favicon from "$lib/assets/favicon.ico";

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
</svelte:head>

{@render children()}
