import { test, describe, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import axios from "axios";
import { createRouter, createMemoryHistory } from "vue-router";
import { createApp } from "vue";
import router from "../../router";

import Home from "../../views/HomePage.vue";

import Header from "../../components/Header.vue";
import EpisodeList from "../../components/EpisodeList.vue";
import Episode from "../../views/EpisodePage.vue";
import { mockXml } from "../../mocks/podcast";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, { deep: true });

mockedAxios.get.mockResolvedValue({
    data: mockXml,
    status: 200,
    statusText: "OK",
    config: {},
});

describe("Homapage", () => {
    beforeEach(() => {
        const pinia = createPinia();
        const app = createApp(Home);
        app.use(pinia);
        app.use(router);
        setActivePinia(createPinia());
    });

    test("Header 及 EpisodeList 元件是否存在於畫面上", async () => {
        const wrapper = mount(Home);
        await flushPromises(); // Wait for all promises to resolve
        expect(wrapper.findComponent(Header).exists()).toBe(true);
        expect(wrapper.findComponent(EpisodeList).exists()).toBe(true);
    });

    test.skip("點擊 Episode 後應該導航到 Episode Page", async () => {
        const mockRouter = createRouter({
            history: createMemoryHistory(),
            routes: [
                { path: "/", component: Home },
                { path: "/episode/:id", component: Episode },
            ],
        });

        const wrapper = mount(Home, {
            global: { plugins: [mockRouter] },
        });

        await flushPromises(); // Wait for all promises to resolve
        // 找到並點擊 Episode
        const episodeItem = wrapper.find(".episode-item");
        await episodeItem.trigger("click");

        // 測試是否成功導航
        expect(wrapper.vm.$route.path).toBe(
            "/episode/30045575-f329-4aae-ad13-ca30304be64b"
        );
    });
});
