import { defineStore } from "pinia";
import type { Episode } from "./channel";
import { useChannelStore } from "./channel";

export const usePlayerStore = defineStore("player", {
    state: () => ({
        currentEpisode: null as Episode | null,
        isPlaying: false,
        currentTime: 0,
        nextEpisode: null as Episode | null,
    }),

    actions: {
        playEpisode(episode: Episode | null) {
            this.currentEpisode = episode;
            this.currentTime = 0;
            if (episode) {
                this.pause();
                setTimeout(() => {
                    this.play();
                }, 100);
                const channelStore = useChannelStore();
                const currentIndex = channelStore.channel.episodes.findIndex(
                    (ep) => ep.guid === episode.guid
                );
                if (typeof currentIndex === "number" && currentIndex !== 0) {
                    this.nextEpisode =
                        channelStore.channel.episodes[currentIndex - 1];
                }
            }
        },

        play() {
            this.isPlaying = true;
        },

        pause() {
            this.isPlaying = false;
        },

        updateTime(time: number) {
            this.currentTime = time;
        },

        playNext() {
            if (!this.currentEpisode || !this.nextEpisode) {
                this.pause();
            } else {
                this.playEpisode(this.nextEpisode);
                this.play();
            }
        },
    },
});
