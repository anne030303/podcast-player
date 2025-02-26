<script setup lang="ts">
import { useChannelStore } from "../stores/channel";
import { usePlayerStore } from "../stores/player";
import PlayButton from './PlayButton.vue';

const playerStore = usePlayerStore();
const channelStore = useChannelStore();
const togglePlay = () => {
	playerStore.playEpisode(channelStore.selectedEpisode);
};
</script>

<template>
	<header class="flex h-[250px] p-[20px_10px]">
		<div
			class="shadow-md bg-[var(--color-background-secondary)] flex-none w-[210px] rounded-[15px] overflow-hidden">
			<img :src="channelStore.channel.imageUrl" alt="Header" class="header-image" />
		</div>
		<div class="flex flex-col flex-grow ml-8 justify-end items-start">
			<h1 class="header-title">
				{{ channelStore.selectedEpisode?.title ?? channelStore.channel.title }}
			</h1>
		</div>
		<div class="flex flex-col justify-end">
			<button v-if="channelStore.selectedEpisodeIndex !== null" @click="togglePlay"
				class="btn-custom bg-[#09cef6]">
				<PlayButton width="32px" height="32px" fill="#fff" stroke="#fff" :fixColor="true" />
			</button>
		</div>
	</header>
</template>
