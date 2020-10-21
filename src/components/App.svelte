<script lang="ts">
	import { onMount } from 'svelte';
	import Icon, { directions } from '~/components/Icon/Icon.svelte';
	import VidyCoin from '~/components/Icons/VidyCoin.svelte';

	const directionWords = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
	let idx = 0;

	onMount(() => {
		setInterval(() => {
			idx = (idx + 1) % directions.length;
		}, 1000);
	});
</script>

<style>
	h1,
	h2,
	h3,
	figure {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	.vidycoin {
		color: #FF3DAC;
		font-size: 3em;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<h1>Great Success!</h1>

<figure>
	<img alt="Borat" src="/great-success.png" />
	<figcaption>HIGH FIVE!</figcaption>
</figure>

<h1>Yo, this is the <Icon name="bomb"/></h1>

<h2>This is a chevron  <Icon name="chevron" direction={directions[idx]}/></h2>
<h2>Let's rotate it {directionWords[idx]}</h2>
<br />
<h3>Slot for  more advanced icons: <div class="vidycoin"><Icon><VidyCoin /></Icon></div></h3>
