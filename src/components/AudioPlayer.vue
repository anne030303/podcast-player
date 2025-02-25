<template>
	<div
		class="playerbox fixed bottom-0 left-0 right-0 bg-[#242424] shadow-lg transition-transform duration-300"
		:class="{
			'translate-y-full': !openPlayer,
			'translate-y-0': openPlayer,
		}"
	>
		<div class="mx-auto">
			<!-- Seek Bar -->
			<div class="flex flex-col items-center">
				<input
					type="range"
					min="0"
					:max="channelStore.selectedEpisode?.duration"
					:value="playerStore.currentTime"
					@input="handleSeek"
					:disabled="!playerStore.currentEpisode"
					class="overflow-hidden appearance-none bg-gray-100 w-full"
				/>
				<div
					class="seek-bar-info flex justify-between text-sm text-gray-100 pt-1"
				>
					<span>{{ formatTime(playerStore.currentTime) }}</span>
					&nbsp;/&nbsp;
					<span>{{
						formatTime(channelStore.selectedEpisode?.duration)
					}}</span>
				</div>
			</div>

			<div class="max-w-4xl flex items-center gap-4 m-5">
				<!-- Controls -->
				<div class="flex items-center gap-4">
					<button
						class="btn-custom p-2 rounded-full border border-[#fff]"
						@click="togglePlay"
						:disabled="!playerStore.currentEpisode"
					>
						<span v-if="playerStore.isPlaying">
							<PauseButton width="26px" height="26px" />
						</span>
						<span v-else>
							<PlayButton
								width="26px"
								height="26px"
								stroke-width="3"
							/>
						</span>
					</button>
				</div>
				<!-- Episode Info -->
				<div class="flex-1">
					<h3 class="text-lg font-medium truncate">
						{{ playerStore?.currentEpisode?.title || " --- " }}
					</h3>
				</div>
			</div>

			<!-- Hidden Audio Element -->
			<audio
				ref="audioEl"
				:src="playerStore.currentEpisode?.audioUrl"
				@timeupdate="handleTimeUpdate"
				@ended="handleEnded"
			></audio>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import PlayButton from "./PlayButton.vue";
import PauseButton from "./PauseButton.vue";
import { usePlayerStore } from "../stores/player";
import { useChannelStore } from "../stores/channel";
import { debounce } from "lodash";

const playerStore = usePlayerStore();
const channelStore = useChannelStore();
const audioEl = ref(null);
const openPlayer = ref(false);
const isUpdating = ref(true);

onMounted(() => {
	if (audioEl.value) {
		audioEl.value.addEventListener("play", () => {
			isUpdating.value = false;
			if (!playerStore.isPlaying) playerStore.play();
			setTimeout(() => {
				isUpdating.value = true;
			}, 50);
		});

		audioEl.value.addEventListener("pause", () => {
			isUpdating.value = false;
			if (playerStore.isPlaying) playerStore.pause();
			setTimeout(() => {
				isUpdating.value = true;
			}, 50);
		});
	}
});

// Watch for play/pause changes
watch(
	() => playerStore.isPlaying,
	(newValue) => {
		if (isUpdating.value) {
			if (newValue && audioEl.value) {
				openPlayer.value = true;
				audioEl.value?.pause();
				if (
					audioEl.value?.src !== playerStore.currentEpisode.audioUrl ||
					playerStore.currentTime === 0
				) {
					audioEl.value.src = playerStore.currentEpisode.audioUrl;
					audioEl.value.load();
					audioEl.value.oncanplaythrough = () => {
						audioEl.value.play();
					};
				} else {
					audioEl.value.play();
				}
			} else {
				audioEl.value?.pause();
			}
		}
		
	},
	{ immediate: true }
);

// Handle time updates
const handleTimeUpdate = debounce(() => {
	if (audioEl.value) {
		playerStore.updateTime(audioEl.value.currentTime);
	}
}, 100);

// Handle seeking
const handleSeek = (event) => {
	const time = Number(event.target.value);
	playerStore.updateTime(time);
	if (audioEl.value) {
		audioEl.value.currentTime = time;
		// audioEl.value?.pause();
	}
};

// Handle episode ended
const handleEnded = () => {
	playerStore.playNext();
};

// // Format time helper
const formatTime = (seconds) => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const togglePlay = () => {
	if (playerStore.isPlaying) {
		playerStore.pause();
	} else {
		playerStore.play();
	}
};
</script>
<style>
@media screen and (-webkit-min-device-pixel-ratio: 0) {
	input[type="range"]::-webkit-slider-thumb {
		width: 10px;
		-webkit-appearance: none;
		height: 10px;
		background: #09cef6;
		box-shadow: -2005px 0 0 2000px #09cef6;
		border-radius: 50%;
	}
	input[type="range"]:disabled {
		opacity: 50%;
	}
}
@media (prefers-color-scheme: light) {
	.playerbox {
		background-color: #ffffff;
	}
	button {
		border-color: #242424;
	}
	.seek-bar-info {
		color: #6a7282;
	}
}
</style>
