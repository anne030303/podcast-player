<template>
	<svg :class="{ 'Darkmode': !isFixedColor }" height="512px" id="Layer_1" style="enable-background: new 0 0 512 512"
		version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink" fill="#242424" stroke="#242424">
		<g>
			<path d="M191,112v288h-47V112H191 M207,96h-79v320h79V96L207,96z" />
			<path d="M368,112v288h-47V112H368 M384,96h-79v320h79V96L384,96z" />
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
