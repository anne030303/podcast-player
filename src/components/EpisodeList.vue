<script setup lang="ts">
import { useChannelStore } from '../stores/channel';
import { useRouter } from 'vue-router';

const store = useChannelStore();
const router = useRouter();

const goToEpisode = (id: string) => {
	store.setSelectedEpisodeIndex(id);
	router.push(`/episode/${id}`);
};

const formatTime = (dateString: string) => {
	const date = new Date(dateString);
	const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
	return formattedDate
}

</script>

<template>
	<table class="w-full border-collapse table-fixed border-spacing-0">
		<thead>
			<tr>
				<th class="w-[86px] text-center px-[5px]"></th>
				<th class="px-8 py-4 text-start">單集名稱</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="episode in store.channel.episodes" :key="episode.guid"
				class="channel-item relative h-[60px] cursor-default text-[15px] hover:bg-gray-700">
				<td class="h-[60px] w-[86px] text-center overflow-hidden px-2 py-4">
					<img :src="store.channel.imageUrl" alt="Episode" class="h-auto rounded-lg" />
				</td>
				<td class="h-[60px] overflow-hidden px-8 py-4 text-start">
					<div>
						<h2 class="episode-item w-fit text-xl font-semibold mt-2 hover:underline hover:text-gray-300 cursor-pointer"
							@click="goToEpisode(episode.guid)">
							{{ episode.title }}
						</h2>
						<p class="text-[#757575]">{{ formatTime(episode.publishDate) }}</p>
					</div>
				</td>

			</tr>
		</tbody>
	</table>
</template>
<style>
@media (prefers-color-scheme: light) {
	.channel-item:hover {
		background-color: #f5f5f5;
	}
}
</style>