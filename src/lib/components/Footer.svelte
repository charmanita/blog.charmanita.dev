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

<footer class="footer-blur">
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
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.75rem;
    color: white;
    letter-spacing: 0.05em;
  }
  .footer-blur {
    width: fit-content;
    min-width: 320px;
    max-width: calc(100% - 3rem);
    z-index: 10;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.06) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom-color: rgba(255, 255, 255, 0.04);
    border-radius: 16px;
    padding: 1.25rem 2rem;
    text-align: center;
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
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
