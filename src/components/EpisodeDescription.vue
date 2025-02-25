<script lang="ts" setup>
import { computed } from "vue";

import DOMPurify from "dompurify";

import { useChannelStore } from "../stores/channel";

const store = useChannelStore();

function convertUrlsToLinks(text) {
	if (!text) return "";
	const regex = /(?<!<a[^>]*>)(https?:\/\/[^\s<]+)(?![^<]*<\/a>)/g;
	return text.replace(
		regex,
		'<a href="$1" target="_blank" rel="noopener">$1</a>'
	);
}

const safeContent = computed(() => {
	const convertedHTML = convertUrlsToLinks(
		store.selectedEpisode?.description
	);
	return DOMPurify.sanitize(convertedHTML);
});
</script>

<template>
	<section>
		<h2 class="text-[26px] font-bold mb-[15px] py-4 text-start">
			Episode Description
		</h2>
		<div v-html="safeContent" class="text-start pb-[100px]"></div>
	</section>
</template>
