<template>
	<svg :class="{ 'Darkmode': !isFixedColor }" height="32px" version="1.1" viewBox="0 0 512 512" width="32px"
		xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
		fill="#242424" stroke="#242424" stroke-width="10">
		<g transform="translate(30, 0)">
			<path d="M144,124.9L353.8,256L144,387.1V124.9 M128,96v320l256-160L128,96L128,96z" />
		</g>
	</svg>
</template>
<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
	fixColor: { type: Boolean, default: false }
});
const isFixedColor = ref(props.fixColor);

</script>
<style>
@media (prefers-color-scheme: dark) {
	svg.Darkmode {
		border-color: #fff;
		fill: #fff;
		stroke: #fff;
	}
}
</style>
