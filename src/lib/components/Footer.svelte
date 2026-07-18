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

<footer class="aero-glass footer-blur">
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
    font-family: var(--aero-font-body);
    font-size: 0.75rem;
    color: var(--aero-ink);
    letter-spacing: 0.05em;
  }
  .footer-blur {
    width: fit-content;
    min-width: 320px;
    max-width: calc(100% - 3rem);
    z-index: 10;
    padding: 1.25rem 2rem;
    text-align: center;
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
    background: var(--aero-inset-bg);
    border: 1px solid var(--aero-glass-border);
    color: var(--aero-ink);
    font-family: var(--aero-font-body);
    font-size: 0.75rem;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    outline: none;
    transition: border-color 0.2s;
  }

  input:focus {
    border-color: var(--aero-aqua);
  }

  button {
    background: linear-gradient(
      180deg,
      var(--aero-glass-hi),
      var(--aero-glass-lo)
    );
    border: 1px solid var(--aero-glass-border);
    color: var(--aero-aqua-deep);
    font-family: var(--aero-font-body);
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    cursor: pointer;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }

  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px var(--aero-shadow);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .error {
    color: #ff6b74;
    font-size: 0.7rem;
    width: 100%;
    text-align: center;
  }
</style>
