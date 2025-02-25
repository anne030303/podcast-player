import { defineStore } from 'pinia';

export interface Episode {
    guid: string; // 節目唯一識別碼
    title: string; // 集數名稱
    // imageUrl: string; // 集數影像 URL
    publishDate: string; // 集數發佈日期
    description: string; // 集數描述
    audioUrl: string; // 音檔 URL
    duration: number; // 持續時間（秒）
    author: string; // 節目主持人
}

export interface Channel {
    imageUrl: string; // 頻道影像 URL
    title: string; // 頻道名稱
    episodes: Episode[]; // 集數列表
}

export const useChannelStore = defineStore('channel', {
    state: () => ({
        channel: {
            imageUrl: '',
            title: '',
            episodes: []
        } as Channel, // 頻道資訊
        selectedEpisodeIndex: null as string | null,
        selectedEpisode: null as Episode | null
    }),
    actions: {
        setChannel(channel: Channel) {
            this.channel = channel; // 更新頻道資訊
        },
        setSelectedEpisodeIndex(guid: string | null) {
            this.selectedEpisodeIndex = guid;
            this.selectedEpisode = guid !== null && this.channel.episodes.find(item => item.guid === guid) || null;
            
        }
    },
});
