import type { Episode } from "../stores/channel";

import axios from "axios";

export const podcastService = {
    async fetchPodcastFeed() {
        try {
            const response = await axios.get(
                "/api/soundon/v2/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml"
            );
            const xmlText = await response.data;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

            const namespaces: { [key: string]: string } = {};
            Array.from(xmlDoc.documentElement.attributes)
                .filter((attr) => attr.name.startsWith("xmlns:"))
                .forEach((attr) => {
                    namespaces[attr.name] = attr.value;
                });

            const channelTitle =
                xmlDoc.querySelector("channel > title")?.textContent || "";
            const imageUrl =
                xmlDoc.querySelector("channel > image url")?.textContent || "";

            const episodes: Episode[] = [];
            xmlDoc.querySelectorAll("channel > item").forEach((item) => {
                const episodeTitle =
                    item.querySelector("title")?.textContent?.trim() || "";
                // const description =
                // 	item.querySelector("description")?.textContent?.trim() ||
                // 	"";
                const contentEncoded =
                    item
                        .getElementsByTagNameNS(
                            namespaces["xmlns:content"],
                            "encoded"
                        )[0]
                        ?.textContent?.trim() || "";
                const guid = item.querySelector("guid")?.textContent || "";
                const audioUrl =
                    item.querySelector("enclosure")?.getAttribute("url") || "";
                const pubDate =
                    item.querySelector("pubDate")?.textContent || "";
                const duration = parseInt(
                    item.getElementsByTagNameNS(
                        namespaces["xmlns:itunes"],
                        "duration"
                    )[0]?.textContent || "0",
                    10
                );
                const author =
                    item
                        .getElementsByTagNameNS(
                            namespaces["xmlns:dc"],
                            "creator"
                        )[0]
                        ?.textContent?.trim() || "";
                episodes.push({
                    guid,
                    title: episodeTitle,
                    publishDate: pubDate,
                    // description: description,
                    description: contentEncoded,
                    audioUrl: audioUrl,
                    duration: duration,
                    author: author,
                });
            });

            return {
                title: channelTitle,
                imageUrl,
                episodes,
            };
        } catch (error) {
            console.error("Error fetching podcast feed:", error);
            throw error;
        }
    },
};
