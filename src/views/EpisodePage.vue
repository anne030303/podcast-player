<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, onUnmounted } from "vue";

import { useChannelStore } from '../stores/channel';
import { podcastService } from '../services/podcastService';

import Header from "../components/Header.vue";
import EpisodeDescription from "../components/EpisodeDescription.vue";
import AudioPlayer from "../components/AudioPlayer.vue";


const route = useRoute();
const channelStore = useChannelStore();
const episodeId = route.params.id;

onBeforeMount(async () => {
    const data = await podcastService.fetchPodcastFeed(); // 獲取資料
    channelStore.setChannel(data);
    if (channelStore.selectedEpisode !== episodeId) {
        channelStore.setSelectedEpisodeIndex(episodeId);
    }
})

onUnmounted(() => {
    channelStore.setSelectedEpisodeIndex(null);
});


</script>

<template>
    <div class="home-page">
        <Header />
        <EpisodeDescription />
        <AudioPlayer />
    </div>
</template>
