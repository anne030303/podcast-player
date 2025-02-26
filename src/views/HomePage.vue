<script setup lang="ts">
import { onBeforeMount } from 'vue';
import Header from "../components/Header.vue";
import EpisodeList from "../components/EpisodeList.vue";
import { podcastService } from '../services/podcastService';
import { useChannelStore } from '../stores/channel';

onBeforeMount(async () => {
	const store = useChannelStore();
	const data = await podcastService.fetchPodcastFeed();
	store.setChannel(data);
});

</script>

<template>
	<div class="home-page">
		<Header />
		<EpisodeList />
	</div>
</template>
