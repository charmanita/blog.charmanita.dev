<script lang="ts">
  type Pose =
    | "sitting"
    | "waving"
    | "fists"
    | "clasped"
    | "singing"
    | "leaning"
    | "wink"
    | "diamond-helm-and-pickaxe";

  export let pose: Pose = "sitting";

  // per-pose overrides — tune each once, forget about it
  const POSE_CONFIG: Record<Pose, { size: string; overlap: number }> = {
    sitting: { size: "190px", overlap: -40 }, // legs dangle over the edge
    waving: { size: "90px", overlap: -20 },
    fists: { size: "190px", overlap: -40 },
    clasped: { size: "90px", overlap: -20 },
    singing: { size: "190px", overlap: -33 },
    leaning: { size: "190px", overlap: -44 },
    wink: { size: "190px", overlap: -33 },
    "diamond-helm-and-pickaxe": { size: "95px", overlap: -20 },
  };

  $: config = POSE_CONFIG[pose];
</script>

<div class="mii-slot" style={`margin-bottom: ${config.overlap}px;`}>
  <img
    class="mii"
    style={`--mii-size: ${config.size};`}
    src="/images/mii-{pose}.png"
    alt=""
    aria-hidden="true"
  />
</div>

<style>
  .mii-slot {
    display: flex;
    justify-content: center;
  }
  .mii {
    width: var(--mii-size, 90px);
    height: auto;
    pointer-events: none;
    user-select: none;
    filter: drop-shadow(0 8px 10px rgba(20, 90, 110, 0.25));
  }
</style>
