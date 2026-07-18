<script lang="ts">
	import { onMount } from 'svelte';

	let isDark = false;

	function apply(dark: boolean) {
		document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
		localStorage.setItem('theme', dark ? 'dark' : 'light');
		isDark = dark;
	}

	function toggle() {
		apply(!isDark);
	}

	onMount(() => {
		const stored = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		isDark = stored ? stored === 'dark' : prefersDark;
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
	});
</script>

<button
	class="aero-icon-btn theme-toggle"
	on:click={toggle}
	aria-label="Toggle dark mode"
	title="Toggle dark mode"
>
	{#if isDark}
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
			/>
		</svg>
	{:else}
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		position: fixed;
		top: 1.5rem;
		right: 1.5rem;
		z-index: 20;
	}
</style>
