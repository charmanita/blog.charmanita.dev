<script lang="ts">
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

<footer>
  <p>© 2026 Hunter Roberson · charmanita.dev</p>
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

<style>
  footer {
    border-top: 1px solid #1a1a1a;
    padding: 2rem;
    text-align: center;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.75rem;
    color: white;
    letter-spacing: 0.05em;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .subscribe {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  input {
    background: #0a0a0a;
    border: 1px solid #1a1a1a;
    color: #aaa;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.75rem;
    padding: 0.4rem 0.75rem;
    border-radius: 3px;
    outline: none;
    transition: border-color 0.2s;
  }

  input:focus {
    border-color: #00ff88;
  }

  button {
    background: none;
    border: 1px solid #00ff88;
    color: #00ff88;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.75rem;
    padding: 0.4rem 0.75rem;
    border-radius: 3px;
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s;
  }

  button:hover {
    background: #00ff88;
    color: #000;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .error {
    color: #ff4444;
    font-size: 0.7rem;
    width: 100%;
    text-align: center;
  }
</style>
